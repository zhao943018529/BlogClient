import * as React from 'react';
import styled from 'styled-components';
import { CircularProgress, CircularProgressProps } from '@material-ui/core';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface LoadMoreProps extends CircularProgressProps {
  container?: string;
}

export default function LoadMore({
  container,
  ...circularProgressProps
}: LoadMoreProps) {
  return (
    <Container className={container}>
      <CircularProgress {...circularProgressProps} />
    </Container>
  );
}
