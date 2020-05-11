import * as React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { addTodo } from '../../../store/todo/actionTypes';

const { useState, useCallback } = React;
// const Form = styled.form`

// `;
const SubmitButton = styled.button.attrs(() => ({
  type: 'submit',
}))`
  width: 0;
  height: 0;
  visibility: hidden;
`;

export default function AddTodo() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (value && value.trim()) {
        dispatch({
          type: addTodo,
          payload: { name: value },
        });
        setValue('');
      }
    },
    [value]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        placeholder='Add todo'
        value={value}
        onChange={handleChange}
      />
      <SubmitButton />
    </form>
  );
}
