import * as React from 'react';
// import styled from 'styled-components';

import {
  makeStyles,
  // eslint-disable-next-line no-unused-vars
  Theme,
  createStyles,
} from '@material-ui/core';
import Header from './Header';
import Sidebar from './Sidebar';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
);

const { useState } = React;

export default function Layout(props: React.Props<any>) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleExpand = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Header
        toggleSidebar={toggleExpand}
        classes={{ root: classes.appBar, menu: classes.menuButton }}
      />
      <Sidebar
        toggleSidebar={toggleExpand}
        open={open}
        classes={{
          drawer: classes.drawer,
          drawerPaper: classes.drawerPaper,
          toolbar: classes.toolbar,
        }}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
