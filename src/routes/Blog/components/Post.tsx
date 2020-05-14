import * as React from 'react';
import styled from 'styled-components';
import { Typography, Divider } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Post() {
  return (
    <Container>
      <Typography variant='h6' component='h6' gutterBottom>
        From the firebose
      </Typography>
      <Divider />
    </Container>
  );
}
