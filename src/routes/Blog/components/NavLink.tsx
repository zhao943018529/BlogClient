import * as React from 'react';
import styled from 'styled-components';
import { Link as RouteLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

type IColor =
  | 'initial'
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'textPrimary'
  | 'textSecondary'
  | 'error';

interface ILinkProps {
  to: string;
  name: string;
  color: IColor;
}

const LinkWrapper = styled(Link)`
  ${({ theme }) => `
    padding: ${theme.spacing(1)}px;
    flex-shrink: 0;
  `}
`;

export default function NavLink({ to, name, color }: ILinkProps) {
  const CustomLink = React.useMemo<React.FunctionComponent<any>>(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef((props, ref) => (
        <RouteLink ref={ref} to={to} {...props} />
      )),
    [to]
  );

  return (
    <LinkWrapper color={color || 'primary'} component={CustomLink}>
      {name}
    </LinkWrapper>
  );
}
