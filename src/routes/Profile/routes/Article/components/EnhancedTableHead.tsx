import * as React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';

export interface ColumnProps {
  key: string;
  title: string;
  sort?: boolean;
  normalize?(val: any): void;
}

interface EnhancedTableHeadProps {
  column: ColumnProps[];
  numSelected: number;
  rowCount: number;
  sortKey: string | nulll;
  order: 'asc' | 'desc';
  selectAll(): void;
  sortChange(key: string): void;
}

export default function EnhancedTableHead({
  column,
  numSelected,
  rowCount,
  sortKey,
  order,
  selectAll,
  sortChange,
}: EnhancedTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={selectAll}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {column.map((item) => {
          const content = item.sort ? (
            <TableSortLabel
              active={sortKey === item.key}
              direction={sortKey === item.key ? order : 'asc'}
              onClick={() => sortChange(item.key)}
            >
              {item.title}
            </TableSortLabel>
          ) : (
            <span>{item.title}</span>
          );
          return (
            <TableCell
              key={item.key}
              padding='default'
              sortDirection={sortKey === item.key ? order : false}
            >
              {content}
            </TableCell>
          );
        })}
        <TableCell padding='default'>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}
