import * as React from 'react';
import styled from 'styled-components';
import { IconButton, Theme } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import Progress from '@components/Progress';
import {
  GET_USER_ARTICLES,
  DELETE_ARTICLE,
  DELETE_ARTICLES,
} from '@graphql/article';
import EnhancedTable from './components/EnhancedTable';

const CircleIconButton = styled(IconButton)`
  border-radius: 50%;
  position: absolute;
  bottom: 30px;
  right: 30px;

  ${({ theme }: { theme: Theme }) => `
    background:${theme.palette.primary.main};
    color: #fff;

    &:hover{
      background:${theme.palette.primary.light};
    }
  `}
`;

interface TableData {
  articles: Article[];
  count: number;
}

interface ArticleData {
  getUserArticles: TableData;
}

const columns = [
  { key: 'title', title: 'Title' },
  {
    key: 'author',
    title: 'Author',
    normalize: (auhtor: IUser) => {
      return auhtor.username;
    },
  },
  { key: 'createTime', title: 'CreateTime', sort: true },
];

export default function Article() {
  // const [tableData, setTableData] = React.useState<Article[]>([]);
  const [count, setCount] = React.useState(0);
  const [tableData, setTableData] = React.useState<TableData>({
    articles: [],
    count: 0,
  });
  const [getArticles, { data, loading }] = useLazyQuery<
    ArticleData,
    { pageInfo: Pagination }
  >(GET_USER_ARTICLES, {
    fetchPolicy: 'cache-and-network',
    // onCompleted({ getArticles }: ArticleData) {
    //   setTableData(getArticles.articles);
    //   setCount(getArticles.count);
    // },
  });
  const history = useHistory();

  const handleClick = () => {
    history.push('/profile/editor');
  };
  const [deleteArticle] = useMutation<any, { id: string }>(DELETE_ARTICLE, {
    update(cache) {
      getArticles({
        variables: {
          pageInfo: {
            page: 1,
            pageSize: 10,
            orderBy: 'createTime',
            order: 'desc',
          },
        },
      });
    },
  });
  const [deleteArticles] = useMutation<any, { ids: string }>(DELETE_ARTICLES, {
    update(cache) {
      getArticles({
        variables: {
          pageInfo: {
            page: 1,
            pageSize: 10,
            orderBy: 'createTime',
            order: 'desc',
          },
        },
      });
    },
  });

  const deleteCallback = (ids: string[]) => {
    if (ids.length > 1) {
      deleteArticles({ variables: { ids: ids.join(',') } });
    } else {
      deleteArticle({ variables: { id: ids[0] } });
    }
  };
  const editCallback = (id: string) => {
    history.push(`/profile/editor/${id}`);
  };

  const updateCallback = (params: Pagination) => {
    const pageInfo = {
      ...params,
      page: params.page + 1,
      orderBy: params.orderBy || 'createTime',
      order: params.order || 'desc',
    };

    getArticles({
      variables: { pageInfo },
    });
  };

  React.useEffect(() => {
    getArticles({
      variables: {
        pageInfo: {
          page: 1,
          pageSize: 10,
          orderBy: 'createTime',
          order: 'desc',
        },
      },
    });
  }, []);

  React.useEffect(() => {
    if (data?.getUserArticles) {
      setTableData({
        articles: data.getUserArticles.articles || [],
        count: data.getUserArticles.count,
      });
    }
  }, [data]);

  return (
    <div>
      <EnhancedTable
        columns={columns}
        defaultSize={10}
        loading={loading}
        data={tableData.articles}
        count={tableData.count}
        deleteCallback={deleteCallback}
        editCallback={editCallback}
        onChange={updateCallback}
      />
      <CircleIconButton color='primary' onClick={handleClick}>
        <Add fontSize='large' />
      </CircleIconButton>
    </div>
  );
}
