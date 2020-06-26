import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  makeStyles,
  createStyles,
  Theme,
  Chip,
  Button,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import { Category, Add, Cancel, Check } from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_TAG, GET_TAGS, DELETE_TAG } from '@graphql/tag';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: theme.palette.primary.main,
      background: theme.palette.common.white,
      boxShadow: theme.shadows[4],
    },
    actions: {
      justifyContent: 'flex-end',
    },
    input: {
      margin: `${theme.spacing(1)}px 0`,
    },
    dialog: {
      minWidth: 420,
    },
    chip: {
      margin: `${theme.spacing(0.5)}px`,
    },
  })
);

interface Tag {
  id: string;
  title: string;
  description: string;
}

interface ResponseData {
  code: number;
  success: boolean;
  data: Tag;
}

interface TagResponse {
  tags: ResponseData;
}

interface AddTagResponse {
  saveTag: ResponseData;
}

export default function TagCard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const { data } = useQuery<{ tags: Tag[] }>(GET_TAGS);

  const [addTag] = useMutation<
    AddTagResponse,
    { tag: { title: string; description: string } }
  >(SAVE_TAG, {
    update(cache, { data: { saveTag } }) {
      cache.writeQuery({
        query: GET_TAGS,
        data: { tags: data?.tags.concat(saveTag.data) },
      });
    },
  });

  const handleSubmit = () => {
    addTag({ variables: { tag: { title: name, description } } }).then((res) => {
      handleClose();
    });
  };
  const [deleteTag] = useMutation<TagResponse, { id: string }>(DELETE_TAG);

  const handleDelete = React.useCallback((id: string) => {
    deleteTag({
      variables: { id },
      update(cache) {
        const { tags } = cache.readQuery<{ tags: Tag[] }>({ query: GET_TAGS });
        cache.writeQuery({
          query: GET_TAGS,
          data: {
            tags: tags.filter((tag) => tag.id !== id),
          },
        });
      },
    });
  }, []);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <Category />
          </Avatar>
        }
        title='便签管理'
      />
      <CardContent>
        {data?.tags.map((tag) => (
          <Chip
            key={tag.id}
            className={classes.chip}
            avatar={<Avatar>{tag.title[0].toUpperCase()}</Avatar>}
            label={tag.title}
            color='primary'
            onDelete={() => handleDelete(tag.id)}
          />
        ))}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant='contained'
          color='primary'
          startIcon={<Add />}
          onClick={handleOpen}
        >
          Add Tag
        </Button>
      </CardActions>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle>Add Tag</DialogTitle>
        <DialogContent>
          <div className={classes.input}>
            <TextField
              label='Name'
              fullWidth
              placeholder='Example:javascript...'
              variant='filled'
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className={classes.input}>
            <TextField
              label='Description'
              multiline
              rows={2}
              fullWidth
              placeholder='javascript...'
              variant='filled'
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='default'
            startIcon={<Cancel />}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<Check />}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
