import gql from 'graphql-tag';

const SAVE_TAG = gql`
  mutation SaveTag($tag: TagInput!) {
    saveTag(tag: $tag) {
      code
      success
      message
      data {
        id
        title
        description
      }
    }
  }
`;

const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      title
      description
    }
  }
`;

const DELETE_TAG = gql`
  mutation DeleteTag($id: String!) {
    deleteTag(id: $id) {
      code
      success
      message
    }
  }
`;

export { GET_TAGS, SAVE_TAG, DELETE_TAG };
