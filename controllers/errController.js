const AppError = require("../utils/appError");

//A function that handles castError for instance for invalid id
const handlecastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("invalid token.please log in again ", 401);

const handleJWTExpiredError = () =>
  new AppError("your token has expired token.please log in again", 401);

const sendDevError = res.status(err.statusCode).json({
  status: err.status,
  error: err,
  message: err.message,
  stack: err.stack,
});

const sendProdError = (err, res) => {
  //Operational trusted error: send mesage to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //programming or other unknown error: dont leak error details
  } else {
    //log error
    console.error("ERROR", err);
    //send generic message
    res.status(500).json({
      status: "error",
      message: "something went very wrong",
    });
  }
};

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    // if our error is castError i.e This error typically occurs when you try to query or manipulate data in MongoDB/Mongoose
    // and the data you provided doesn't match the expected data type.
    if (error.name === "castError") error = handlecastErrorDB(error);
    if (error.code === 1100) error = handleDuplicateFieldsDB(error);
    if (error.name === 'validationError') error = handleValidationErrorDB(error )

    sendProdError(error, res);
  }
};
