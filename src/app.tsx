import * as React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import Routes from './routes';
import { getTheme } from './store/common';

export default function App() {
  const themeData = useSelector(getTheme, shallowEqual);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: themeData.primary,
      },
      secondary: {
        // This is green.A700 as hex.
        main: themeData.secondary,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Router>
          <Routes />
        </Router>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}
