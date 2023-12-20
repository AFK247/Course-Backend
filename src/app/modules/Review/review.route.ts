/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidationSchema } from './review.validation';
import { ReviewControllers } from './review.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(reviewValidationSchema.createReviewValidationSchema),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
