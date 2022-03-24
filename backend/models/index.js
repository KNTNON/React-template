"use strict";

module.exports = function(app) {
  const env = process.env.NODE_ENV || "development";
  const config = require("../config/dbConfig")[env];
  console.log("config", config);
  const mongoose = require("mongoose");

  mongoose.connect(config.database);
};
