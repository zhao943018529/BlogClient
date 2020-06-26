import * as React from 'react';
import MainFeature from './components/MainFeature';
import Features from './components/Features';
import Main from './components/Main';

export default function Home() {
  return (
    <React.Fragment>
      <MainFeature />
      <Features />
      <Main />
    </React.Fragment>
  );
}
