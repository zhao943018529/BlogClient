import * as React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Input,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateTodo, removeTodo } from '../../../store/todo/actionTypes';

const { useCallback } = React;

const BoxWrapper = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
`;
const InputWrapper = styled(Input)`
  width: 100%;
`;

const ListItemTextWrapper = styled(ListItemText)`
  cursor: pointer;
`;
const { useState } = React;
interface ITodoItemProps extends React.Props<any> {
  todo: ITodo;
}

export default function TodoItem(props: ITodoItemProps) {
  const { todo } = props;
  const [editing, toggleEdit] = useState(false);
  const [name, setName] = useState(todo.name);
  const dispatch = useDispatch();

  const updateName = () => {
    dispatch({ type: updateTodo, payload: { id: todo.id, name } });
    setName(name);
    toggleEdit(false);
  };

  const toggleChecked = () => {
    dispatch({
      type: updateTodo,
      payload: { id: todo.id, completed: !todo.completed },
    });
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      updateName();
    }
  };

  const handleDelete = () => {
    dispatch({ type: removeTodo, payload: { id: todo.id } });
  };

  return (
    <ListItem>
      {editing ? (
        <InputWrapper
          fullWidth
          autoFocus
          value={name}
          onChange={handleChange}
          onBlur={updateName}
          onKeyDown={handleEnter}
        />
      ) : (
        <BoxWrapper>
          <ListItemIcon>
            <Checkbox checked={todo.completed} onChange={toggleChecked} />
          </ListItemIcon>
          <ListItemTextWrapper
            onClick={() => toggleEdit(!editing)}
            primary={todo.name}
          />
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </BoxWrapper>
      )}
    </ListItem>
  );
}
