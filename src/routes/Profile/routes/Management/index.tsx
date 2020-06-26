import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import TagCard from './components/TagCard';
import RoleCard from './components/RoleCard';
import UserCard from './components/UserCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      margin: `${theme.spacing(1.2)}px 0`,
    },
  })
);

export default function Management() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TagCard />
      <RoleCard className={classes.item} />
      <UserCard className={classes.item} />
    </div>
  );
}
