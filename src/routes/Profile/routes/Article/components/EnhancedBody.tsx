import * as React from 'react';
import styled from 'styled-components';
import {
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { ColumnProps } from './EnhancedTableHead';

const Action = styled.div`
  display: flex;
`;

interface EnhancedBodyProps {
  data: any[];
  emptyRows: number;
  columns: ColumnProps[];
  selectRow(event: React.MouseEvent<HTMLTableRowElement>, id: string): void;
  eidtCallback(id: string): void;
  deleteCallback(id: string): void;
  selected: string[];
}

export default function EnhancedBody({
  data,
  emptyRows,
  columns,
  selected,
  selectRow,
  eidtCallback,
  deleteCallback,
}: EnhancedBodyProps) {
  const handleDelete = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    const current = evt.currentTarget;
    deleteCallback(current.dataset.id as string);
  };

  return (
    <TableBody>
      {data.map((row) => {
        const isSelected = selected.indexOf(row.id) !== -1;

        return (
          <TableRow
            key={row.id}
            role='checkbox'
            onClick={(event) => selectRow(event, row.id)}
            selected={isSelected}
          >
            <TableCell padding='checkbox'>
              <Checkbox checked={isSelected} />
            </TableCell>

            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.normalize
                  ? column.normalize(row[column.key])
                  : row[column.key]}
              </TableCell>
            ))}
            <TableCell>
              <Action>
                <IconButton onClick={handleDelete} data-id={row.id}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => eidtCallback(row.id)}>
                  <EditIcon />
                </IconButton>
              </Action>
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}
