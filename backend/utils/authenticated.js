// const error = require('./error/error')
const jwt = require("./jwt-then");
const config = require("../config/appConfig");
const errorConfigs = require("../config/msgConfig");
const AppError = require("./appError");

// authen middleware
module.exports = async function isAuthenticated(req, res, next) {
  try {
    const token = await jwt.getTokenWithReq(req);

    if (token) {
      let payload = await jwt.verify(token, config.jsonWebToken.secret);
      if (!payload) {
        throw new AppError(
          errorConfigs.AppErrorMsgUnAuthorized,
          errorConfigs.CodeUnAuthorized
        );
      } else {
        req.session.token = token;
        req.session.user = payload;
        return next();
      }
    } else {
      throw new AppError(
        errorConfigs.AppErrorMsgUnAuthorized,
        errorConfigs.CodeUnAuthorized
      );
    }
  } catch (error) {
    next(
      new AppError(
        errorConfigs.AppErrorMsgUnAuthorized,
        errorConfigs.CodeUnAuthorized
      )
    );
  }
};
