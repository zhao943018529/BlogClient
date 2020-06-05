import * as React from 'react';
import { Link as RouteLink, useRouteMatch } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles<any, { isActive: boolean }>({
    root: {
      backgroundColor: (props) =>
        props.isActive
          ? theme.palette.primary.main
          : theme.palette.background.default,
      color: (props) =>
        props.isActive
          ? theme.palette.background.default
          : theme.palette.text.secondary,
    },
    icon: {
      color: (props) =>
        props.isActive
          ? theme.palette.background.default
          : theme.palette.text.secondary,
    },
  })
);

interface IFilterLinkProps {
  name: string;
  to: string;
  icon: React.ReactElement<any>;
}

export default function FilterLink({ name, to, icon }: IFilterLinkProps) {
  const match = useRouteMatch({ path: to, exact: true });
  const classes = useStyles({ isActive: !!match });

  const CustomLink = React.useMemo<React.FunctionComponent<any>>(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef((itemProps, ref) => (
        <RouteLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem component={CustomLink} className={classes.root}>
      {icon ? (
        <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
      ) : null}
      <ListItemText primary={name} />
    </ListItem>
  );
}
