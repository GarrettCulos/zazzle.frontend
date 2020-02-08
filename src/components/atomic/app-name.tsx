import React from 'react';
import styled from 'styled-components';

const NameContainer = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  margin-left: 8px;
  letter-spacing: 1.5px;
  font-weight: 500;
`;

export const AppName: React.FC = () => {
  return <NameContainer>Zazzle</NameContainer>;
};
