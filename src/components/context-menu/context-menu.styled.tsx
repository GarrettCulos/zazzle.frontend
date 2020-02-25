import styled from 'styled-components';
export const MenuPositioner = styled.div`
  position: absolute;
  z-index: 10;
  right: -10px;
  top: 11px;

  border: 1px solid var(--color-grey);
  border-radius: 4px;
  background-color: var(--bg-color);
  box-shadow: 1px 1px 5px 0px rgba(50, 50, 50, 0.4);
`;

export const MenuPositionerContainer = styled.div`
  position: relative;
`;
