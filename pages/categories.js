import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/Header";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import styled from "styled-components";
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

export default function CategoriesPage({ initialProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products?category=667a67ded3ea5638eca65c4d'); 
        // Use the provided Mobile category ID
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Center>
        <Title>Mobile Products</Title>
        
  
        <ProductsGrid products={filteredProducts} />

        <Title>Laptops</Title>
        <ProductsGrid products={filteredProducts} />
        <Title>Headphones</Title>
        
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const category = await Category.findById('667a67ded3ea5638eca65c4d').lean();
  const products = await Product.find({ category: category._id }).lean();

  return {
    props: {
      initialProducts: JSON.parse(JSON.stringify(products)),
    },
  };
}
