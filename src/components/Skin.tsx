import * as React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import {} from '@material-ui/core';
import ColorPicker from './ColorPicker';

import { getTheme, themeChangeActionType } from '../store/common';

const { useState, useEffect } = React;

const colors = [
  '#ff5252',
  '#ff4081',
  '#e040fb',
  '#7c4dff',
  '#536dfe',
  '#448aff',
  '#40c4ff',
  '#18ffff',
  '#64ffda',
  '#69f0ae',
  '#b2ff59',
  '#eeff41',
  '#ffff00',
  '#ffd740',
  '#ffab40',
  '#ff6e40',
];

const SkinContainer = styled.div`
  background: C8C8C8;
  display: flex;
  aligin-items: center;
`;

export default function Skin() {
  const currentTheme = useSelector(getTheme, shallowEqual);
  const dispatch = useDispatch();
  const [primary, setPrimary] = useState(currentTheme.primary);
  const [secondary, setSecondary] = useState(currentTheme.secondary);

  useEffect(() => {
    dispatch({ type: themeChangeActionType, payload: { primary, secondary } });
  }, [primary, secondary, dispatch]);

  return (
    <SkinContainer>
      <ColorPicker
        title='Primary'
        colors={colors}
        selected={primary}
        onChange={(value) => setPrimary(value)}
      />
      <ColorPicker
        title='Secondary'
        colors={colors}
        selected={secondary}
        onChange={(value) => setSecondary(value)}
      />
    </SkinContainer>
  );
}
