import styled from 'styled-components';

export const MenuBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: ${({ theme }) => (theme.isMobile ? '56px' : '64px')};
  background-color: var(--color-primary);
  display: flex;
  align-items: center;
`;
