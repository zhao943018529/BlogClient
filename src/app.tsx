import * as React from 'react';
import styled, {
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider,
  Backdrop,
  CircularProgress,
  Theme,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
// import { Backdrop, CircularProgress, Theme } from '@material-ui/core';
import { GET_USERINFO, GET_LOCAL_USERINFO } from '@graphql/user';
import { getToken, removeToken } from '@utils/token';

import Routes from './routes';
import { getTheme } from './store/common';

const ThemeBackdrop = styled(Backdrop)`
  color: ${(props) => props.theme.palette.secondary.main};
`;

export default function App() {
  const { data, loading, client } = useQuery<{ getUserInfo: any }>(
    GET_USERINFO
  );
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
  // window.$theme = theme;
  React.useEffect(() => {
    if (data?.getUserInfo != null) {
      client.writeQuery({
        query: GET_LOCAL_USERINFO,
        data: { userInfo: data?.getUserInfo },
      });
    }
  }, [data]);

  if (loading) {
    return (
      <ThemeBackdrop open={true} theme={theme}>
        <CircularProgress color='inherit' />
      </ThemeBackdrop>
    );
  }

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
