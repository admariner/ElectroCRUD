import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
} from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { TbEdit, TbLayout2, TbPlugConnected, TbTrash } from 'react-icons/tb';
import ReactTimeAgo from 'react-time-ago';
import { AddButton } from 'renderer/components/buttons';
import { DatabaseIcon } from 'renderer/components/icons/database-icon';
import { StatusIndicator } from 'renderer/components/icons/status-indicator';
import { ConfirmPromiseDeleteModal } from 'renderer/components/modals';
import {
  DataTableActionMenu,
  DataTableActionMenuItem,
} from 'renderer/components/tables/data-table-action-menu';
import { ElectroCRUDTable } from 'renderer/components/tables/Table';
import { AccountRO, StrictAccountRO } from 'renderer/defenitions/record-object';
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks';
import { AccountsReducer, SessionReducer } from 'renderer/store/reducers';

export type AccountsListTableProperties = {
  accountsState: StrictAccountRO[];
};

export const AccountsListTable: FC<AccountsListTableProperties> = ({
  accountsState,
}) => {
  const sessionState = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();

  const accountsStateWithStatus = useMemo(
    () =>
      accountsState.map((row) => ({
        ...row,
        status: row.id === sessionState.account?.id && sessionState.isConnected,
      })),
    [sessionState, accountsState]
  );

  const columns: {
    key: keyof AccountRO | 'actions' | 'status';
    label: string;
    group?: string;
    style?: any;
    width?: string;
  }[] = [
    { key: 'name', label: 'Name', width: '30%' },
    { key: 'client', label: 'Type', width: '15%' },
    { key: 'creationDate', label: 'Modification', width: '20%' },
    { key: 'modificationDate', label: 'Modification', width: '20%' },
    { key: 'status', label: 'Status', width: '15%' },
    {
      key: 'actions',
      label: '',
      width: 'auto',
      style: { justifyContent: 'end', width: 'auto' },
    },
  ];

  const handleDelete = (row: StrictAccountRO) => {
    ConfirmPromiseDeleteModal({ entityName: row.name })
      .then(() => dispatch(AccountsReducer.actions.removeOne(row.id)))
      .catch(() => {});
  };

  const handleEdit = (row: StrictAccountRO) => {};

  const handleUse = (row: StrictAccountRO) =>
    dispatch(SessionReducer.actions.setAccount({ account: row }));

  const handleAdd = () => {};

  const actionMenuActions: DataTableActionMenuItem[] = [
    {
      menuIcon: TbTrash,
      label: 'Delete',
      onClick: (row: StrictAccountRO) => handleDelete(row),
    },
    {
      menuIcon: TbEdit,
      label: 'Edit',
      onClick: (row: StrictAccountRO) => handleEdit(row),
    },
    {
      menuIcon: TbPlugConnected,
      label: 'Use',
      onClick: (row: StrictAccountRO) => handleUse(row),
    },
  ];

  return (
    <Card variant="elevated" flex={1}>
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>Accounts</Text>
          <AddButton onClick={handleAdd} />
        </Flex>
      </CardHeader>
      <CardBody px={0}>
        <ElectroCRUDTable<StrictAccountRO>
          data={accountsStateWithStatus}
          columns={columns}
          hasScroll
          customCell={(info) => {
            if (info.column.id === 'creationDate') {
              return <ReactTimeAgo date={info.getValue()} />;
            }
            if (info.column.id === 'modificationDate') {
              return <ReactTimeAgo date={info.getValue()} />;
            }
            if (info.column.id === 'client') {
              return (
                <Badge variant="solid" colorScheme="primary">
                  <Flex alignItems="center" gap={2}>
                    <DatabaseIcon w={5} h={5} client={info.getValue()} />
                    <Text textTransform="uppercase">{info.getValue()}</Text>
                  </Flex>
                </Badge>
              );
            }
            if (info.column.id === 'status') {
              return <StatusIndicator value={info.getValue()} />;
            }
            if (info.column.id === 'actions') {
              return (
                <Box>
                  <DataTableActionMenu
                    items={actionMenuActions}
                    row={info.row.original}
                  />
                </Box>
              );
            }
            // eslint-disable-next-line unicorn/no-useless-undefined
            return undefined;
          }}
        />
      </CardBody>
    </Card>
  );
};
