import * as React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Input, createStyles, makeStyles, Theme } from '@material-ui/core';
import {
  QuillEditor,
  UploadImage as IUploadImage,
} from '@components/QuillEditor';
import TagManager from './components/TagManager';
// import Quill, { RangeStatic } from 'quill';

const UploadImage = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      code
      success
      message
      data
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputWrapper = styled(Input)`
  ${({ theme }) => `
    margin:${theme.spacing(1)}px 0;
  `}
`;

interface FileResponse {
  uploadImage: IBaseResponse<any>;
}

const { useCallback, useEffect } = React;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editor: {
      marginTop: theme.spacing(1),
    },
  })
);

export default function Editor() {
  const classes = useStyles();

  const [title, setTitle] = React.useState('');

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const [article, setArticle] = React.useState('');

  const [uploadFile] = useMutation<FileResponse, { file: File }>(UploadImage);

  const handleAddImage = useCallback<IUploadImage>(
    (file: File, callback: (url: string) => void) => {
      uploadFile({ variables: { file } })
        .then((data) => `/image${data.data?.uploadImage.data}`)
        .then(callback);
    },
    []
  );

  const textChange = useCallback((delta) => {
    setArticle(JSON.stringify(delta));
  }, []);

  const [values, setValues] = React.useState<string[]>([]);

  return (
    <Container>
      <InputWrapper
        fullWidth
        placeholder='Input your article title...'
        value={title}
        onChange={titleChange}
      />
      <TagManager onChange={setValues} values={values} />
      <QuillEditor
        className={classes.editor}
        textChange={textChange}
        uploadImage={handleAddImage}
        mode='Design'
      />
    </Container>
  );
}
