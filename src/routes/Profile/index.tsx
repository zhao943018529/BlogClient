import * as React from 'react';
import styled from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Layout from '@components/Layout2';
import Routes from './routes/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      padding: '12px 30px',
      width: '100%',
      maxWidth: '100%',
      position: 'relative',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '15px',
        paddingRight: '15px',
      },
    },
  })
);

export default function Profile() {
  const classes = useStyles();

  return (
    <Layout>
      <section className={classes.section}>
        <Routes />
      </section>
    </Layout>
  );
}
