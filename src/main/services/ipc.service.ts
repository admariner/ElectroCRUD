import 'reflect-metadata';

import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { Cache, CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import * as hash from 'object-hash';
import { inject, injectable } from 'tsyringe';
import CheckTunnelIPC from '../ipc/check-tunnel.ipc';
import { mainWindow } from '../main';
import {
  ErrorResponse,
  ErrorType,
  IPCChannel,
  RequestType,
  ResponseType,
} from '../../shared/defenitions';
import { IPCChannelEnum } from '../../shared/enums';
import { IRequestFactory } from '../ipc/base.ipc';
import { IDatabaseService } from './interfaces/idatabase.service';
import { IIPCService } from './interfaces/iipc.service';

const ipcCache = new CacheContainer(new MemoryStorage());

@injectable()
export default class IPCService implements IIPCService {
  constructor(
    @inject('IDatabaseService') private database: IDatabaseService,
    @inject('IRequestFactory') private rFactory: IRequestFactory,
    @inject('CheckTunnelIPC') private checkTunnel: CheckTunnelIPC
  ) {}

  public listen(): void {
    this.disconnect();
    Object.values(IPCChannelEnum).forEach((channel: IPCChannel) =>
      ipcMain.handle(channel, this.onRequest.bind(this))
    );
  }

  public disconnect(): void {
    Object.values(IPCChannelEnum).forEach((channel: IPCChannel) =>
      ipcMain.removeAllListeners(channel)
    );
  }

  @Cache(ipcCache, { ttl: 10, calculateKey: (data) => hash.sha1(data) })
  private onRequest(
    event: IpcMainInvokeEvent,
    request: RequestType
  ): Promise<ResponseType> | ResponseType {
    console.log('onRequest', request);
    switch (request.channel) {
      case IPCChannelEnum.CHECK_TUNNEL: {
        return this.checkTunnel.createRequest(request);
      }
      case IPCChannelEnum.CONNECT: {
        return this.rFactory.createRequest(request, 'connectWithProps');
      }
      case IPCChannelEnum.TABLES_LIST: {
        return this.rFactory.createRequest(request, 'listTablesWithProps');
      }
      case IPCChannelEnum.TABLE_INFO: {
        return this.rFactory.createRequest(request, 'tableInfoWithProps');
      }
      case IPCChannelEnum.READ_DATA: {
        return this.rFactory.createRequest(request, 'readDataWithProps');
      }
      case IPCChannelEnum.READ_WIDGET_DATA: {
        return this.rFactory.createRequest(request, 'readWidgetDataWithProps');
      }
      case IPCChannelEnum.INSERT_DATA: {
        return this.rFactory.createRequest(request, 'insertDataWithProps');
      }
      case IPCChannelEnum.DELETE_DATA: {
        return this.rFactory.createRequest(request, 'deleteDataWithProps');
      }
      case IPCChannelEnum.UPDATE_DATA: {
        return this.rFactory.createRequest(request, 'updateDataWithProps');
      }
      default: {
        return {
          channel: request.channel,
          error: {
            type: ErrorType.GENERIC,
            message: 'Unexpected Error',
          },
        } as ErrorResponse;
      }
    }
  }

  public send(response: ResponseType): void {
    // eslint-disable-next-line no-restricted-syntax
    mainWindow?.webContents.send(response.channel, response);
  }
}
