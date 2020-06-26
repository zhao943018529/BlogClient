import * as React from 'react';
import {
  Avatar,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { PlayCircleFilled } from '@material-ui/icons';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(1.2) + 'px',
    },
  })
);

interface UserAvatarProps extends React.Props<any> {
  author: IUser;
  date: Date;
  className?: string;
}

export default function UserAvatar({
  author,
  className,
  date,
}: UserAvatarProps) {
  const classes = useStyle();
  let rootClass = classes.root;
  if (className) {
    rootClass += ' ' + className;
  }
  return (
    <div className={rootClass}>
      <div className={classes.main}>
        <Avatar>
          <PlayCircleFilled fontSize='large' />
        </Avatar>
        <div className={classes.content}>
          <Typography variant='h6' component='h6'>
            {author.username}
          </Typography>
          <Typography
            variant='subtitle2'
            component='span'
            color='textSecondary'
          >
            {date}
          </Typography>
        </div>
      </div>
    </div>
  );
}
