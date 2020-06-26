import * as React from 'react';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  makeStyles,
  createStyles,
  Avatar,
  Theme,
  IconButton,
  Badge,
  Typography,
} from '@material-ui/core';
import { MoreVert, Notifications } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  position: absolute;
  right: 0;
  transition: left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
`;

const ExpandDiv = styled.div`
  flex: 1 1 0;
`;

interface Classes {
  toolbar: string;
  header: string;
}

interface HeaderProps {
  classes: Classes;
  toggle(): void;
}

const AppBarWrapper = styled(AppBar)`
  box-shadow: none;
`;

const AvatarWrapper = styled(Avatar)`
  ${({ theme }: { theme: Theme }) => `
    color:${theme.palette.grey[500]};
    background:${theme.palette.common.white};
  `}
`;

export default function Header({ classes, toggle }: HeaderProps) {
  const location = useLocation<{ name: string }>();

  let title;
  switch (location.pathname) {
    case '/profile':
      title = '配置中心';
      break;
    case '/profile/article':
      title = '博客管理';
      break;
    case '/profile/me':
      title = '个人中心';
      break;
    case '/profile/editor':
      title = '新增文章';
      break;
    default:
      if (/\/profile\/editor\/.+/.test(location.pathname)) {
        title = '更新文章';
      }
      break;
  }

  return (
    <Container className={classes.header}>
      <AppBarWrapper position='static' color='transparent'>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={toggle}>
            <AvatarWrapper>
              <MoreVert fontSize='large' />
            </AvatarWrapper>
          </IconButton>
          <Typography variant='h6' component='h3' color='textPrimary'>
            {title}
          </Typography>
          <ExpandDiv />
          <IconButton>
            <Badge badgeContent={8} color='secondary'>
              <Notifications />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBarWrapper>
    </Container>
  );
}
