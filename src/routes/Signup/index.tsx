import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Avatar,
  Button,
  Typography,
  makeStyles,
  TextField,
  Theme,
  createStyles,
} from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Home } from '@material-ui/icons';

const { useState, useCallback } = React;

const AddUser = gql`
  mutation AddUser($user: AddUserInput!) {
    addUser(user: $user) {
      code
      success
      message
    }
  }
`;

interface IAddUserResponse {
  addUser: IBaseResponse<IUser>;
}

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
`;

const Form = styled.form`
  ${({ theme }: { theme: Theme }) => `
      margin-top: ${theme.spacing(2)}px;
      width: 100%;
  `}
`;

const NameTextContainer = styled.div`
  ${({ theme }: { theme: Theme }) => `
      margin:${theme.spacing(0.5)}px 0 ${theme.spacing(1)}px 0;
      display: flex;

      & > div:nth-child(2){
        margin-left: ${theme.spacing(0.5)}px;
      }
  `}
`;

const TextFieldWrapper = styled(TextField)`
  ${({ theme }) => `
    margin:${theme.spacing(0.5)}px 0 ${theme.spacing(1)}px 0;
    width: 100%;
  `}
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  })
);

const ActionContainer = styled.div`
  margin-top: 8px;
`;

interface IUserResponse {
  code: number;
}

export default function Signup() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    phone: '',
    birthday: '',
  });

  const [addUser, { data }] = useMutation<IAddUserResponse, any>(AddUser);
  const handleSubmit = () => {
    addUser({ variables: { user: formData } });
  };

  const history = useHistory();

  React.useEffect(() => {
    if (data?.addUser.success) {
      history.push('/login');
    }
  }, [data]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  return (
    <Container maxWidth='xs'>
      <TopContainer>
        <Avatar className={classes.avatar}>
          <Home />
        </Avatar>
        <Typography variant='h5' component='h1'>
          Sign up
        </Typography>
        <Form>
          <NameTextContainer>
            <TextField
              label='First Name'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              variant='outlined'
            />
            <TextField
              label='Last Name'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              variant='outlined'
            />
          </NameTextContainer>
          <TextFieldWrapper
            label='Username'
            name='username'
            value={formData.username}
            variant='outlined'
            onChange={handleChange}
          />
          <TextFieldWrapper
            label='Password'
            name='password'
            value={formData.password}
            variant='outlined'
            onChange={handleChange}
          />
          <TextFieldWrapper
            label='Phone'
            name='phone'
            value={formData.phone}
            variant='outlined'
            onChange={handleChange}
          />
          <TextFieldWrapper
            label='Birthday'
            name='birthday'
            value={formData.birthday}
            variant='outlined'
            onChange={handleChange}
          />
        </Form>
      </TopContainer>
      <ActionContainer>
        <Button
          variant='contained'
          fullWidth
          color='primary'
          onClick={handleSubmit}
        >
          Sign up
        </Button>
      </ActionContainer>
    </Container>
  );
}
