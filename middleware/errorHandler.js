const { constants } = require("../constants");
const errorHandler = (error, request, response, next) => {
  // console.log("Error Handle ==> ", response);
  const statusCode = response.statusCode ? response.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      response.json({
        title: "Validation Failed",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.NOT_FOUND:
      response.json({
        title: "Not Found",
        message: error.message,
        stackTrace: error.stack,
      });
    case constants.FORBIDDEN:
      response.json({
        title: "Forbidden Error",
        message: error.message,
        stackTrace: error.stack,
      });
    case constants.UNAUTHORIZED:
      response.json({
        title: "Unauthorized",
        message: error.message,
        stackTrace: error.stack,
      });
    case constants.SERVER_ERROR:
      response.json({
        title: "Server Error",
        message: error.message,
        stackTrace: error.stack,
      });
    default:
      console.log("No error, all good");
      response.json({
        title: "Default error",
        message: error.message,
        stackTrace: error.stack,
      });
      break;
  }
};

module.exports = errorHandler;
