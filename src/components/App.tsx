import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { IconContext } from 'react-icons';
import { SideMenu } from './menu';
// import { MenuBar } from './atomic/app-bar'

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const theme = {
  isMobile: false
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle', fontSize: '24px' } }}>
        <AppContainer>
          <SideMenu />
          {/* <MenuBar /> */}
        </AppContainer>
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default App;
