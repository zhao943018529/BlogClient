import * as React from 'react';
import {
  ListItem,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Chip,
} from '@material-ui/core';
import {} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: `${theme.spacing(1.5)}px`,
      cursor: 'pointer',
      background: theme.palette.background.default,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      height: '152px',
      justifyContent: 'space-around',
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing(1) + 'px',
      '& > *': {
        margin: `0 ${theme.spacing(0.6)}px`,
      },
    },
    mediaBox: {
      width: '152px',
      flex: '0 0 auto',
    },
    media: {
      width: '100%',
      paddingBottom: '100%',
      display: 'block',
      backgroundPosition: '50% 50%',
      backgroundOrigin: 'border-box',
      backgroundSize: 'cover',
    },
  })
);

interface PostItemProps {
  article: Article;
}

export default function PostItem({ article }: PostItemProps) {
  const classes = useStyle();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/blog/${article.id}`);
  };

  return (
    <ListItem className={classes.root} onClick={handleClick}>
      <div className={classes.content}>
        <Typography variant='h6' component='h5' color='textPrimary'>
          {article.title}
        </Typography>
        <div className={classes.tags}>
          {(article.tags as Tag[]).map((tag) => (
            <Chip key={tag.id} size='small' color='primary' label={tag.title} />
          ))}
        </div>
      </div>
      <div className={classes.mediaBox}>
        <a
          className={classes.media}
          href='#'
          style={{ backgroundImage: 'url(/image/post.jpeg)' }}
        ></a>
      </div>
    </ListItem>
  );
}
