import { Router } from 'express';
import { CourseRoutes } from '../modules/courses/courses.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { ReviewRoutes } from '../modules/Review/review.route';

const router = Router();

const moduleRoutes = [
  {
    path: '',
    route: CourseRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

//To avoid repetitive code
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
