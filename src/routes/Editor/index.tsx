import * as React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { Input, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {
  QuillEditor,
  UploadImage as IUploadImage,
} from '@components/QuillEditor';
import Progress from '@components/Progress';
import TagManager from './components/TagManager';

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

const GET_ARTICLE = gql`
  query GetArticle($id:String){
    getArticle(id:$id){
        id
        title
        createTime
        updateTime
        author {
          id
          username
          firstName
          lastName
        }
        tags {
          id
          title
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

  const params = useParams<{ id: string }>();
  const { data, loading } = useQuery<{ getArticle: Article }, { id: string }>(
    GET_ARTICLE,
    {
      skip: !params.id,
    }
  );

  const [article, setArticle] = React.useState('');

  const [uploadFile] = useMutation<FileResponse, { file: File }>(UploadImage);

  const handleAddImage = useCallback<IUploadImage>(
    (file: File, callback: (url: string) => void) => {
      uploadFile({ variables: { file } })
        .then((res) => `/image${res.data?.uploadImage.data}`)
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
      {loading ? (
        <Progress />
      ) : (
        <QuillEditor
          value={data?.getArticle.content}
          className={classes.editor}
          textChange={textChange}
          uploadImage={handleAddImage}
          mode='Design'
        />
      )}
    </Container>
  );
}
