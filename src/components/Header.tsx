import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  AccountCircle,
  Mail,
  Settings,
  Facebook,
  ColorLens,
  Input as InputIcon,
} from '@material-ui/icons';
import Skin from './Skin';

const { useState } = React;

interface IClasses {
  root: string;
  menu: string;
}

interface IHeaderProps {
  toggleSidebar: React.MouseEventHandler;
  classes?: IClasses;
}

const GrowDiv = styled.div`
  flex: 1;
`;

const ActionDiv = styled.div`
  color: #ffffff;
`;

export default function Header(props: IHeaderProps) {
  const { classes, toggleSidebar } = props;
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const [open, setOpen] = useState(false);

  const handleDialogClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <AppBar position='fixed' className={classes && classes.root}>
      <Toolbar>
        <IconButton onClick={toggleSidebar} className={classes && classes.menu}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap>
          Home
        </Typography>
        <GrowDiv />
        <ActionDiv>
          <IconButton color='inherit'>
            <Mail />
          </IconButton>
          <IconButton color='inherit' onClick={handleClick}>
            <AccountCircle />
          </IconButton>
          <IconButton color='inherit' onClick={() => setOpen(true)}>
            <ColorLens />
          </IconButton>
        </ActionDiv>
      </Toolbar>
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
        <MenuItem onClick={handleLogin}>
          <ListItemIcon>
            <InputIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Sign in' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Settings' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Facebook fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Facebook' />
        </MenuItem>
      </Menu>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Theme</DialogTitle>
        <DialogContent>
          <Skin />
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
