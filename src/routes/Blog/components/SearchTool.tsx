import * as React from 'react';
import styled from 'styled-components';
import { IconButton, Input } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default function SearchTool() {
  const [expand, setExpand] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );
  const handleClick = React.useCallback(() => {
    setExpand(true);
  }, []);
  const handleBlur = React.useCallback(() => {
    setExpand(false);
  }, []);

  return (
    <Container>
      <IconButton onClick={handleClick}>
        <Search />
      </IconButton>
      {expand ? (
        <Input
          onBlur={handleBlur}
          value={value}
          onChange={handleChange}
          autoFocus
        />
      ) : null}
    </Container>
  );
}
