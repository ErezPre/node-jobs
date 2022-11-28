const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class BadRequestError extends CustomAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
