import * as React from 'react';
import styled from 'styled-components';
import { Paper, Typography, Link } from '@material-ui/core';

const PaperWrapper = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    background-color:${theme.palette.grey[300]};
  `}
`;

export default function Sidebar() {
  return (
    <React.Fragment>
      <PaperWrapper>
        <Typography variant='h6' component='h6'>
          About
        </Typography>
        <Typography variant='body2' paragraph>
          Etiam porta sem malesuada magna mollis euismod. Cras mattis
          consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla
          sed consectetur.
        </Typography>
      </PaperWrapper>
      <Typography variant='h6' component='h6'>
        Archives
      </Typography>
      <Link color='secondary' href='#'>
        March 2020
      </Link>
    </React.Fragment>
  );
}
