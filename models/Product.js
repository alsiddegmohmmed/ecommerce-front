import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  properties: { type: Object },
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);
