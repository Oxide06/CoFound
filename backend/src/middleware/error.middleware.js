const ApiError = require("../utils/ApiError");

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = err.errors || [];

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message
    }));
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource id";
    errors = [{ field: err.path, value: err.value }];
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Unauthorized";
  }

  if (err.code === 11000) {
    statusCode = 409;
    const fields = Object.keys(err.keyValue || {});
    message = `${fields.join(", ")} already exists`;
    errors = fields.map((field) => ({ field, value: err.keyValue[field] }));
  }

  const response = {
    success: false,
    message,
    errors
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };
