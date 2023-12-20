import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string({
      invalid_type_error: 'courseId faculty must be string',
      required_error: 'courseId is required',
    }),
    rating: z
      .number({
        invalid_type_error: 'rating must be number',
        required_error: 'rating is required',
      })
      .int()
      .min(1)
      .max(5),
    review: z.string({
      invalid_type_error: 'review must be string',
      required_error: 'review is required',
    }),
  }),
});

export const reviewValidationSchema = {
  createReviewValidationSchema,
};
