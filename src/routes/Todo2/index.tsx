import * as React from 'react';
import styled from 'styled-components';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

const RootContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header``;

const Main = styled.main`
  flex: 1;
`;

const Footer = styled.footer``;

export default function TodoApp() {
  return (
    <RootContainer>
      <Header>
        <AddTodo />
      </Header>
      <Main>
        <TodoList />
      </Main>
      <Footer>
        <TodoFilter />
      </Footer>
    </RootContainer>
  );
}
