import * as React from 'react';
import styled from 'styled-components';
import {
  Hidden,
  Drawer,
  Divider,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import {
  Inbox as InboxIcon,
  Mail as MailIcon,
  Schedule as ScheduleIcon,
  KeyboardArrowLeft,
  // ArrowRight,
} from '@material-ui/icons';
import ListItemLink from './ListItemLink';

interface IClasses {
  toolbar: string;
  drawer: string;
  drawerPaper: string;
}

interface ISideBarProps {
  open?: boolean;
  classes?: IClasses;
  toggleSidebar: () => void;
}

const SideTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default function Sidebar(props: ISideBarProps) {
  const { classes, toggleSidebar, open } = props;

  const drawer = (
    <div>
      <SideTop className={classes && classes.toolbar}>
        <Hidden smDown>
          <IconButton>
            <KeyboardArrowLeft />
          </IconButton>
        </Hidden>
      </SideTop>
      <Divider />
      <List>
        {[
          { to: '/', primary: 'Home', icon: <InboxIcon /> },
          { to: '/todo', primary: 'MyTodos', icon: <ScheduleIcon /> },
        ].map((item) => (
          <ListItemLink
            key={item.to}
            to={item.to}
            primary={item.primary}
            icon={item.icon}
          />
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
    <nav className={classes && classes.drawer}>
      <Hidden smDown>
        <Drawer
          variant='permanent'
          anchor='left'
          open
          classes={{
            paper: classes && classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          variant='temporary'
          onClose={toggleSidebar}
          anchor='left'
          open={open}
          classes={{
            paper: classes && classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}
