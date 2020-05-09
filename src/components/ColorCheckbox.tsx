import * as React from 'react';
import styled from 'styled-components';
import { Checkbox, makeStyles, createStyles } from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';

interface ICheckboxProps {
  value: string;
  checked: boolean;
  onChange(val: string): void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // color: '#FFFFFF',
      // width: 48,
      // height: 48,
      // borderRadius: 0,
      padding: 0,
    },
  })
);

const CheckboxIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: ${(props) => props.color};
`;

const { useCallback } = React;

export default function ColorCheckbox({
  value,
  checked,
  onChange,
}: ICheckboxProps) {
  const classes = useStyles();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Checkbox
      className={classes.root}
      value={value}
      checked={checked}
      checkedIcon={
        <CheckboxIconWrapper color={value}>
          <CheckIcon />
        </CheckboxIconWrapper>
      }
      icon={<CheckboxIconWrapper color={value} />}
      onChange={handleChange}
    />
  );
}
