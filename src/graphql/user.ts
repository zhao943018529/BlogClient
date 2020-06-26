import gql from 'graphql-tag';

const GET_LOCAL_USERINFO = gql`
  query GetUserInfo {
    userInfo @client
  }
`;

const GET_USERINFO = gql`
  query GetUserInfo {
    getUserInfo {
      id
      username
      fullName
      firstName
      lastName
      phone
    }
  }
`;

const LOGIN_USER = gql`
  query GetUer($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      code
      success
      data {
        id
        firstName
        lastName
        username
        birthday
        phone
        createTime
      }
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($user: AddUserInput!) {
    addUser(user: $user) {
      code
      success
      message
    }
  }
`;

const USER_LOGIN = gql`
  query UserLogin {
    isLoggedIn @client(always: true)
  }
`;

const GET_USERS = gql`
  query Get_Users {
    getUsers {
      code
      success
      message
      data {
        id
        username
        firstName
        lastName
        createTime
      }
    }
  }
`;

const GRANT_USERS = gql`
  mutation GrantUsers($users: [String!]!, $roles: [String!]!) {
    grantUsers(users: $users, roles: $roles) {
      code
      success
      message
    }
  }
`;

export {
  GET_LOCAL_USERINFO,
  GET_USERINFO,
  LOGIN_USER,
  ADD_USER,
  USER_LOGIN,
  GET_USERS,
  GRANT_USERS,
};
