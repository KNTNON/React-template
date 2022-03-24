const apiPathUrlConfig = require("./apiPathUrlConfig");

const appName = process.env.APP_NAME || "";

const config = {
  port: 4000,
  env: process.env.NODE_ENV || "development",
  cookie: {
    maxAge: 24 * 60 * 60000
  },
  app: {
    host: process.env.HOSTNAME || "localhost",
    port: process.env.PORT || 3000,
    name: process.env.APP_NAME || "gisid",
    version: process.env.VERSION || "1.0.0"
  },
  jsonWebToken: {
    secret: "AF812BCE1881F2AB9326478C9296AB8FBDB38FC9BDE4DAD394492814B2554384"
  }
};

config.getServiceConfig = function(name) {
  return apiPathUrlConfig[name];
};

module.exports = config;
