import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import { updateFilter } from '../../../store/todo/actionTypes';

const { useContext } = React;

interface IFilterItemProps {
  icon: React.ReactElement<any>;
  name: string;
  filter: string;
  isActive: boolean;
}

interface ListItemProps extends React.HTMLAttributes<any> {
  color: string;
}

const ListItemWrapper = styled(ListItem)<ListItemProps>`
  cursor: pointer;
  color: ${(props) => props.color};
  & + & {
    border-left: 1px solid #c8c8c8;
  }
`;

const ListItemIconWrapper = styled(ListItemIcon)<{ color: string }>`
  && {
    color: ${(props) => props.color};
  }
`;

export default function FilterItem(props: IFilterItemProps) {
  // eslint-disable-next-line object-curly-newline
  const { icon, name, filter, isActive } = props;
  const theme = useContext(ThemeContext);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: updateFilter, payload: filter });
  };

  return (
    <ListItemWrapper
      button
      onClick={handleClick}
      color={isActive ? theme.palette.primary.main : '#a6a6a6'}
    >
      <ListItemIconWrapper
        color={isActive ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.54)'}
      >
        {icon}
      </ListItemIconWrapper>
      <ListItemText primary={name}></ListItemText>
    </ListItemWrapper>
  );
}
