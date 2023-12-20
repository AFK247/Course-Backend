import { TCourse } from './courses.interface';

export const calculateDurationInWeeks = (course: TCourse): TCourse => {
  const startDate = new Date(course.startDate);
  const endDate = new Date(course.endDate);

  // Calculate the time difference in milliseconds
  const timeDiff = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to weeks (1 week = 7 days)
  const durationInWeeks = Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 7));

  return { ...course, durationInWeeks };
};
