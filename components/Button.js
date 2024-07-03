import React from 'react';
import styled, { css } from 'styled-components';
import { primaryColor } from '@/lib/colors';



export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    // width: 100%;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}
  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primaryColor};
    border: 1px solid ${primaryColor};
    color: #fff;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 1px solid ${primaryColor};
    color: ${primaryColor};
  `}
  ${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
    svg {
      height: 20px;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, primary, white, outline, size, ...rest }) {
  return (
    <StyledButton
      primary={primary ? 'true' : undefined}
      white={white ? 'true' : undefined}
      outline={outline ? 'true' : undefined}
      size={size}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}
