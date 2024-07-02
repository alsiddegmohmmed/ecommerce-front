// api/products/by-category.js

import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'GET') {
        const { categoryId } = req.query;
        try {
            const products = await Product.find({ category: categoryId });
            res.json(products);
        } catch (error) {
            console.error('Error fetching products by category:', error);
            res.status(500).json({ message: 'Error fetching products by category' });
        }
    }
}
