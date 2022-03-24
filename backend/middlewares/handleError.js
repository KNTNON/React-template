"use strict";

const AppError = require("../utils/appError");
const errorConfigs = require("../config/msgConfig");

// error handlers middleware
module.exports = (error, req, res, next) => {
  if (error) {
    console.log("handle error", error);
    if (error instanceof AppError) {
      res.status(error.status).send({
        message: error.message,
        errors: error.causes
      });
    } else {
      res.status(errorConfigs.CodeInternalServerError).send({
        message: errorConfigs.AppErrorMsgDefault
      });
    }
  } else {
    res.status(errorConfigs.CodeInternalServerError).send({
      message: errorConfigs.AppErrorMsgDefault
    });
  }
};
