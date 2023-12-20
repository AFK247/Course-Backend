import mongoose from 'mongoose';

const handleCastError = (err: mongoose.Error.CastError) => {
  const id = err.value;

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: `${id} is not a valid ID!`,
  };
};

export default handleCastError;
