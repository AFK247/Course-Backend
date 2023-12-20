import mongoose, { Schema } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>({
  courseId: { type: Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true },
});

const Review = mongoose.model<TReview>('Review', reviewSchema);

export default Review;
