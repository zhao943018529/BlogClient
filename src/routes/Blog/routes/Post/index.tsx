import * as React from 'react';
import {
  Typography,
  Avatar,
  LinearProgress,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_ARTICLE } from '@graphql/article';
import UserAvatar from './components/UserAvatar';
import { QuillEditor } from '@components/QuillEditor';
import Loading from '@components/LoadMore';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      marginBottom: theme.spacing(1) + 'px',
    },
    editor: {
      marginTop: theme.spacing(1),
    },
    show: {
      display: 'none',
    },
    hide: {
      display: 'hidden',
    },
  })
);

interface ArticleResponse {
  getArticle: Article;
}

export default function Post() {
  const classes = useStyle();
  const params = useParams<{ id: string }>();
  const { data, loading } = useQuery<ArticleResponse, { id: string }>(
    GET_ARTICLE,
    {
      variables: {
        id: params.id,
      },
    }
  );
  const [ready, setReady] = React.useState(false);
  const completedCallback = React.useCallback(() => {
    setReady(true);
  }, []);

  if (loading) {
    return <LinearProgress color='secondary' variant='indeterminate' />;
  }

  return (
    <div className={classes.root}>
      <Typography variant='h5' component='h4' gutterBottom>
        {data.getArticle.title}
      </Typography>
      <UserAvatar
        author={data.getArticle.author}
        date={data.getArticle.createTime}
      />
      {!ready ? <Loading /> : null}
      <QuillEditor
        value={data.getArticle.content || ''}
        onCompleted={completedCallback}
      />
    </div>
  );
}
