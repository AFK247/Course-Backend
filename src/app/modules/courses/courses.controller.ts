import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './courses.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const getCourseByIDAndReviews = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getCourseByIDAndReviewsFromDb(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const getBestCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getBestCourseFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  updateCourse,
  getCourseByIDAndReviews,
  getBestCourse,
};
