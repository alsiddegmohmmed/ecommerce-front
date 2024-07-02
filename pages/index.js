// index.js

import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Featured from '@/components/Featured';
import { Product } from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';
import NewProducts from '@/components/NewProducts';
import { CartContext } from '@/components/CartContext';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage({ featuredProduct, newProducts }) {

  
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} /> 
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '667d1cb294ba08f8614feace';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: { '_id': -1 }, limit: 10});
  
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
