const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "development";
const config = require("../config/dbConfig")[env];
const User = require("./user");

mongoose.connect(config.database);

function create() {
  console.log("Creating Admin User ...");
  const model = User.getModel();
  const user = new model({
    email: "admin@msn.com",
    password: "password",
    language: "en",
    privacy: "public",
    activate: true
  });
  return user.save(err => {
    if (err) {
      console.error("Error:", err.message);
      return process.exit();
    }
    console.log("Create Admin Success");
    return process.exit();
  });
}

create();
