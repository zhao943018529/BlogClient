import * as React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import {
  Input,
  createStyles,
  makeStyles,
  Theme,
  Button,
  Typography,
} from '@material-ui/core';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  DoneOutline as DoneOutlineIcon,
} from '@material-ui/icons';
import {
  QuillEditor,
  UploadImage as IUploadImage,
} from '@components/QuillEditor';
import { useParams, useHistory } from 'react-router-dom';
import Progress from '@components/Progress';
import TagManager from './components/TagManager';
import { GET_ARTICLE, UPDATE_ARTICLE, ADD_ARTICLE } from '@graphql/article';
import { UPLOAD_IMAGE } from '@graphql/upload';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputWrapper = styled(Input)`
  ${({ theme }) => `
    margin:${theme.spacing(1)}px 0;
  `}
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  ${({ theme }: { theme: Theme }) => `
      margin:${theme.spacing(1.5)}px 0;
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
    success: {
      color: theme.palette.success.main,
      textAlign: 'center',
    },
    successInfo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: `0 ${theme.spacing(0.8)}px`,
      },
    },
    action: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      '& > *': {
        margin: `${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
      },
    },
  })
);

type ArticleResponse = IBaseResponse<Article>;

interface ArticleData {
  addArticle: ArticleResponse;
  updateArticle: ArticleResponse;
}

type ArticleInput = Partial<Article>;

export default function Editor() {
  const classes = useStyles();

  const [title, setTitle] = React.useState('');

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const [article, setArticle] = React.useState<string | null>(null);

  const [uploadFile] = useMutation<FileResponse, { file: File }>(UPLOAD_IMAGE);

  const handleAddImage = useCallback<IUploadImage>(
    (file: File, callback: (url: string) => void) => {
      uploadFile({ variables: { file } })
        .then((data) => `/image${data.data?.uploadImage.data}`)
        .then(callback);
    },
    []
  );

  const params = useParams<{ id: string }>();
  const { data, loading } = useQuery<{ getArticle: Article }, { id: string }>(
    GET_ARTICLE,
    {
      variables: { id: params.id },
      skip: !params.id,
      // fetchPolicy: 'cache-and-network',
      onCompleted(res) {
        if (res && res.getArticle) {
          setTitle(res.getArticle.title);
          setArticle(res.getArticle.content);
          setValues((res.getArticle.tags as Tag[]).map((item) => item.id));
        }
      },
    }
  );

  const textChange = useCallback((delta) => {
    setArticle(JSON.stringify(delta));
  }, []);

  const [values, setValues] = React.useState<string[]>(() => {
    return (
      (data?.getArticle.tags &&
        (data?.getArticle.tags as Tag[]).map((tag) => tag.id)) ||
      []
    );
  });
  const [saveArticle] = useMutation<ArticleData, { article: ArticleInput }>(
    params.id ? UPDATE_ARTICLE : ADD_ARTICLE
  );

  const [completedId, setCompletedId] = React.useState<string | null>(null);

  const handleSubmit = () => {
    saveArticle({
      variables: {
        article: { title, content: article, tags: values, id: params.id },
      },
    }).then((result) => {
      const obj = result.data?.addArticle || result.data?.updateArticle;
      if (obj) {
        setCompletedId(obj.data.id);
      }
    });
  };

  const history = useHistory();
  const backToEdit = () => {
    setCompletedId(null);
    if (completedId !== params.id) {
      history.push(`/profile/editor/${completedId}`);
    }
  };

  const goToReview = () => {
    history.push(`/blog/${completedId}`);
  };

  if (completedId) {
    return (
      <div>
        <div className={classes.successInfo}>
          <DoneOutlineIcon fontSize='small' className={classes.success} />
          <Typography component='h5' variant='h6' className={classes.success}>
            Congratuation!!!
          </Typography>
        </div>
        <div className={classes.action}>
          <Button
            startIcon={<EditIcon />}
            variant='outlined'
            color='secondary'
            onClick={backToEdit}
          >
            Go Back Edit
          </Button>
          <Button
            startIcon={<RemoveRedEyeIcon />}
            variant='outlined'
            color='secondary'
            onClick={goToReview}
          >
            Go To Review
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <InputWrapper
        fullWidth
        placeholder='Input your article title...'
        value={title}
        onChange={titleChange}
      />
      <TagManager onChange={setValues} values={values} />

      {params.id && (loading || !data) ? (
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
      <ActionContainer>
        <Button
          startIcon={<SaveIcon />}
          variant='outlined'
          color='primary'
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </ActionContainer>
    </Container>
  );
}
