import styled, { css } from 'styled-components';

export const sideMenuWidthSwitch = mode => {
  switch (mode) {
    case 'closed':
      return '112px';
    case 'extended':
      return '500px';
    case 'open':
    default:
      return '291px';
  }
};

interface SideMenuInterface {
  sideNavState?: 'open' | 'closed' | 'extended';
}

export const SideMenuContainer = styled.div<SideMenuInterface>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  box-sizing: border-box;
  padding-top: 16px;
  padding-bottom: 16px;
  width: ${({ sideNavState }) => sideMenuWidthSwitch(sideNavState)};

  background-color: var(--color-gray);
  color: rgba(0, 0, 0, 0.8);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: rgba(255, 255, 255, 0.85);
  overflow-x: hidden;
  overflow-y: auto;
`;

export const SideMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 4px 1rem;
  width: 100%;
`;

interface SideMenuRowInterface {
  active?: boolean;
  vertical?: boolean;
}
const VerticalMenuText = css`
  margin-top: 4px;
  margin-bottom: 4px;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
`;

export const SmallContinueWith = styled.div`
  ${VerticalMenuText}
  margin-top:0;
  font-size: 11px;
  font-weight: 600;
`;

export const SideMenuRowTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  color: inherit;
  padding: 0 1rem 1rem 1rem;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ProjectRow = styled.div<SideMenuRowInterface>`
  cursor: pointer;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 1rem;
  padding-left: calc(1rem + 8px);
  width: 100%;
  color: ${({ active }) => (active ? 'var(--color-primary__dark)' : 'inherit')};
  :hover {
    color: var(--color-primary__dark);
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    margin-left: 8px;
  }
  svg {
    min-width: 24px;
  }
`;

export const SideMenuRow = styled.div<SideMenuRowInterface>`
  cursor: pointer;
  display: flex;
  flex-direction: ${({ vertical }) => (vertical ? 'column' : 'row')};
  align-items: center;
  box-sizing: border-box;
  padding: 10px 1rem;
  width: 100%;
  color: ${({ active }) => (active ? 'var(--color-primary__dark)' : 'inherit')};
  :hover {
    color: var(--color-primary__dark);
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    margin-left: ${({ vertical }) => (vertical ? '0' : '8px')};
    ${({ vertical }) => (vertical ? VerticalMenuText : '')}
  }
  svg {
    min-width: 24px;
  }
`;

export const SideMenuRowLink = styled(SideMenuRow)`
  svg {
    margin-left: ${({ vertical }) => (vertical ? '0' : '24px')};
  }
`;

export const SideMenuSpacer = styled.div`
  flex: 1;
`;

export const LoginComponent = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: 16px 0;
  padding: 0 16px;
  flex-direction: column;
`;

export const MenuDivider = styled.div`
  box-sizing: border-box;
  width: calc(100% - 32px);
  margin: 16px;
  height: 1px;
  border-radius: 1px;
  background-color: rgba(255, 255, 255, 0.14);
`;
