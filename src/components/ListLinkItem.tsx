import * as React from 'react';
import styled from 'styled-components';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Link as RouteLink, useRouteMatch } from 'react-router-dom';

interface LinkItemProps {
  to: string;
  icon?: React.ReactNode;
  primary?: string;
  exact?: boolean;
  state?: { name: string };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles<string, { active: boolean }>({
    root: {
      background: ({ active }) => (active ? theme.palette.secondary.light : ''),
      borderRadius: theme.shape.borderRadius,
      '&:hover': {
        background: ({ active }) =>
          active ? theme.palette.secondary.light : theme.palette.action.hover,
      },
    },
    text: {
      color: theme.palette.common.white,
    },
  })
);

export default function ListLinkItem({
  to,
  icon,
  primary,
  state,
}: LinkItemProps) {
  const match = useRouteMatch({ path: to, exact: true });
  const classes = useStyles({ active: match });
  const LinkComponent = React.useMemo<React.FunctionComponent<any>>(
    () =>
      React.forwardRef((props, ref) => (
        <RouteLink to={to} ref={ref} {...props} />
      )),
    [to]
  );

  return (
    <ListItem component={LinkComponent} className={classes.root}>
      {icon ? (
        <ListItemIcon className={classes.text}>{icon}</ListItemIcon>
      ) : null}
      {primary ? (
        <ListItemText className={classes.text}>{primary}</ListItemText>
      ) : null}
    </ListItem>
  );
}
