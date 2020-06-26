import * as React from 'react';
import styled from 'styled-components';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import image from '@assets/images/car.jpg';

const Container = styled.div`
  display: flex;
`;

const ContentLayout = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardMediaWrapper = styled(CardMedia)`
  width: 131px;
`;

export default function FeatureCard() {
  return (
    <Card>
      <Container>
        <ContentLayout>
          <Typography variant='h5' component='h3'>
            Featured post
          </Typography>
          <Typography variant='subtitle1' color='secondary'>
            Nov 12
          </Typography>
          <Typography variant='subtitle1' paragraph>
            Let’s look at how the ability to pass functions into our tagged
            templates can enable things to become more dynamic.
          </Typography>
          <Typography variant='subtitle1'>Go ahead...</Typography>
        </ContentLayout>
        <CardMediaWrapper image={image} title='far away' />
      </Container>
    </Card>
  );
}
