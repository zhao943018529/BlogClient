import * as React from 'react';
import styled from 'styled-components';
import {
  Menu,
  IconButton,
  AppBar,
  Toolbar,
  MenuItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Mail,
  AccountCircle,
  GitHub,
  Facebook,
} from '@material-ui/icons';

const { useState } = React;

const GrowDiv = styled.div`
  flex-grow: 1;
`;

export default function Home() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Home
          </Typography>
          <GrowDiv />
          <div>
            <IconButton>
              <Mail />
            </IconButton>
            <IconButton onClick={handleClick}>
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Menu
        id='customized-menu'
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        getContentAnchorEl={null}
        elevation={1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <GitHub fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Github' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Facebook fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Facebook' />
        </MenuItem>
      </Menu>
    </div>
  );
}
