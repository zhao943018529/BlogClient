import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Avatar,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  Snackbar,
  DialogActions,
  FormControlLabel,
  Checkbox,
  makeStyles,
  createStyles,
  Theme,
  FormLabel,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { GroupWork } from '@material-ui/icons';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ROLES, ADD_ROLE, DELETE_ROLE } from '@graphql/role';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    avatar: {
      color: theme.palette.primary.main,
      background: theme.palette.common.white,
      boxShadow: theme.shadows[4],
    },
  })
);

interface RolesResponse {
  getRoles: IBaseResponse<Role[]>;
}

interface RoleResponse {
  addRole: IBaseResponse<Role>;
}

interface DelRoleResponse {
  deleteRole: IBaseResponse<any>;
}

interface RoleCardProps extends React.Props<any> {
  className?: string;
}

export default function RoleCard(props: RoleCardProps) {
  const classes = useStyles();
  const [roleMap, setRoleMap] = React.useState<{ [key: string]: boolean }>({});
  const { data, loading } = useQuery<RolesResponse>(GET_ROLES);
  const [addRole, { client }] = useMutation<
    RoleResponse,
    { title: string; description: string }
  >(ADD_ROLE);
  const [deleteRole] = useMutation<DelRoleResponse, { ids: string }>(
    DELETE_ROLE
  );
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const handleCloseSnack = React.useCallback(() => setStatus(false), []);

  const rootClassName =
    classes.root + props.className ? ` ${props.className}` : '';
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setRoleMap((prev) => {
        return { ...prev, [value]: !prev[value] };
      });
    },
    []
  );
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleDelete = () => {
    deleteRole({
      variables: {
        ids: Object.keys(roleMap)
          .filter((id) => roleMap[id])
          .join(','),
      },
    }).then((result) => {
      client?.cache.writeQuery({
        query: GET_ROLES,
        data: {
          getRoles: data?.getRoles.data.filter((item) => !roleMap[item.id]),
        },
      });
      setRoleMap({});
      setStatus(true);
    });
  };
  const handleClose = React.useCallback(() => setOpen(false), []);
  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      if (name === 'title') {
        setTitle(value);
      } else {
        setDescription(value);
      }
    },
    []
  );

  const handleSubmit = React.useCallback(() => {
    addRole({ variables: { title, description } }).then((result) => {
      client?.cache.writeQuery({
        query: GET_ROLES,
        data: {
          getRoles: data?.getRoles.data.concat(result.data?.addRole.data),
        },
      });
      setTitle('');
      setDescription('');
      setOpen(false);
    });
  }, [title, description]);

  return (
    <Card className={rootClassName}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <GroupWork />
          </Avatar>
        }
        title='权限管理'
      />
      <CardContent>
        <FormGroup row={true}>
          {data?.getRoles.data.map((role) => (
            <FormControlLabel
              key={role.id}
              label={role.title}
              control={
                <Checkbox
                  checked={roleMap[role.id] || false}
                  onChange={handleChange}
                  name={role.title}
                  value={role.id}
                />
              }
            />
          ))}
        </FormGroup>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          color='primary'
          variant='contained'
          onClick={() => setOpen(true)}
        >
          Add Role
        </Button>
        <Button
          size='small'
          color='primary'
          variant='outlined'
          onClick={handleDelete}
        >
          Delete Role(s)
        </Button>
      </CardActions>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='sm'
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Add Role'}</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControl required={true} fullWidth>
              <InputLabel htmlFor='roleTitle'>Title</InputLabel>
              <Input
                id='roleTitle'
                placeholder='Input...'
                value={title}
                name='title'
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl required={true} fullWidth>
              <InputLabel htmlFor='roleDescription'>Description</InputLabel>
              <Input
                id='roleDescription'
                multiline
                name='description'
                rows={2}
                value={description}
                onChange={handleInputChange}
              />
            </FormControl>
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color='primary'>
            Add
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={status}
        onClose={handleCloseSnack}
        message='Delete Role successfully!!!'
      />
    </Card>
  );
}
