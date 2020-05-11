import * as React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { List } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import TodoItem from './TodoItem';
import { getTodos } from '../../../store/todo/actions';

export default function TodoList() {
  const { filter } = useParams<{ filter: string }>();
  let todos = useSelector(getTodos, shallowEqual);
  switch (filter) {
    case 'completed':
      todos = todos.filter((todo) => todo.completed);
      break;
    case 'uncompleted':
      todos = todos.filter((todo) => !todo.completed);
      break;
    default:
      break;
  }

  return (
    <List>
      {todos.map((todo: ITodo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
}
