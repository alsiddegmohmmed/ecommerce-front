import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import Button from './Button';
import ButtonLink from './ButtonLink';
import CartIcon from './CartIcon';

const Bg = styled.div`
  background-color: #222; 
  color: #fff; 
  padding: 50px 0; 
`;

const Title = styled.h1`
  margin: 0; 
  font-weight: normal; 
  font-size: 3rem;  
`;

const Desc = styled.p`
  color: #aaaa;
  font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid; 
  grid-template-columns: 1.1fr .9fr; 
  gap: 14px;
  img {
    max-width: 100%; 
  }
`;

const Column = styled.div`
  display: flex; 
  align-items: center; 
`;

const ButtonWrapper = styled.div`
  display: flex; 
  gap: 10px; 
  margin-top: 25px; 
`;

export default function Featured({ product }) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonWrapper>
                <ButtonLink href={`/products/${product._id}`} outline={1} white={1}>
                  Read More
                </ButtonLink>
                <Button primary="#5542F6">
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.title} />
            ) : (
              <img src='/placeholder-image.png' alt='Placeholder' />
            )}
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
