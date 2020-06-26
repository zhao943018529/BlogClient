import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  Container,
  Avatar,
  Theme,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { EnhancedEncryption } from '@material-ui/icons';
import { loginUserSuccess } from '@store/common/User';
import { saveToken } from '@utils/token';
import { useUserState } from '@utils/user';
import { LOGIN_USER, USER_LOGIN } from '@graphql/user';

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 64px;
`;

const AvatarWrapper = styled(Avatar)`
  ${({ theme }) => `
  color: #fff;
  background-color: ${theme.palette.primary.main};
  margin:${theme.spacing(1)};
  `}
`;

const Form = styled.form`
  ${({ theme }) => `
        width: 100%;
        margin-top: ${theme.spacing(1)}px;
    `}
`;

const TextFieldWrapper = styled(TextField)`
  ${({ theme }) => `
        width: 100%;
        margin: ${theme.spacing(1)}px 0 ${theme.spacing(0.5)}px 0;
    `}
`;

const FormControlLabelWrapper = styled(FormControlLabel)`
  align-self: flex-start;
`;

const ActionContainer = styled.div`
  width: 100%;
`;

const ButtonWrapper = styled(Button)`
  ${({ theme }) => `
        margin: ${theme.spacing(1.2)}px 0 ${theme.spacing(0.5)}px 0;
        width: 100%;
    `}
`;

interface ILoginResponse {
  login: IBaseResponse<IUser>;
}

export default function Login() {
  const client = useApolloClient();
  const completedCallback = React.useCallback((data: { getUserInfo: any }) => {
    if (data.getUserInfo != null) {
      history.push('/');
    }
  }, []);

  const { getUserInfo, loading } = useUserState<{ getUserInfo: any }>(
    completedCallback
  );
  const history = useHistory();
  const dispatch = useDispatch();
  // const user = useSelector(getUser, shallowEqual);

  const [checked, setChecked] = React.useState(false);
  const handleCheck = () => {
    setChecked(!checked);
  };

  const [username, setUsername] = React.useState<string>('');

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const [password, setPassword] = React.useState<string>('');

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const [loginUser, { data }] = useLazyQuery<
    ILoginResponse,
    { username: string; password: string }
  >(LOGIN_USER, { variables: { username, password } });

  const handleSubmit = () => {
    // loginUser();
    // dispatch(getUserAction(username, password));
    axios
      .post<{ code: number; data: any }>('/api/login', { username, password })
      .then((res) => {
        if (res.data.code === 200) {
          saveToken(res.data.data);
          client.writeQuery({ query: USER_LOGIN, data: { isLoggedIn: true } });
          getUserInfo();
          // history.push('/');
        }
      });
  };

  return (
    <Container maxWidth='xs'>
      <Content>
        <AvatarWrapper>
          <EnhancedEncryption />
        </AvatarWrapper>
        <Typography variant='h5' component='h1'>
          Sign in
        </Typography>
        <Form>
          <TextFieldWrapper
            className='login-username'
            value={username}
            onChange={handleUsername}
            label='Email Address'
            required
            variant='outlined'
          />
          <TextFieldWrapper
            className='password-username'
            value={password}
            onChange={handlePassword}
            label='Password'
            required
            variant='outlined'
          />
        </Form>
        <FormControlLabelWrapper
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheck}
              name='remember'
              color='primary'
            />
          }
          label='Remember me'
        />
      </Content>
      <ActionContainer>
        <ButtonWrapper
          className='login-submit'
          onClick={handleSubmit}
          variant='contained'
          color='primary'
        >
          SIGN IN
        </ButtonWrapper>
      </ActionContainer>
    </Container>
  );
}
