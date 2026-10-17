// export const httpError = (message, statusCode) =>
//   Object.assign(new Error(message), { statusCode });

// export const catchAsync = (fn) => (req, res, next) =>
//   Promise.resolve(fn(req, res, next)).catch(next);
export const httpError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

export const catchAsync = (fn) => {
  return (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
export default (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    status = 409;
    message = `${Object.keys(err.keyValue || {})[0] || "Value"} already exists`;
  } else if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  } else if (err.name === "CastError") {
    status = 400;
    message = `Invalid ${err.path}`;
  }

  if (status === 500) console.error(err);
  res.status(status).json({ success: false, message });
};
