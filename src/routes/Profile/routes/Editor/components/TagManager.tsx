import * as React from 'react';
import styled from 'styled-components';
import { Avatar, Chip } from '@material-ui/core';
import { Face } from '@material-ui/icons';
import TagControl from '@controls/TagControl';
import { useQuery } from '@apollo/client';
import { GET_TAGS } from '@graphql/tag';

interface TagResponse {
  tags: Tag[];
}

const Container = styled.div`
  display: flex;
  ${({ theme }) => `
    margin:${theme.spacing(1)}px 0;
  `}
`;

const ChipWrapper = styled(Chip)`
  ${({ theme }) => `
    margin: 0 ${theme.spacing(0.5)}px;
  `}
`;

interface TagManagerProps {
  onChange(values: string[]): void;
  values: string[];
}

export default function TagManager({ onChange, values }: TagManagerProps) {
  // const [tags] = React.useState([
  //   {
  //     title: 'Basic',
  //     value: 'basic',
  //   },
  //   {
  //     title: 'Clickable',
  //     value: 'clickable',
  //     icon: <Face />,
  //   },
  //   {
  //     title: 'Primary',
  //     value: 'primary',
  //     avatar: <Avatar>M</Avatar>,
  //   },
  // ]);

  const handleDelete = (value: string) => {
    const newValues = values.filter((item) => value !== item);
    onChange(newValues);
  };

  const { data } = useQuery<TagResponse>(GET_TAGS);

  return (
    <Container>
      <div>
        {data?.tags
          .filter((tag) => values.indexOf(tag.id) !== -1)
          .map((tag) => (
            <ChipWrapper
              key={tag.id}
              label={tag.title}
              clickable={false}
              color='secondary'
              variant='outlined'
              onDelete={() => handleDelete(tag.id)}
            />
          ))}
      </div>
      <TagControl tags={data?.tags || []} values={values} onChange={onChange} />
    </Container>
  );
}
