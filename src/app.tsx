import * as React from 'react';
import styled from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import {
  createMuiTheme,
  ThemeProvider,
  Backdrop,
  CircularProgress,
  Theme,
} from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
// import { Backdrop, CircularProgress, Theme } from '@material-ui/core';

import Routes from './routes';
import { getTheme } from './store/common';
import { useUserState } from './utils/user';

const ThemeBackdrop = styled(Backdrop)`
  color: ${(props) => props.theme.palette.secondary.main};
`;

export default function App() {
  const { getUserInfo, data, loading, client } = useUserState();
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

  const [inited, setInited] = React.useState(false);

  React.useEffect(() => {
    getUserInfo();
    setInited(true);
  }, []);

  if (!inited || loading) {
    return (
      <ThemeBackdrop open={true} theme={theme}>
        <CircularProgress color='inherit' />
      </ThemeBackdrop>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <Routes />
      </StyledThemeProvider>
    </ThemeProvider>
  );
}
