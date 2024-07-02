import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/category";
import mongoose from "mongoose";

export default async function handle(req, res) {
  await mongooseConnect();

  const { category } = req.query;
  const filter = {};

  if (category) {
    try {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      } else {
        // If category is not found, return empty result
        return res.json([]);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
