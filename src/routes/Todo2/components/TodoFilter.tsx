import * as React from 'react';
import { List } from '@material-ui/core';
import { DragIndicator, Done, DoneAllOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import FilterLink from './FilterLink';

const ListWrapper = styled(List)<{ component: string }>`
  display: flex;
  flex-direction: row;
`;

export default function TodoFilter() {
  return (
    <ListWrapper component='nav'>
      {[
        { name: 'All', to: '/todo2', icon: <DragIndicator /> },
        { name: 'Completed', to: '/todo2/completed', icon: <Done /> },
        {
          name: 'Uncompleted',
          to: '/todo2/uncompleted',
          icon: <DoneAllOutlined />,
        },
      ].map((item) => (
        <FilterLink
          key={item.name}
          name={item.name}
          to={item.to}
          icon={item.icon}
        />
      ))}
    </ListWrapper>
  );
}
