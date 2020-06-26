import * as React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  useMediaQuery,
} from '@material-ui/core';
import styled from 'styled-components';
import Header from './Header2';
import Sidebar from './Sidebar2';

const sideWidth = 260;
const headerHeight = 72;

const useStyles = makeStyles((theme: Theme) =>
  createStyles<string, { expand: boolean }>({
    root: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      minHeight: '100vh',
      maxWidth: '100%',
      backfaceVisibility: 'hidden',
    },
    main: {
      paddingLeft: ({ expand }) => (expand ? sideWidth : 0),
      paddingTop: headerHeight,
      flex: '1 1 auto',
      display: 'flex',
      background: theme.palette.grey[200],
    },
    toolbar: {
      height: headerHeight,
    },
    drawer: {
      width: sideWidth,
      color: theme.palette.common.white,
      padding: '0 12px',
      boxSizing: 'border-box',
    },
    drawerPaper: {
      background: theme.palette.primary.main,
    },
    header: {
      left: ({ expand }) => (expand ? sideWidth : 0),
    },
  })
);

export default function Layout({ children }: React.Props<any>) {
  const [status, setStatus] = React.useState(true);
  const match = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const classes = useStyles({ expand: status && match });

  const toggleCallback = React.useCallback(
    () => setStatus((prev) => !prev),
    []
  );

  return (
    <div className={classes.root}>
      <Header
        classes={{ header: classes.header, toolbar: classes.toolbar }}
        toggle={toggleCallback}
      />
      <Sidebar
        open={status}
        onClose={toggleCallback}
        classes={{
          toolbar: classes.toolbar,
          drawer: classes.drawer,
          drawerPaper: classes.drawerPaper,
        }}
      />
      <main className={classes.main}>{children}</main>
    </div>
  );
}
