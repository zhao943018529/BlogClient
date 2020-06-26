import * as React from 'react';
import styled from 'styled-components';
import {
  makeStyles,
  createStyles,
  Theme,
  Paper,
  TableContainer,
  TablePagination,
  Table,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import TableToolbar from './TableToolbar';
import EnhancedTableHead, { ColumnProps } from './EnhancedTableHead';
import EnhancedBody from './EnhancedBody';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

interface TableModification {
  page: number;
  order: 'asc' | 'desc';
  pageSize: number;
  orderBy: string | null;
}

interface EnhancedTableProps {
  columns: ColumnProps[];
  data: any[];
  defaultSize?: number;
  count: number;
  loading: boolean;
  deleteCallback(ids: string[]): void;
  editCallback(id: string): void;
  onChange(data: TableModification): void;
}

const Action = styled.div`
  display: flex;
`;

export default function EnhancedTable({
  columns,
  data,
  count,
  loading,
  defaultSize,
  deleteCallback,
  editCallback,
  onChange,
}: EnhancedTableProps) {
  const classes = useStyles();

  const [selected, setSelected] = React.useState<string[]>([]);
  const [order, setOrder] = React.useState<'asc' | 'desc'>('desc');
  const [sortValue, setSortValue] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(defaultSize || 10);
  // const pageRef = React.useRef(pageSize);
  const updateCallback = (change: Partial<TableModification>) => {
    onChange({
      page,
      pageSize,
      order,
      orderBy: sortValue,
      ...change,
    });
  };

  // const updateCallback = (change: Partial<TableModification>) => {
  //   update({
  //     page,
  //     pageSize,
  //     order,
  //     orderBy: sortValue,
  //     ...change,
  //   });
  // };

  const toggleSort = (key: string) => {
    let nextOrder: 'asc' | 'desc';
    if (sortValue === key) {
      nextOrder = order === 'asc' ? 'desc' : 'asc';
      // setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      nextOrder = 'desc';
      // setOrder('desc');
      setSortValue(key);
    }
    setOrder(nextOrder);
    setPage(0);
    updateCallback({ orderBy: key, order, page: 0 });
  };

  const toggleSelect = React.useCallback(() => {
    if (selected.length > 0) {
      setSelected([]);
    } else {
      setSelected(data.map((item) => item.id));
    }
  }, [data, selected]);

  const deleteSelected = React.useCallback(() => {
    deleteCallback(selected);
    setSelected([]);
  }, [selected, deleteCallback]);

  const selectRow = React.useCallback(
    (event: React.MouseEvent<HTMLTableRowElement>, id: string) => {
      if (selected.indexOf(id) === -1) {
        setSelected([...selected, id]);
      } else {
        setSelected(selected.filter((item) => item !== id));
      }
    },
    [selected]
  );

  // 此处要避免初次请求，因为本来这么写的目的是为了优化处理多个请求参数发生变动就调用请求callback，但是由于useEffect在初次加载一定会执行这个函数
  // React.useEffect(() => {
  //   update({
  //     page: page + 1,
  //     pageSize: pageRef.current,
  //     order,
  //     orderBy: sortValue,
  //   });
  // }, [page, order, sortValue]);

  const handleRowsPerPageChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows = parseInt(evt.target.value, 10);
    setPage(0);
    setPageSize(rows);
    // pageRef.current = rows;
    updateCallback({ pageSize: rows });
  };

  const handlePageChange = (evt: unknown, current: number) => {
    setPage(current);
    updateCallback({ page: current });
  };

  return (
    <div className={classes.root}>
      <Paper>
        <TableToolbar
          numSelected={selected.length}
          deleteSelected={deleteSelected}
        />
        <TableContainer>
          <Table>
            <EnhancedTableHead
              selectAll={toggleSelect}
              rowCount={pageSize}
              column={columns}
              sortKey={sortValue}
              numSelected={selected.length}
              order={order}
              sortChange={toggleSort}
            />
            <EnhancedBody
              data={data}
              emptyRows={pageSize - data.length}
              selected={selected}
              eidtCallback={editCallback}
              deleteCallback={(id) => deleteCallback([id])}
              selectRow={selectRow}
              columns={columns}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={count}
          page={page}
          rowsPerPage={pageSize}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
        />
      </Paper>
    </div>
  );
}
