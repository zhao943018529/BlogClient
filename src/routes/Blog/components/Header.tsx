import * as React from 'react';
import styled from 'styled-components';
import { Toolbar, Typography } from '@material-ui/core';
import SearchTool from './SearchTool';
import Navbar from './Navbar';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ToolbarWrapper = styled(Toolbar)`
  ${({ theme }) => `
    border-bottom: 1px solid ${theme.palette.divider};
  `}
`;

export default function Header() {
  return (
    <React.Fragment>
      <ToolbarWrapper>
        <LogoContainer>
          <Typography variant='h5' component='h1'>
            Logo
          </Typography>
        </LogoContainer>
        <SearchTool />
      </ToolbarWrapper>
      <Navbar />
    </React.Fragment>
  );
}
