import {
  Checkbox,
  CheckboxProps,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import CSS from 'csstype';
import _ from 'lodash';
import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ElectroCRUDTableHeader = {
  key: string;
  label: string;
  group?: string;
};

type CustomCellReturn = ReactElement;

type ElectroCRUDTableProperties<T> = {
  data: T[];
  columns: ElectroCRUDTableHeader[];
  customCell?: (info: CellContext<T, any>) => CustomCellReturn | void;
  onSelectedItems?: (items: T[]) => void;
  isLoaded?: boolean;
};

const TableHeader: FC<PropsWithChildren> = ({ children }) => (
  <Text
    justifyContent="space-between"
    fontSize={{ sm: '10px', lg: '12px' }}
    color="gray.400"
    as="div"
  >
    {children}
  </Text>
);

const TableCell: FC<PropsWithChildren & { textColor: CSS.Property.Color }> = ({
  children,
  textColor,
}) => (
  <Flex alignItems="center">
    <Text color={textColor} fontSize="sm" fontWeight="700" as="div">
      {children}
    </Text>
  </Flex>
);

const IndeterminateCheckbox: FC<CheckboxProps> = ({ ...rest }) => (
  <Flex alignItems="center">
    <Checkbox colorScheme="brand" size="lg" {...rest} />
  </Flex>
);

export const ElectroCRUDTable = <TT extends Record<string, any>>(
  properties: ElectroCRUDTableProperties<TT>
) => {
  const {
    data,
    columns,
    customCell,
    onSelectedItems,
    isLoaded = true,
  } = properties;
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const columnHelper = createColumnHelper<TT>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  useEffect(() => {
    if (onSelectedItems) {
      onSelectedItems(
        Object.keys(rowSelection).map((value) => data[Number(value)])
      );
    }
  }, [rowSelection, data, onSelectedItems]);

  const tableColumns = useMemo<ColumnDef<TT>[]>(() => {
    return [
      ...(onSelectedItems
        ? [
            columnHelper.accessor('select' as any, {
              id: 'select',
              enableSorting: false,
              header: ({ table }) => (
                <IndeterminateCheckbox
                  {...{
                    isChecked: table.getIsAllPageRowsSelected(),
                    isIndeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllPageRowsSelectedHandler(),
                  }}
                />
              ),
              cell: ({ row }) => (
                <IndeterminateCheckbox
                  {...{
                    isChecked: row.getIsSelected(),
                    isIndeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                  }}
                />
              ),
            }),
          ]
        : []),
    ].concat(
      columns.map((col) => {
        return columnHelper.accessor(col.key as any, {
          id: col.key,
          meta: col.group || '',
          header: () => (
            <TableHeader>
              <div>{col.label}</div>
            </TableHeader>
          ),
          cell: (info) => (
            <TableCell textColor={textColor}>
              {customCell === undefined ? (
                <>{info.getValue()}</>
              ) : (
                customCell(info) || <>{info.getValue()}</>
              )}
            </TableCell>
          ),
        });
      })
    );
  }, [onSelectedItems, columnHelper, columns, textColor, customCell]);

  const groupedTableColumns = useMemo(() => {
    if (_.uniq(columns.map((col) => col.group)).length === 1) {
      return tableColumns;
    }
    const group = _.groupBy(tableColumns, 'meta');
    return _.reduce(
      group,
      (result: any[], value, key) => {
        result.push({ header: key, columns: value });
        return result;
      },
      []
    );
  }, [columns, tableColumns]);

  const table = useReactTable({
    data,
    columns: groupedTableColumns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    setRowSelection({});
  }, [data]);

  return (
    <Table variant="striped" color="gray.500">
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={`hear-${headerGroup.id}`} color="gray.400">
            {headerGroup.headers.map((header) => {
              return (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  borderColor={borderColor}
                  borderRightWidth={header.subHeaders.length > 0 ? 1 : 0}
                  cursor="pointer"
                  onClick={header.column.getToggleSortingHandler()}
                  fontSize={{ sm: '10px', lg: '12px' }}
                  color="gray.400"
                  width={header.column.id === 'select' ? 0 : undefined}
                  pe={header.column.id === 'select' ? '0px' : '10px'}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: '',
                    desc: '',
                  }[header.column.getIsSorted() as string] ?? null}
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td
                    key={`cell-${cell.id}`}
                    fontSize={{ sm: '14px' }}
                    borderColor="transparent"
                    width={cell.column.id === 'select' ? '30px' : 'auto'}
                    pe="0px"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
