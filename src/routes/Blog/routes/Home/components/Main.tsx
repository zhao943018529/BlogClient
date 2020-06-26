import * as React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import Post from './Post';
import Sidebar from './Sidebar';

const GridContainer = styled(Grid)`
  ${({ theme }) => `
    margin-top: ${theme.spacing(2)}px;
  `}
`;

export default function Main() {
  return (
    <GridContainer container spacing={2}>
      <Grid item md={8} xs={12}>
        <Post />
      </Grid>
      <Grid item md={4} xs={12}>
        <Sidebar />
      </Grid>
    </GridContainer>
  );
}
