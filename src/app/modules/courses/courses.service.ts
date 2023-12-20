/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCourse } from './courses.interface';
import Course from './courses.model';
import { calculateDurationInWeeks } from './courses.utils';
import Review from '../Review/review.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const newPayload = calculateDurationInWeeks(payload);

  const result = await Course.create(newPayload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object

  const excludeFields = [
    'sortBy',
    'limit',
    'page',
    'minPrice',
    'maxPrice',
    'startDate',
    'endDate',
    'sortOrder',
  ];
  excludeFields.forEach((el) => delete queryObj[el]); // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  if (queryObj.tags) {
    queryObj['tags.name'] = queryObj.tags;
  }

  if (queryObj.level) {
    queryObj['details.level'] = queryObj.level;
  }

  delete queryObj['tags'];
  delete queryObj['level'];

  const filterQuery = Course.find(queryObj);

  // SORTING FUNCTIONALITY:

  let sort = '-createdAt'; // SET DEFAULT VALUE

  // IF sort  IS GIVEN SET IT

  if (query.sortBy) {
    if (query.sortOrder === 'asc') {
      sort = query.sortBy as string;
    } else sort = ('-' + query.sortBy) as string;
  }

  const sortQuery = filterQuery.sort(sort);

  // PAGINATION FUNCTIONALITY:

  let page = 1; // SET DEFAULT VALUE FOR PAGE
  let limit = 5; // SET DEFAULT VALUE FOR LIMIT

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
  }

  const minPrice = query.minPrice ? query.minPrice : 0;
  const maxPrice = query.maxPrice ? query.maxPrice : Number.MAX_VALUE;

  const rangePriceQuery = {
    price: {
      $gte: minPrice,
      $lte: maxPrice,
    },
  };

  const priceRangeQuery = sortQuery.find(rangePriceQuery);

  const startDate = query.startDate ? query.startDate : '1970-01-01';
  const endDate = query.endDate ? query.endDate : '3070-01-01';

  const rangeDateQuery = {
    $and: [{ startDate: { $gte: startDate } }, { endDate: { $lte: endDate } }],
  };

  const dateRangeQuery = await priceRangeQuery.find(rangeDateQuery);
  // const limitQuery = await dateRangeQuery.limit(limit);

  const limited = dateRangeQuery.slice(0, limit);

  const meta = {
    page,
    limit,
    total: dateRangeQuery.length,
  };

  return { data: limited, meta };
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { details, tags, ...remainingCourseData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }

  if (tags && tags.length > 0) {
    // filter out the deleted fields
    const deletedCourse = tags
      .filter((el) => el.name && el.isDeleted)
      .map((el) => el.name);

    const deletedCourses = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          tags: { name: { $in: deletedCourse } },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!deletedCourses) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }

    // filter out the new course fields
    const newCourse = tags?.filter((el) => el.name && !el.isDeleted);

    const newCourses = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { tags: { $each: newCourse } },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!newCourses) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }
  }

  const result = await Course.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const getCourseByIDAndReviewsFromDb = async (id: string) => {
  const resultCourse = await Course.findById(id);
  const resultReview = await Review.find({ courseId: id });

  const result = resultCourse?.toObject();

  const sendData = {
    ...result,
    reviews: resultReview,
  };
  return sendData;
};

const getBestCourseFromDb = async () => {
  // const resultCourse = await Course.findById(id);
  // const resultReview = await Review.find({ courseId: id });

  const bestReview: any = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  const { _id } = bestReview[0];

  const resultCourse = await Course.findById(_id);

  const temp = resultCourse?.toObject();

  const resData = {
    ...temp,
    averageRating: bestReview[0]?.averageRating,
    reviewCount: bestReview[0]?.reviewCount,
  };

  return resData;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  updateCourseIntoDB,
  getCourseByIDAndReviewsFromDb,
  getBestCourseFromDb,
};
