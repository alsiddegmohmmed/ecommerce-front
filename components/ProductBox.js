import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ProductWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const WhiteBox = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  height: 200px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const Title = styled(Link)`
  font-size: 1rem;
  color: #333;
  text-decoration: none;
  margin: 0;
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
`;

const ProductInfoBox = styled.div`
  text-align: center;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + _id;

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <img src={images?.[0]} alt={title} />
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button block onClick={() => addProduct(_id)} primary outline>
            <CartIcon /> Add to Cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
