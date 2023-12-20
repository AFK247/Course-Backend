/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './courses.controller';
import { courseValidationSchema } from './courses.validation';

const router = express.Router();

router.post(
  '/course',
  validateRequest(courseValidationSchema.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/courses', CourseControllers.getAllCourses);

router.get(
  '/courses/:courseId/reviews',
  CourseControllers.getCourseByIDAndReviews,
);

router.get('/course/best', CourseControllers.getBestCourse);

router.put(
  '/courses/:courseId',
  validateRequest(courseValidationSchema.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

export const CourseRoutes = router;
