import * as React from 'react';
import { Toolbar } from '@material-ui/core';
import NavLink from './NavLink';

const links = [
  { to: '/category/javascript', name: 'Javascript' },
  { to: '/category/C++', name: 'C++' },
  { to: '/category/Ruby', name: 'Ruby' },
];

export default function Navbar() {
  return (
    <Toolbar component='nav' variant='dense'>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          name={link.name}
          color='textPrimary'
        />
      ))}
    </Toolbar>
  );
}
