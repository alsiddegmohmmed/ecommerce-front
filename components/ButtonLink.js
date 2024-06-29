import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { css } from 'styled-components';
import { ButtonStyle } from './Button';

const StyledLink = styled(Link)`
  ${css`${ButtonStyle}`} // Ensure the ButtonStyle is interpolated properly
`;

export default function ButtonLink(props) {
  return (
    <StyledLink {...props} />
  );
}
