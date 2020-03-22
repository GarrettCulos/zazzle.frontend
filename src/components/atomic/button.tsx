import styled from 'styled-components';

interface ButtonInterface {
  style?: 'primary' | 'secondary' | 'warn';
  disabled?: boolean;
}

const Button = styled.button<ButtonInterface>`
  min-width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;

  padding: 8px 16px;
  margin-right: 16px;

  border: 1px solid var(--button-border);
  border-radius: 20px;
  text-transform: uppercase;
  cursor: ${({ disabled }) => (!disabled ? 'pointer' : 'not-allowed')};

  :hover {
    border-color: ${({ disabled }) => (!disabled ? 'var(--button-border__hover)' : 'var(--button-border)')};
  }
  :focus {
    outline: none;
  }
`;
export default Button;
