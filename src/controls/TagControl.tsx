import * as React from 'react';
import { Button, Popover, Input, Theme, Chip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import styled from 'styled-components';

const TagContainer = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
`;

const TagContent = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-wrap: wrap;
    margin-top: ${theme.spacing(1.5)}px;
`}
`;

const ChipWrapper = styled(Chip)`
  ${({ theme }) => `
    margin:${theme.spacing(0.5)}px;
  `}
`;

const { useState } = React;

interface TagProps<T> {
  title: string;
  value: T;
  disabled?: boolean;
  avatar?: React.ReactElement;
  icon?: React.ReactElement;
}

interface TagControlProps<T> {
  tags: TagProps<T>[];
  values: T[];
  onChange(values: T[]): void;
}

export default function TagControl<T>({
  tags,
  values,
  onChange,
}: TagControlProps<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = useState<string>('');
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const selectChange = (value: T) => {
    if (values.indexOf(value) === -1) {
      onChange([...values, value]);
    }
  };

  return (
    <React.Fragment>
      <Button variant='outlined' startIcon={<Add />} onClick={handleClick}>
        添加标签
      </Button>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <TagContainer>
          <Input
            fullWidth
            value={value}
            onChange={handleChange}
            placeholder='Search tags'
          />
          <TagContent>
            {tags
              .filter((tag) => String(tag.value).indexOf(value) !== -1)
              .map((item) => (
                <ChipWrapper
                  key={String(item.value)}
                  label={item.title}
                  disabled={item.disabled || values.indexOf(item.value) !== -1}
                  color='primary'
                  icon={item.icon}
                  avatar={item.avatar}
                  onClick={() => selectChange(item.value)}
                />
              ))}
          </TagContent>
        </TagContainer>
      </Popover>
    </React.Fragment>
  );
}
