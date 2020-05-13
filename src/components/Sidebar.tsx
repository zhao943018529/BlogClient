import * as React from 'react';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useTheme,
} from '@material-ui/core';
import {
  Inbox as InboxIcon,
  Mail as MailIcon,
  Schedule as ScheduleIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  AllInbox,
  Edit,
  // ArrowRight,
} from '@material-ui/icons';
import ListItemLink from './ListItemLink';
import { getCollapse, toggleActionType } from '../store/common/index';

const { useCallback, useEffect } = React;

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
  const theme = useTheme();
  const { classes, toggleSidebar, open } = props;
  const dispatch = useDispatch();
  const collapse = useSelector(getCollapse);
  const toggleCollapse = useCallback(() => {
    dispatch({ type: toggleActionType, payload: !collapse });
  }, [dispatch, collapse]);

  const handleResize = useCallback(
    _.throttle(() => {
      if (window.innerWidth < theme.breakpoints.values.md) {
        dispatch({ type: toggleActionType, payload: true });
      }
    }, 150),
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const drawer = (
    <div>
      <SideTop className={classes && classes.toolbar}>
        <Hidden smDown>
          <IconButton onClick={toggleCollapse} className='layout-side-collapse'>
            {collapse ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
        </Hidden>
      </SideTop>
      <Divider />
      <List>
        {[
          { to: '/', primary: 'Home', exact: true, icon: <InboxIcon /> },
          { to: '/todo', primary: 'MyTodos', icon: <ScheduleIcon /> },
          { to: '/todo2', primary: 'TodosRouter', icon: <AllInbox /> },
          { to: '/editor', primary: 'Editor', icon: <Edit /> },
        ].map((item) => (
          <ListItemLink
            key={item.to}
            to={item.to}
            primary={item.primary}
            icon={item.icon}
            collapse={collapse}
            exact={item.exact}
          />
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <IconButton>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </IconButton>
            <Hidden smDown smUp={collapse}>
              <ListItemText primary={text} />
            </Hidden>
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
