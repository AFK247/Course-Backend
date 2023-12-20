import { Types } from 'mongoose';

interface CourseDetails {
  level: string;
  description: string;
}

interface Tag {
  name: string;
  isDeleted: boolean;
}

export interface TCourse {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: Tag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: CourseDetails;
}
