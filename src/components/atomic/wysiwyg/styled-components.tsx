import styled from 'styled-components';

export const WizyWrapper = styled.div<{ integrated?: boolean }>`
  ${({ integrated }) => !integrated && `border: 1px solid var(--border-color);`}
  ${({ integrated }) => !integrated && `border-radius: var(--form-border-radius);`}
  ${({ integrated }) => !integrated && `padding: 8px;`}
  ${({ integrated }) => !integrated && `padding-bottom: 0px;`}
`;

export const WizyInputWrapper = styled.div`
  padding: 0 8px;
`;
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
`;

interface ButtonInterface {
  active?: boolean;
  disabled?: boolean;
}
export const ViewOnlyWrapper = styled.div`
  display: block;
  width: 100%;
`;

export const Button = styled.div<ButtonInterface>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  width: 34px;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  cursor: ${({ disabled }) => (disabled ? 'cursor' : 'pointer')};
  border-radius: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;
