import React from 'react';
import { useSelector } from 'react-redux';
import { getSideNavState } from '@store/ui/ui.selectors';
import styled, { ThemeProvider } from 'styled-components';
import { IconContext } from 'react-icons';
import { SideMenu } from './menu';
import Home from './home/home';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const theme = {
  isMobile: false
};

interface ContainerInterface {
  navClosed?: boolean;
}
const Container = styled.div<ContainerInterface>`
  height: 100%;
  width: 100%;
  margin-left: ${({ navClosed }) => (navClosed ? '106px' : '291px')};
`;

const App: React.FC = () => {
  const sideNavState = useSelector(getSideNavState);
  const isClosed = sideNavState === 'closed';

  return (
    <ThemeProvider theme={theme}>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle', fontSize: '24px' } }}>
        <AppContainer>
          <SideMenu />
          <Container navClosed={isClosed}>
            <Home />
          </Container>
        </AppContainer>
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default App;
