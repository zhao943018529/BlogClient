import * as React from 'react';
import { Typography, useTheme, Button } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_LOCAL_USERINFO } from '@graphql/user';
import Loading from '../../components/Loading';

export default function Home() {
  const { data, loading, client } = useQuery<{ userInfo: any }>(
    GET_LOCAL_USERINFO
  );
  const [value, setValue] = React.useState(1);
  const theme = useTheme();

  if (loading) {
    return (
      <div>
        <Typography variant='h4'>Wellcome</Typography>
        <Loading color={theme.palette.primary.main}></Loading>
      </div>
    );
  }

  return (
    <div>
      {data && data.userInfo ? data.userInfo.username : '----'}
      <Button onClick={() => setValue(value + 1)}>{value}</Button>
    </div>
  );
}
