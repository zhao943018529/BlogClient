import * as React from 'react';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import MainFeature from './components/MainFeature';
import Features from './components/Features';
import Main from './components/Main';

export default function blog() {
  return (
    <Container maxWidth='lg'>
      <Header />
      <main>
        <MainFeature />
        <Features />
        <Main />
      </main>
    </Container>
  );
}
