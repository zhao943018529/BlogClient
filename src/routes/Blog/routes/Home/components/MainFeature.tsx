import * as React from 'react';
import styled from 'styled-components';
import { Typography, Paper, Grid, Link } from '@material-ui/core';

const Contaienr = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #c8c8c8;
  height: 100%;
  align-items: space-between;
`;

const GridContainer = styled(Grid)`
  width: 100%;
  height: 100%;
`;

const PaperWrapper = styled(Paper)`
  position: relative;
  height: 360px;

  @media (min-width: 960px) {
    height: 400px;
  }
`;

export default function MainFeature() {
  return (
    <PaperWrapper>
      <GridContainer container>
        <Grid item md={6} xs={12}>
          <Contaienr>
            <Typography variant='h3' component='h1'>
              {"I'm Iron man!!!"}
            </Typography>
            <Link variant='subtitle1' href='#' color='textPrimary'>
              Go through
            </Link>
          </Contaienr>
        </Grid>
      </GridContainer>
    </PaperWrapper>
  );
}
