import * as React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import Loading from '../../components/Loading';

export default function Home() {
  const theme = useTheme();

  return (
    <div>
      <Typography variant='h4'>Wellcome</Typography>
      <Loading color={theme.palette.primary.main}></Loading>
    </div>
  );
}
