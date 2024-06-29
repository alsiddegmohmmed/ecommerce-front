import React from 'react'
import styled from 'styled-components'
import css from 'styled-jsx/css';

export const ButtonStyle = css`
background-color: #5542F6;
border:0; 
color: #fff; 
padding: 5px 15px; 
border-radius: 5px; 
cursor: pointer; 
display: inline-flex; 
align-items: center; 
text-decoration: none; 

svg{
  height: 16px; 
  margin-right: 5px; 

}
${props => props.white && !props.outline && css` 
  background-color: #fff; 
  color: #000; 
`}
${props => props.white && props.outline && css` 
  background-color: transparent; 
  color: #fff; 
  border: 1px solid #fff; 
`}
${props => props.primary && css`
    background-color: #5542F6; 
    color: #fff; 
`}
${props => props.size === 'l' && css`
font-size:1.2rem; 
border: 1px solid #5542F6;
padding: 10px 20px
svg {
  height: 20px; 
}
`}`


const StyledButton = styled.button`
    ${ButtonStyle}
`; 

export default function Button({children, ...rest}) {
  return (
      <StyledButton {...rest}>{children}</StyledButton>
   
  )
}
