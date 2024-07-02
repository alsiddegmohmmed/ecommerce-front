import {mongooseConnect} from "@/lib/mongoose";
import { Product } from '@/models/Product';
import { Category } from '@/models/category' // Make sure to import Category model
import ProductsGrid from '@/components/ProductsGrid';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const CategoryFilter = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

export default function CategoriesPage({ products, categories }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const response = await axios.get('/api/products', {
        params: { category: selectedCategory }
      });
      setFilteredProducts(response.data);
    };

    if (selectedCategory) {
      fetchFilteredProducts();
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <h1>All Products</h1>
      <SearchInput 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm}
        onChange={handleSearch}
      />
      <CategoryFilter 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </CategoryFilter>
      <ProductsGrid products={filteredProducts} />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } }).populate('category');
  const categories = await Category.find({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories))
    },
  };
}
