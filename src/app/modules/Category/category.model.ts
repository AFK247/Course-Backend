import mongoose, { Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true, unique: true },
});

const Category = mongoose.model<TCategory>('Category', categorySchema);

export default Category;
