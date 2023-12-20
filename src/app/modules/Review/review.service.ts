/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TReview } from './review.interface';
import Review from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
};
