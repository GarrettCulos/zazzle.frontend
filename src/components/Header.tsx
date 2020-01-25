import React from 'react';
import styled from 'styled-components';

const HeaderS: any = styled.div`
  height: 56px;
  width: 100%;
  padding: 1rem;
`;

HeaderS.Title = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;
interface HeaderInterface {
  subTitle?: string;
}

export const Header: React.FC<HeaderInterface> = (props: HeaderInterface) => {
  return (
    <HeaderS>
      <HeaderS.Title> Zazzle </HeaderS.Title>
      {props.subTitle}
    </HeaderS>
  );
};
