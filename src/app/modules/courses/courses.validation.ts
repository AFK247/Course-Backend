import { z } from 'zod';

//validation
export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'title must be string',
      required_error: 'title is required',
    }),
    instructor: z.string({
      invalid_type_error: 'instructor must be string',
      required_error: 'instructor is required',
    }),
    categoryId: z.string({
      invalid_type_error: 'categoryId must be string',
      required_error: 'categoryId is required',
    }),
    price: z.number({
      invalid_type_error: 'price must be number',
      required_error: 'price is required',
    }),
    tags: z.array(
      z.object({
        name: z.string({
          invalid_type_error: 'tags name must be string',
          required_error: 'tags name is required',
        }),
        isDeleted: z.boolean({
          invalid_type_error: 'tags isDeleted must be boolean',
          required_error: 'tags isDeleted is required',
        }),
      }),
    ),
    startDate: z.string({
      invalid_type_error: 'startDate must be string',
      required_error: 'startDate is required',
    }),
    endDate: z.string({
      invalid_type_error: 'endDate must be string',
      required_error: 'endDate is required',
    }),
    language: z.string({
      invalid_type_error: 'language must be string',
      required_error: 'language is required',
    }),
    provider: z.string({
      invalid_type_error: 'provider must be string',
      required_error: 'provider is required',
    }),
    durationInWeeks: z
      .number({
        invalid_type_error: 'durationInWeeks must be number',
        required_error: 'durationInWeeks is required',
      })
      .int()
      .optional(),
    details: z.object({
      level: z.string({
        invalid_type_error: 'details level must be string',
        required_error: 'details level is required',
      }),
      description: z.string({
        invalid_type_error: 'details description must be string',
        required_error: 'details description is required',
      }),
    }),
  }),
});

export const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().min(0).optional(),
    tags: z
      .array(
        z
          .object({
            name: z.string().optional(),
            isDeleted: z.boolean().optional(),
          })
          .optional(),
      )
      .optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    durationInWeeks: z.number().int().optional().optional(),
    details: z
      .object({
        level: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const courseValidationSchema = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
