const errorConfigs = require("../config/msgConfig");

module.exports = class AppError extends Error {
  constructor(message, status, causes) {
    // Calling parent constructor of base Error class.
    const newMessage = message || errorConfigs.AppErrorMsgDefault;

    super(newMessage);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // `500` is the default value if not specified.
    this.status = status || errorConfigs.CodeInternalServerError;
    this.causes = causes;
  }
};
