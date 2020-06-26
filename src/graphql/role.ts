import gql from 'graphql-tag';

const GET_ROLES = gql`
  query GetRoles {
    getRoles {
      code
      message
      success
      data {
        id
        title
        description
        createTime
      }
    }
  }
`;

const ADD_ROLE = gql`
  mutation AddRole($title: String!, $description: String!) {
    addRole(title: $title, description: $description) {
      code
      message
      success
      data {
        id
        title
        description
        createTime
      }
    }
  }
`;

const DELETE_ROLE = gql`
  mutation DeleteRole($ids: String!) {
    deleteRole(ids: $ids) {
      code
      message
      success
    }
  }
`;

const UPDATE_ROLE = gql`
  mutation UpdateRole($id: String!, $title: String!) {
    updateRole(id: $id, title: $title) {
      code
      message
      success
      data {
        id
        title
        description
        createTime
      }
    }
  }
`;

export { GET_ROLES, ADD_ROLE, DELETE_ROLE, UPDATE_ROLE };
