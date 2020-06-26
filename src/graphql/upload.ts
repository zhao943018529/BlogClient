import gql from 'graphql-tag';

const UPLOAD_IMAGE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      code
      success
      message
      data
    }
  }
`;

export { UPLOAD_IMAGE };
