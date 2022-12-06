import { EntityState } from '@reduxjs/toolkit';
import memoize from 'proxy-memoize';
import {
  ViewRO,
  ColumnRO,
  ColumnReferanceRO,
} from 'renderer/defenitions/record-object';
import * as F from 'ramda';
import { RootState } from '../store';
import { getTagsByIds } from './tags.selectors';
import { enrichColumsRelations } from './views.selectors';
import { ColumnsReducer } from '../reducers';

export const getAllColumns = memoize((state) => F.values(state) as ColumnRO[]);

export const getColumn = F.curry(
  (state: RootState, columnId: string) => state.columns.entities[columnId]
);

export const createColumnSelector = F.curry(
  (rootState: RootState, columnId: string) =>
    memoize((state: RootState) => state.columns.entities[columnId])(rootState)
);

export const createColumnForViewSelector = memoize((state: RootState) =>
  F.compose<string>(
    F.map((columnId) => state.columns.entities[columnId] as ColumnRO),
    (viewId: string) => state.views.entities[viewId]?.columns
  )
);

export const getColumns = memoize((state: RootState) =>
  F.compose<string[]>(
    F.map((id: string) =>
      ColumnsReducer.getSelectors().selectById(state.columns, id)
    ),
    F.intersection(state.columns.ids.map((value) => value.valueOf()))
  )
);

export const enrichColumns = (state: RootState) =>
  F.map((column: ColumnRO) =>
    F.mergeDeepRight(column, {
      metadata: {
        tags: getTagsByIds(state)(column?.metadata?.tags || []),
      },
      referances: F.values(
        F.filter((info: ColumnReferanceRO) => info.from === column.id)
      ),
    })
  );

export const enrichColumnsForView = F.curry((state: RootState) =>
  F.compose<cstring[]>(enrichColumsRelations(state), enrichColumns(state))
);
