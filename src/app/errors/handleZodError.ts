import { ZodError, ZodIssue } from 'zod';

const handleZodError = (err: ZodError) => {
  const errorSources = err.issues.map((issue: ZodIssue) => issue.message);

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorSources.join(','),
  };
};

export default handleZodError;
