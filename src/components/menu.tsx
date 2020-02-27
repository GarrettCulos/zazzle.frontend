import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MdFolder, MdStarBorder, MdCreateNewFolder } from 'react-icons/md';

import { GoogleLoginComponent } from './menu/google-login';
import { FacebookLoginComponent } from './menu/facebook-login';

import { getUser } from '@store/user/user.selectors';
import { showLoginSection, getSideNavState } from '@store/ui/ui.selectors';
import { toggleProjectCreationModal } from '@store/ui/ui.actions';

import { AppName } from './atomic/app-name';
import { ProjectIcon } from './menu/project-icon';

import {
  SideMenuContainer,
  SideMenuHeader,
  SideMenuSpacer,
  SideMenuRowTitle,
  MenuDivider,
  LoginComponent,
  SideMenuRowLink,
  ProjectRow,
  SmallContinueWith
} from './menu/menu-styles';
import Avatar from '@atlaskit/avatar';
import { environment } from '@environment/environment';

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
   * side nav state && toggle
   */
  const sideNavState = useSelector(getSideNavState);
  const isClosed = sideNavState === 'closed';

  const openCreateProject = useCallback(() => {
    dispatch(toggleProjectCreationModal(true));
  }, [dispatch]);
  //
  // disable sidenav toggling
  //
  // const toggleSideNav = useCallback(() => {
  //   if (sideNavState !== 'open') {
  //     dispatch(setSideNavState('open'));
  //   } else {
  //     dispatch(setSideNavState('closed'));
  //   }
  // }, [dispatch, sideNavState]);

  return (
    <SideMenuContainer sideNavState={sideNavState}>
      {user && <SideMenuHeader>{user.userIcon && <Avatar src={user.userIcon} />}</SideMenuHeader>}
      <SideMenuHeader>
        {/* <SideNavToggle sideNavState={sideNavState} onClick={toggleSideNav} /> */}
        {/* <TempLogo style={{ color: 'var(--color-primary__dark)' }} /> */}
        <AppName />
        {/* <SideMenuSpacer /> */}
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
      <SideMenuRowLink active={true} vertical={isClosed}>
        <MdFolder /> <span>Projects</span>
      </SideMenuRowLink>
      {environment.features.favorites && user && (
        <SideMenuRowLink vertical={isClosed}>
          <MdStarBorder /> <span>Favorites</span>
        </SideMenuRowLink>
      )}
      {user && <MenuDivider />}
      {environment.features.myProjects && user && (
        <>
          <SideMenuRowTitle>My Projects</SideMenuRowTitle>
          {user.myProjects.map(project => (
            <ProjectRow key={project.id} title={project.title}>
              <ProjectIcon isPrivate={project.private} />
              <span>{project.title}</span>
            </ProjectRow>
          ))}
        </>
      )}
      {user && (
        <ProjectRow onClick={openCreateProject}>
          <MdCreateNewFolder /> <span>Add</span>
        </ProjectRow>
      )}
      <SideMenuSpacer />
    </SideMenuContainer>
  );
};
