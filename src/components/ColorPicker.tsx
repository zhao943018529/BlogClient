import * as React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import ColorCheckbox from './ColorCheckbox';

interface IColorPickerProps {
  title: string;
  colors: string[];
  selected: string;
  onChange(value: string): void;
}

const ColorContainer = styled.div`
  width: 192px;
`;

export default function ColorPicker({
  title,
  colors,
  selected,
  onChange,
}: IColorPickerProps) {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <ColorContainer>
          {colors.map((color) => (
            <ColorCheckbox
              key={color}
              value={color}
              checked={color === selected}
              onChange={handleChange}
            />
          ))}
        </ColorContainer>
      </CardContent>
    </Card>
  );
}
