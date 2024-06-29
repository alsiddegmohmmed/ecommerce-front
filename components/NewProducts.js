import styled from "styled-components";
import Center from "@/components/Center";
import ProductBox from "./ProductBox";
// import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
export default function NewProducts({products}) {
  return (
    <Center>
        <Title>New Arrivals</Title>
        <ProductsGrid>
            {products?.length > 0 && products.map(product => (
                <ProductBox {...product} />
            ))}
        </ProductsGrid>
      
      {/* <ProductsGrid products={products} /> */}
    </Center>
  );
}