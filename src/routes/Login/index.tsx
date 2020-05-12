import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
// import { useDispatch } from 'react-redux';
import {
  Container,
  Avatar,
  // eslint-disable-next-line no-unused-vars
  Theme,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import { EnhancedEncryption } from '@material-ui/icons';

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

export default function Login() {
  const history = useHistory();
  // const dispatch = useDispatch();

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

  const handleSubmit = () => {
    history.push('/');
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
            value={username}
            onChange={handleUsername}
            label='Email Address'
            required
            variant='outlined'
          />
          <TextFieldWrapper
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
