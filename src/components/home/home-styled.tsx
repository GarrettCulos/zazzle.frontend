import styled from 'styled-components';
export const LoadMore = styled.div`
  width: 100%;
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  max-width: 550px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;
export const PageContainer = styled.div`
  height: 100%;
  width: calc(100% - 32px);
  max-width: 1200px;
  margin: 16px;
  margin-bottom: 32px;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 550px;
`;
