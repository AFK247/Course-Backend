/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TCategory } from './category.interface';
import Category from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getCategoryFromDB = async () => {
  const result = await Category.find({});
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getCategoryFromDB,
};
