const AppError = require("../utils/appError");
const errorCode = require("../config/msgConfig");
const jwt = require("../utils/jwt-then");
const User = require("../models/user");

const controller = {};

controller.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.SingIn(email, password);

    user.password = undefined;

    let accessToken = await jwt.genTicket(user);

    if (!accessToken) {
      throw new AppError(errorCode.AppErrorMsgDefault);
    }

    if (user.activate) {
      return res.send({
        user: user,
        token: accessToken
      });
    } else {
      throw new AppError(errorCode.AppErrorMsgAccountDeleted);
    }
  } catch (error) {
    next(error);
  }
};

controller.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.Create(email, password);

    if (!user) {
      throw new AppError(errorCode.AppErrorMsgDefault);
    }

    user.password = undefined;

    let token = await jwt.genTicket(user);

    return res.send({
      user: user,
      token
    });
  } catch (error) {
    next(error);
  }
};

controller.update = async (req, res, next) => {
  try {
    const body = req.body;

    const userId = req.params.user_id;

    let user = await User.Update(userId, body);
    return res.send({
      user: user
    });
  } catch (err) {
    next(err);
  }
};

controller.updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    console.log("req.session.user", req.session.user);
    const userId = req.session.user._id;

    const user = await User.UpdatePassword(userId, oldPassword, newPassword);

    res.send();
  } catch (err) {
    next(err);
  }
};

controller.signout = async (req, res, next) => {
  try {
    // todo::
    req.session && req.session.destroy();
    req.session && req.user.destroy();

    return res.send();
  } catch (err) {
    next(err);
  }
};

controller.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    await User.deleteAccount(userId);
    res.send();
  } catch (err) {
    next(err);
  }
};

controller.verifyToken = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.getUserDetail(userId);
    res.send({
      user: user,
      token: req.session.token
    });
  } catch (err) {
    next(err);
  }
};

module.exports = controller;
