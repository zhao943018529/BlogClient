import * as React from 'react';
import { Container, makeStyles, createStyles, Theme } from '@material-ui/core';
import Header from './components/Header';
import Routes from './routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
    },
    main: {
      padding: `${theme.spacing(1.2)}px ${theme.spacing(1)}px`,
    },
  })
);

export default function Blog() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth='lg'>
        <Header />
        <main className={classes.main}>
          <Routes />
        </main>
      </Container>
    </div>
  );
}
