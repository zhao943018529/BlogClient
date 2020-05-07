import * as React from 'react';
// import styled from 'styled-components';

import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  IconButton,
  Typography,
  Hidden,
  makeStyles,
  // eslint-disable-next-line no-unused-vars
  Theme,
  createStyles,
  Toolbar,
} from '@material-ui/core';
import {
  Inbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles(
  (theme: Theme) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    createStyles({
      root: {
        display: 'flex',
      },
      toolbar: theme.mixins.toolbar,
      drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      appBar: {
        [theme.breakpoints.up('sm')]: {
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
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
    })
  // eslint-disable-next-line function-paren-newline
);

const { useState } = React;

export default function Layout(props: React.Props<any>) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleExpand = () => {
    setOpen(!open);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={toggleExpand} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Iron
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden xsDown>
          <Drawer variant='permanent' anchor='left' open>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smUp>
          <Drawer
            variant='temporary'
            onClose={toggleExpand}
            anchor='left'
            open={open}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
