import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "@/components/Header";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import styled from "styled-components";
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';

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
  const [laptops, setLaptops] = useState([]);
  const [headphones, setHeadphones] = useState([]);
  const [samsung, setSamsung] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/categories?category=667a67ded3ea5638eca65c4d');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchLaptops = async () => {
      try {
        const response = await axios.get('/api/categories?category=667d08299b401379e1e98791');
        setLaptops(response.data);
      } catch (error) {
        console.error('Error fetching laptops:', error);
      }
    };

    const fetchSamsung = async () => {
      try {
        const response = await axios.get('/api/categories?category=667d080d9b401379e1e9878d');
        setSamsung(response.data);
      } catch (error) {
        console.error('Error fetching Samsung products:', error);
      }
    };

    const fetchHeadphones = async () => {
      try {
        const response = await axios.get('/api/categories?category=667d081a9b401379e1e9878f');
        setHeadphones(response.data);
      } catch (error) {
        console.error('Error fetching headphones:', error);
      }
    };

    fetchProducts();
    fetchLaptops();
    fetchSamsung();
    fetchHeadphones();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLaptops = laptops.filter(laptop =>
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
        <Title>IPhones & IPads</Title>
        <ProductsGrid products={filteredProducts} />
        <Title>Android Mobiles</Title>
        <ProductsGrid products={filteredSamsung} />
        <Title>Laptops</Title>
        <ProductsGrid products={filteredLaptops} />
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
