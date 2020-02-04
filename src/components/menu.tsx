import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MdSettings, MdFolder, MdStarBorder, MdLocalActivity } from 'react-icons/md';
import { IoIosFlask as TempLogo } from 'react-icons/io';

import { GoogleLoginComponent } from './menu/google-login';
import { FacebookLoginComponent } from './menu/facebook-login';

import { getUser } from '@store/user/user.selectors';
import { showLoginSection, getSideNavState } from '@store/ui/ui.selectors';
import { setSideNavState } from '@store/ui/ui.actions';

import { AppName } from './atomic/app-name';
import { SideNavToggle } from './atomic/side-nav-toggle';
import {
  SideMenuContainer,
  SideMenuHeader,
  SideMenuSpacer,
  MenuDivider,
  LoginComponent,
  SideMenuRow,
  SmallContinueWith
} from './menu/menu-styles';

export const SideMenu: React.FC = () => {
  const dispatch = useDispatch();
  /**
   * get user data
   */
  const user = useSelector(getUser);

  /**
   * selectors
   */
  const showLogin = useSelector(showLoginSection);

  /**
   * sidenav state && toggle
   */
  const sideNavState = useSelector(getSideNavState);
  const isClosed = sideNavState === 'closed';
  const toggleSideNav = useCallback(() => {
    if (sideNavState !== 'open') {
      dispatch(setSideNavState('open'));
    } else {
      dispatch(setSideNavState('closed'));
    }
  }, [dispatch, sideNavState]);
  console.log(sideNavState);
  return (
    <SideMenuContainer sideNavState={sideNavState}>
      <SideMenuHeader>
        <SideNavToggle sideNavState={sideNavState} onClick={toggleSideNav} />
        <TempLogo style={{ color: 'var(--color-primary__dark)' }} />
        {!isClosed && <AppName />}
        <SideMenuSpacer />
        {user && <MdSettings />}
      </SideMenuHeader>
      <MenuDivider />
      {showLogin && (
        <>
          <LoginComponent>
            {isClosed && <SmallContinueWith>Continue with</SmallContinueWith>}
            <GoogleLoginComponent tinyButton={isClosed} />
            <FacebookLoginComponent tinyButton={isClosed} />
          </LoginComponent>
          <MenuDivider />
        </>
      )}
      <SideMenuRow active={true} vertical={isClosed}>
        <MdFolder /> <span>Projects</span>
      </SideMenuRow>
      {user && (
        <SideMenuRow vertical={isClosed}>
          <MdStarBorder /> <span>Favorites</span>
        </SideMenuRow>
      )}
      {user && (
        <SideMenuRow vertical={isClosed}>
          <MdLocalActivity /> <span>My Projects</span>
        </SideMenuRow>
      )}
      <SideMenuSpacer />
    </SideMenuContainer>
  );
};
