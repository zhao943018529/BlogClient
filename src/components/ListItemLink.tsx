/* eslint-disable react/display-name */
import * as React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  createStyles,
  makeStyles,
  // eslint-disable-next-line no-unused-vars
  Theme,
} from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

interface ILinkProps {
  icon: React.ReactElement<any>;
  to: string;
  primary: string;
  collapse?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles<string, { match: boolean }>({
    root: {
      color: (props) => (props.match ? '#FFFFFF' : theme.palette.text.primary),
      backgroundColor: (props) =>
        props.match
          ? theme.palette.primary.light
          : theme.palette.background.paper,
      '&:hover': {
        backgroundColor: (props) =>
          props.match ? theme.palette.primary.main : theme.palette.action.hover,
      },
    },
  })
);

export default function ListItemLink({
  icon,
  to,
  primary,
  collapse,
}: ILinkProps) {
  const match = useRouteMatch({ path: to, exact: true });
  const classes = useStyles({ match: !!match });
  const renderLink = React.useMemo<React.FunctionComponent<any>>(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink} className={classes.root}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <Hidden smDown smUp={collapse}>
        <ListItemText primary={primary} />
      </Hidden>
    </ListItem>
  );
}
