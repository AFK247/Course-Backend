/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidationSchema } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidationSchema.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
