import styled from 'styled-components';

interface ButtonInterface {
  onClick?: Function;
  disabled?: boolean;
  tinyButton?: boolean;
}

export const LoginButton = styled.div<ButtonInterface>`
  width: ${({ tinyButton }) => (tinyButton ? 'unset' : '208px')};
  font-family: 'Roboto';
  height: 23px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.8);
  padding: 8px 24px;
  cursor: pointer;
  margin-bottom: 16px;

  display: flex;
  align-items: center;
  /* justify-content: center; */
  border-radius: 24px;
  span {
    margin-left: 8px;
    min-width: 168px;
    text-align: center;
  }
`;
