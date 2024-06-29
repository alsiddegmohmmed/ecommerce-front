import React from 'react'
import styled from "styled-components";
import Center from './Center'
import Button from './Button';
import ButtonLink from './ButtonLink';

const Bg = styled.div`
  background-color: #222; 
  text-color: #fff; 
  padding: 50px 0; 
`;

const Title = styled.h1`
  margin: 0; 
  font-weight: normal; 
  font-size: 3rem;  

`;

const Desc = styled.p`
  color: #aaaa
  font-size;.8rem;

`;

const ColumnsWrapper = styled.div`
  display: grid; 
  grid-template-columns: 1.1fr .9fr; 
  gap: 14p;
  img{
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
  margin-top: 25px ; 

`;










export default function Featured(product) {
  return (
    <Bg>
        <Center >
            <ColumnsWrapper>
                <Column>
                <div>
                    <Title>{product.title}</Title>
                     <Desc>{product.description}</Desc>
                     <ButtonWrapper>
                     <ButtonLink  href={'/products/'+product._id} outline={1} white={1} >Read More</ButtonLink>
                     <Button primary >Add to cart</Button>
                     </ButtonWrapper>
                </div>
                </Column>
                <Column>
                    <img src='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/
                    mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200' />
                </Column>
            </ColumnsWrapper>
        
        </Center>
    </Bg>
  )
}


// go to 7:14 to add  an icon 