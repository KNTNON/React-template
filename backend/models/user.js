const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const errorConfigs = require("../config/msgConfig");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const User = {};

User.UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    privacy: {
      type: String,
      required: true,
      default: "public"
    },
    activate: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true
  }
);

User.getModel = () => {
  return mongoose.model("User", User.UserSchema);
};

User.getUserDetail = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const Model = User.getModel();

      const user = await Model.findById(userId);
      if (!user) {
        return reject(
          new AppError(
            errorConfigs.AppErrorMsgEmailNotMatch,
            errorConfigs.CodeBadRequest
          )
        );
      }
      return resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
};

User.bcryptPassword = async password => {
  if (!password) {
    throw new AppError(
      errorConfigs.AppErrorMsgWrongPassword,
      errorConfigs.CodeBadRequest
    );
  }
  try {
    let hash = await bcrypt.hash(password, 10);
    if (!hash) {
      throw new AppError(errorCode.AppErrorMsgUnableToHashPassword);
    } else {
      return hash;
    }
  } catch (error) {
    throw error;
  }
};

User.comparePassword = async function(password, hashPassword) {
  try {
    let compare = await bcrypt.compare(password, hashPassword);
    return compare;
  } catch (error) {
    throw error;
  }
};

User.Create = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Model = User.getModel();

      const existingUser = await Model.findOne({ email });

      if (existingUser) {
        return reject(
          new AppError(
            errorConfigs.AppErrorMsgUserExist,
            errorConfigs.CodeBadRequest
          )
        );
      }

      const bcryptPassword = await User.bcryptPassword(password);

      const newUser = new Model({
        email: email.toLowerCase().trim(),
        password: bcryptPassword,
        language: "en",
        privacy: "public",
        activate: true
      });

      const saveSuccess = await newUser.save();
      return resolve(saveSuccess.toObject());
    } catch (error) {
      return reject(error);
    }
  });
};

User.SingIn = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Model = User.getModel();

      const tmpEmail = email.toLowerCase().trim();

      const user = await Model.findOne({ email: tmpEmail }).lean();

      if (!user) {
        return reject(
          new AppError(
            errorConfigs.AppErrorMsgEmailNotMatch,
            errorConfigs.CodeBadRequest
          )
        );
      }

      const comparePassword = await User.comparePassword(
        password,
        user.password
      );

      if (!comparePassword) {
        return reject(
          new AppError(
            errorConfigs.AppErrorMsgPasswordNotMatch,
            errorConfigs.CodeBadRequest
          )
        );
      }

      resolve(user);
    } catch (error) {
      return reject(error);
    }
  });
};

User.Update = async (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.getUserDetail(userId);

      Object.keys(data).forEach(key => {
        user[key] = data[key];
      });

      const updateSuccess = await user.save();
      return resolve(updateSuccess.toObject());
    } catch (error) {
      return reject(error);
    }
  });
};

User.UpdatePassword = async (userId, oldPassword, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.getUserDetail(userId);

      const comparePassword = await User.comparePassword(
        oldPassword,
        user.password
      );

      if (!comparePassword) {
        return reject(
          new AppError(
            errorConfigs.AppErrorMsgPasswordNotMatch,
            errorConfigs.CodeBadRequest
          )
        );
      }

      const bcryptPassword = await User.bcryptPassword(newPassword);
      user.password = bcryptPassword;

      const updateSuccess = await user.save();
      return resolve(updateSuccess.toObject());
    } catch (error) {
      return reject(error);
    }
  });
};

User.deleteAccount = async userId => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.getUserDetail(userId);

      user.activate = false;
      const updateSuccess = await user.save();
      return resolve(updateSuccess.toObject());
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = User;
