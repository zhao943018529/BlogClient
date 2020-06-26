import * as React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Input,
  Checkbox,
  MenuItem,
  ListItemText,
  Select,
  FormControlLabel,
  InputLabel,
  FormControl,
  makeStyles,
  createStyles,
  Snackbar,
  Theme,
  FormGroup,
} from '@material-ui/core';
import { Rowing } from '@material-ui/icons';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ROLES } from '@graphql/role';
import { GET_USERS, GRANT_USERS } from '@graphql/user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    privilege: {
      marginBottom: theme.spacing(1),
    },
    users: {},
    avatar: {
      color: theme.palette.primary.main,
      background: theme.palette.common.white,
      boxShadow: theme.shadows[4],
    },
  })
);

interface UsersResponse {
  getUsers: IBaseResponse<IUser[]>;
}

interface RolesResponse {
  getRoles: IBaseResponse<Role[]>;
}

interface UserCardProps extends React.Props<any> {
  className?: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UserCard(props: UserCardProps) {
  const classes = useStyles();

  const [roleIds, setRoleIds] = React.useState<string[]>([]);
  const [userIds, setUserIds] = React.useState<string[]>([]);
  const { data: usersData } = useQuery<UsersResponse>(GET_USERS);
  const { data: rolesData } = useQuery<RolesResponse>(GET_ROLES);
  const [grantUsers] = useMutation<
    IBaseResponse<any>,
    { users: string[]; roles: string[] }
  >(GRANT_USERS);

  const handleChange = React.useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: string[];
      }>
    ) => {
      setRoleIds(event.target.value);
    },
    []
  );

  const handleUserChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, child: unknown) => {
      const { value } = event.target;
      setUserIds((prev) => {
        if (prev.indexOf(value) > -1) {
          return prev.filter((item) => item !== value);
        }

        return prev.concat(value);
      });
    },
    []
  );

  const handleClear = React.useCallback(() => {
    setUserIds([]);
    setRoleIds([]);
  }, []);

  const [status, setStatus] = React.useState(false);
  const handleCloseSnack = React.useCallback(() => setStatus(false), []);

  const handleGrant = React.useCallback(() => {
    grantUsers({ variables: { users: userIds, roles: roleIds } }).then(() => {
      setStatus(true);
      handleClear();
    });
  }, [userIds, roleIds]);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <Rowing />
          </Avatar>
        }
        title='Grant Privilege'
      />
      <CardContent>
        <div className={classes.privilege}>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-mutiple-checkbox-label'>Roles</InputLabel>
            <Select
              labelId='demo-mutiple-checkbox-label'
              id='demo-mutiple-checkbox'
              multiple
              value={roleIds}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected: string[]) =>
                rolesData?.getRoles.data
                  .filter((role) => selected.indexOf(role.id) > -1)
                  .map((role) => role.title)
                  .join(',')
              }
              MenuProps={MenuProps}
            >
              {rolesData?.getRoles.data.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  <Checkbox checked={roleIds.indexOf(role.id) > -1} />
                  <ListItemText primary={role.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <FormGroup row={true}>
          {usersData?.getUsers.data.map((user) => (
            <FormControlLabel
              key={user.id}
              label={user.username}
              control={
                <Checkbox
                  checked={userIds.indexOf(user.id) > -1}
                  onChange={handleUserChange}
                  value={user.id}
                />
              }
            />
          ))}
        </FormGroup>
      </CardContent>
      <CardActions>
        <Button
          disabled={roleIds.length === 0 || userIds.length === 0}
          variant='contained'
          size='small'
          color='primary'
          onClick={handleGrant}
        >
          Grant
        </Button>
        <Button
          disabled={roleIds.length === 0 && userIds.length === 0}
          variant='outlined'
          size='small'
          color='primary'
          onClick={handleClear}
        >
          Clear
        </Button>
      </CardActions>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={status}
        onClose={handleCloseSnack}
        message='Grant Role successfully!!!'
      />
    </Card>
  );
}
