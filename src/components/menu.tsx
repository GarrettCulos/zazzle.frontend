import React from 'react';
import { MdSettings } from 'react-icons/md';
import styled from 'styled-components';
import { ConnectedProps, ReduxConnector } from '@store/connector';

// import IconButton from './atomic/icon-button';
const connector = new ReduxConnector(state => ({
  user: state.user.user
})).connector;
type PropFromRedux = ConnectedProps<typeof connector>;

const SideMenuContainer: any = styled.div`
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

SideMenuContainer.Title = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;

const SideMenuSpacer = styled.div`
  flex: 1;
`;
// const TextLink = styled.a`
//   margin: 0 10px;
// `

interface HeaderInterface {
  subTitle?: string;
}

const _SideMenu: React.FC<HeaderInterface & PropFromRedux> = (props: HeaderInterface & PropFromRedux) => {
  console.log(props);
  return (
    <SideMenuContainer>
      {props.user && (
        <SideMenuRow>
          Zazzle
          <MdSettings />
        </SideMenuRow>
      )}
      <SideMenuSpacer />
    </SideMenuContainer>
  );
};

export const SideMenu = connector(_SideMenu);
