import React from 'react';
import { MdSettings } from 'react-icons/md';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { GoogleLoginComponent } from './menu/google-login';
import { FacebookLoginComponent } from './menu/facebook-login';

import { getUser } from '@store/user/user.selectors';
import { showLoginSection } from '@store/ui/ui.selectors';

const SideMenuContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 260px;

  background-color: var(--color-gray);
  color: rgba(0, 0, 0, 0.8);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: rgba(255, 255, 255, 0.85);
`;
const SideMenuRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
`;

const SideMenuSpacer = styled.div`
  flex: 1;
`;

export const SideMenu: React.FC = () => {
  /**
   * get user data
   */
  const user = useSelector(getUser);

  /**
   * selectors
   */
  const showLogin = useSelector(showLoginSection);

  return (
    <SideMenuContainer>
      {user && (
        <SideMenuRow>
          Zazzle
          <MdSettings />
        </SideMenuRow>
      )}
      {showLogin && (
        <>
          <GoogleLoginComponent />
          <FacebookLoginComponent />
        </>
      )}
      <SideMenuSpacer />
    </SideMenuContainer>
  );
};
