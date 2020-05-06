/* eslint-disable react/display-name */
import * as React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

interface ILinkProps {
  icon: React.ReactElement<any>;
  to: String;
  primary: String;
}

export default function ListItemLink({ icon, to, primary }: ILinkProps) {
  const renderLink = React.useMemo<React.FunctionComponent<any>>(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
}
