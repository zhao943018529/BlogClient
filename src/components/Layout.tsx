import * as React from 'react';
import { useSelector } from 'react-redux';
// import styled from 'styled-components';

import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Header from './Header';
import Sidebar from './Sidebar';
import { getCollapse } from '../store/common';

const drawerWidthSM = 62;
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles<string, { collapse: boolean }>({
    root: {
      display: 'flex',
    },
    drawerPaper: {
      width: (props) => (props.collapse ? drawerWidthSM : drawerWidth),
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: (props) => (props.collapse ? drawerWidthSM : drawerWidth),
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: (props) =>
          `calc(100% - ${props.collapse ? drawerWidthSM : drawerWidth}px)`,
        marginLeft: (props) => (props.collapse ? drawerWidthSM : drawerWidth),
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
  const collapse = useSelector(getCollapse);
  const classes = useStyles({ collapse });
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
