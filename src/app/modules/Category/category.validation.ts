import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be string',
      required_error: 'name is required',
    }),
  }),
});

export const categoryValidationSchema = {
  createCategoryValidationSchema,
};
