import * as React from 'react';
import {
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  lighten,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  })
);

interface ToolbarProps {
  numSelected: number;
  deleteSelected(): void;
}

export default function TableToolbar({
  numSelected,
  deleteSelected,
}: ToolbarProps) {
  const classes = useToolbarStyles();
  const hasSelected = numSelected > 0;

  return (
    <Toolbar className={hasSelected ? classes.highlight : ''}>
      {hasSelected ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Article
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete' onClick={() => deleteSelected()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}
