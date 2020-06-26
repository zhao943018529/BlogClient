import * as React from 'react';
import styled from 'styled-components';
import {
  Typography,
  Divider,
  List,
  Paper,
  useScrollTrigger,
} from '@material-ui/core';
import { useQuery, useLazyQuery } from '@apollo/client';
import useWindowScroll from '@utils/useWindowScroll';
import { getWinRect } from '@utils/win';
import { GET_MORE_ARTICLES } from '@graphql/article';
import LoadMore from '@components/LoadMore';
import PostItem from './PostItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ArticlesData {
  articles: Article[];
  count: number;
}

interface ArticlesResponse {
  getMoreArticles: ArticlesData;
}

interface AritcleCountResponse {
  getArticleCount: number;
}

export default function Post() {
  const [offset, setOffset] = React.useState(0);
  const [articles, setArticles] = React.useState<Article[]>([]);
  const { loading, data, refetch } = useQuery<
    ArticlesResponse,
    { offset: number }
  >(GET_MORE_ARTICLES, {
    fetchPolicy: 'network-only',
    variables: {
      offset,
    },
    // onCompleted 存在一些问题 有时会在请求完成之前执行这个方法导致请求的data为undefined
    // notifyOnNetworkStatusChange: true,
    // onCompleted(result) {
    //   if (result && result.getMoreArticles) {
    //     const { articles: list, count } = result.getMoreArticles;
    //     const newArticles = articles.concat(list);
    //     setArticles(newArticles);
    //     // if (count <= offset) {
    //     //   setOffset(offset);
    //     // }
    //   }
    // },
  });
  const scrollCallback = React.useCallback(
    (current: { x: number; y: number }, prev: { x: number; y: number }) => {
      if (current.y < prev.y) return;
      const rect = getWinRect();
      if (current.y + rect.clientHeight >= rect.height - 10) {
        setOffset((oldVal) => oldVal + 10);
      }
    },
    []
  );
  const scroll = useWindowScroll(scrollCallback);

  React.useEffect(() => {
    refetch({ offset }).then((data) => {
      if (data.data?.getMoreArticles.articles) {
        setArticles(articles.concat(data.data?.getMoreArticles.articles));
      }
    });
  }, [offset]);

  React.useEffect(() => {
    if (articles.length === 0 && data?.getMoreArticles) {
      setArticles(data.getMoreArticles.articles);
    }
  }, [data, articles]);

  return (
    <Container>
      <Typography variant='h6' component='h6' gutterBottom>
        From the firebose
      </Typography>
      <Divider />
      <List>
        {articles.map((item) => (
          <PostItem key={item.id} article={item} />
        ))}
      </List>
      {loading ? <LoadMore /> : null}
    </Container>
  );
}
