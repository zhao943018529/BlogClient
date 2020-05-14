import * as React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import SearchTool from './Search';

const LogonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default function Header() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <LogonContainer>
          <Typography variant='h5' component='h1'>
            Blog
          </Typography>
        </LogonContainer>
        <SearchTool />
      </Toolbar>
    </AppBar>
  );
}
