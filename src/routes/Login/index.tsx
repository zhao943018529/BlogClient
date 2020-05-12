import * as React from 'react';
import styled from 'styled-components';
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
  const [checked, setChecked] = React.useState(false);
  const handleCheck = () => {
    setChecked(!checked);
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
          <TextFieldWrapper label='Email Address' required variant='outlined' />
          <TextFieldWrapper label='Password' required variant='outlined' />
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
        <ButtonWrapper variant='contained' color='primary'>
          SIGN IN
        </ButtonWrapper>
      </ActionContainer>
    </Container>
  );
}
