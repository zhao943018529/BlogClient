import gql from 'graphql-tag';

const GET_USER_ARTICLES = gql`
  query GetUserArticles($pageInfo: Pagination!) {
    getUserArticles(pageInfo: $pageInfo) {
      articles {
        id
        title
        createTime
        author {
          username
        }
        tags {
          id
          title
        }
      }
      count
    }
  }
`;

const GET_MORE_ARTICLES = gql`
  query GetMoreArticles($offset: Int!) {
    getMoreArticles(offset: $offset) {
      articles {
        id
        title
        createTime
        author {
          username
        }
        tags {
          id
          title
        }
      }
      count
    }
  }
`;

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: String!) {
    deleteArticle(id: $id) {
      code
      success
      message
    }
  }
`;

const DELETE_ARTICLES = gql`
  mutation DeleteArticles($ids: String!) {
    deleteArticles(ids: $ids) {
      code
      success
      message
    }
  }
`;

const ADD_ARTICLE = gql`
  mutation SaveArticle($article: ArticleInput!) {
    addArticle(article: $article) {
      code
      success
      data {
        id
        title
      }
    }
  }
`;

const UPDATE_ARTICLE = gql`
  mutation updateArticle($article: ArticleInput!) {
    updateArticle(article: $article) {
      code
      success
      data {
        id
        title
      }
    }
  }
`;

const GET_ARTICLE = gql`
  query GetArticle($id: String!) {
    getArticle(id: $id) {
      id
      title
      content
      createTime
      updateTime
      author {
        id
        username
        firstName
        lastName
      }
      tags {
        id
        title
      }
    }
  }
`;

const GET_ARTICLE_COUNT = gql`
  query GetArticleCount {
    getArticleCount
  }
`;

export {
  GET_USER_ARTICLES,
  DELETE_ARTICLE,
  DELETE_ARTICLES,
  GET_ARTICLE,
  UPDATE_ARTICLE,
  ADD_ARTICLE,
  GET_MORE_ARTICLES,
  GET_ARTICLE_COUNT,
};
