import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      z
    </AppContainer>
  );
};

export default App;
