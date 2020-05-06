import * as React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { List } from '@material-ui/core';
import TodoItem from './TodoItem';
import { getTodosVisibilityFilter } from '../../../store/todo/actions';

export default function TodoList() {
  const todos = useSelector(getTodosVisibilityFilter, shallowEqual);

  return (
    <List>
      {todos.map((todo: ITodo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
}
