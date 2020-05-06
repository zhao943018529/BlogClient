import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateFilter } from '../../../store/todo/actionTypes';

interface IFilterItemProps {
  icon: React.ReactElement<any>;
  name: string;
  filter: string;
  isActive: boolean;
}

interface ListItemProps extends React.HTMLAttributes<any> {
  actived: number;
}

const ListItemWrapper = styled(ListItem)<ListItemProps>`
  cursor: pointer;
  color: ${(props) => (props.actived ? 'red' : 'a6a6a6')};
  & + & {
    border-left: 1px solid #c8c8c8;
  }
`;

const ListItemIconWrapper = styled(ListItemIcon)<{ actived: number }>`
  color: ${(props) => (props.actived ? 'red' : 'rgba(0, 0, 0, 0.54)')};
`;

export default function FilterItem(props: IFilterItemProps) {
  // eslint-disable-next-line object-curly-newline
  const { icon, name, filter, isActive } = props;

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: updateFilter, payload: filter });
  };

  return (
    <ListItemWrapper button onClick={handleClick} actived={isActive ? 1 : 0}>
      <ListItemIconWrapper actived={isActive ? 1 : 0}>
        {icon}
      </ListItemIconWrapper>
      <ListItemText primary={name}></ListItemText>
    </ListItemWrapper>
  );
}
