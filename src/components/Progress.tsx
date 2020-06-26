import * as React from 'react';
import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
    },
  })
);

export default function Progress() {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress thickness={6} color='inherit' />
    </Backdrop>
  );
}
