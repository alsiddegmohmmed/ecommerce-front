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
  const [laptops, setLaptops] = useState(initialProducts); 
  const [headphones,  setHeadphones] = useState(initialProducts); 
  const [samsung, setSamsung] =  useState(initialProducts)

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

    const fetchLaptop = async () => {
      try {
        const response = await axios.get('/api/products?category=667d08299b401379e1e98791'); 
        // Use the provided Mobile category ID
        setLaptops(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    const fetchSamsung = async () => {
      try {
        const response = await axios.get('/api/products?category=667d080d9b401379e1e9878d'); 
        // Use the provided Mobile category ID
        setSamsung(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchHeadphoones= async () => {
      try {
        const response = await axios.get('/api/products?category=667d081a9b401379e1e9878f'); 
        // Use the provided Mobile category ID
        setHeadphones(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    fetchLaptop(); 
    fetchHeadphoones(); 
    fetchSamsung(); 

  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLaptop = laptops.filter(laptop =>
    laptop.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHeadphones = headphones.filter(headphone =>
    headphone.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const filteredSamsung = samsung.filter(samsung =>
    samsung.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Center>
        <Title>IPhones &  IPads</Title>
        <ProductsGrid products={filteredProducts} />
        <Title>Andriod Mobiles</Title>
        <ProductsGrid products={filteredSamsung} />
        <Title>Laptops</Title>
        <ProductsGrid products={filteredLaptop} />
        <Title>Headphones</Title>
        <ProductsGrid products={filteredHeadphones} />

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
