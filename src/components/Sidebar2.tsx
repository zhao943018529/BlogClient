import * as React from 'react';
import {
  Drawer,
  Avatar,
  Typography,
  List,
  Divider,
  Hidden,
  Theme,
} from '@material-ui/core';
import { Book, AllInbox, AccountBox, Android } from '@material-ui/icons';
import styled from 'styled-components';
import ListLinkItem from './ListLinkItem';

const ListContainer = styled.div`
  width: 260px;
`;

interface Classes {
  toolbar: string;
  drawer: string;
  drawerPaper: string;
}

interface SidebarProps {
  open: boolean;
  classes: Classes;
  onClose(): void;
}

const routeData = [
  {
    to: '/profile',
    primary: '管理中心',
    icon: <AllInbox />,
    state: { name: '管理中心' },
  },
  {
    to: '/profile/article',
    primary: '博客管理',
    icon: <Book />,
    state: { name: '博客管理' },
  },
  {
    to: '/profile/me',
    primary: '个人中心',
    icon: <AccountBox />,
    state: { name: '个人中心' },
  },
];

const SideTop = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  ${({ theme }: { theme: Theme }) => `
    color:${theme.palette.common.white}
  `}
`;

const AvatarWrapper = styled(Avatar)`
  ${({ theme }: { theme: Theme }) => `
    color:${theme.palette.primary.main};
    background:${theme.palette.common.white};
    margin:${theme.spacing(1.5)}px;
  `}
`;

export default function Sidebar({ open, classes, onClose }: SidebarProps) {
  const list = (
    <ListContainer className={classes.drawer}>
      <SideTop className={classes.toolbar}>
        <AvatarWrapper>
          <Android />
        </AvatarWrapper>
        <Typography variant='h6' component='span' color='inherit'>
          Material-UI
        </Typography>
      </SideTop>
      <Divider />
      <List component='div'>
        {routeData.map((item) => (
          <ListLinkItem key={item.to} {...item} />
        ))}
      </List>
    </ListContainer>
  );

  return (
    <nav>
      <Hidden smDown>
        <Drawer
          anchor='left'
          open={open}
          variant='persistent'
          onClose={onClose}
          classes={{ paper: classes.drawerPaper }}
        >
          {list}
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          anchor='left'
          open={open}
          variant='temporary'
          onClose={onClose}
          classes={{ paper: classes.drawerPaper }}
        >
          {list}
        </Drawer>
      </Hidden>
    </nav>
  );
}
