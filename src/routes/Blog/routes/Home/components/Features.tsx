import * as React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import FeatureCard from './FeatureCard';

const GridWrapper = styled(Grid)`
  ${({ theme }) => `
    margin-top:${theme.spacing(1)}px;
  `}
`;

export default function Features() {
  return (
    <GridWrapper container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FeatureCard />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FeatureCard />
      </Grid>
    </GridWrapper>
  );
}
