import { Product } from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
  await mongooseConnect();
  const { category } = req.query;

  let query = {};
  if (category) {
    query.category = category;
  }

  try {
    const products = await Product.find(query).populate('category');
    res.status(200).json(products);
    console.log('Category:', category);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
}