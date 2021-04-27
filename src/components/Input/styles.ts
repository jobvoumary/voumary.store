import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  & + div {
      margin-top: 16px;
    }
  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
  label{
    color: #6C6C80;
    margin-bottom: 8px;
  }
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;
    background: #fff;
    border-radius: 8px;
    padding: 18px 24px;
    width: 100%;
    font-size: 16px;

   
    &::placeholder {
      color: #b7b7cc;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
