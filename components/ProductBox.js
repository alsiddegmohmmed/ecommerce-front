import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductWrapper = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;

const Title = styled(Link)`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
  text-decoration: none;
  margin: 10px 0;
`;

const ProductInfoBox = styled.div`
  padding: 20px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

export default function ProductBox({_id, title, description, price, images}) {
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + _id;

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  return (
    <div data-aos="fade-up">
      <ProductWrapper>
        <WhiteBox href={url}>
          <div>
            <img src={images?.[0]} alt={title} />
          </div>
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
    </div>
  );
}
