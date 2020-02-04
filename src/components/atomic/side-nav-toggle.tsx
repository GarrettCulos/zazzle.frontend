import React from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

interface SideNavToggleInterface {
  sideNavState: 'open' | 'closed' | 'extended';
  onClick?: any;
}

export const SideNavToggle: React.FC<SideNavToggleInterface> = ({ sideNavState, onClick }: SideNavToggleInterface) => {
  return sideNavState === 'closed' ? <MdChevronRight onClick={onClick} /> : <MdChevronLeft onClick={onClick} />;
};
