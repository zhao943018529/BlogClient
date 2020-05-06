import * as React from 'react';
import { List } from '@material-ui/core';
import { DragIndicator, Done, DoneAllOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';
import FilterItem from './FilterItem';
import { getVisibilityFilter } from '../../../store/todo/actions';

const ListWrapper = styled(List)<{ component: string }>`
  display: flex;
  flex-direction: row;
`;

export default function TodoFilter() {
  const filterValue = useSelector(getVisibilityFilter, shallowEqual);

  return (
    <ListWrapper component='nav'>
      {[
        { name: 'All', icon: <DragIndicator /> },
        { name: 'Completed', icon: <Done /> },
        { name: 'Uncompleted', icon: <DoneAllOutlined /> },
      ].map((item) => (
        <FilterItem
          key={item.name}
          name={item.name}
          filter={item.name}
          icon={item.icon}
          isActive={filterValue === item.name}
        />
      ))}
    </ListWrapper>
  );
}
