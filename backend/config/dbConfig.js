module.exports = {
  development: {
    username: process.env.DB_USERNAME || "mongodb",
    password: process.env.DB_PASSWORD || "P@ssw0rd",
    database: "mongodb://localhost:27017/fancy"
  },
  production: {
    username: process.env.DB_USERNAME || "mongodb",
    password: process.env.DB_PASSWORD || "P@ssw0rd",
    database: "mongodb://localhost:27017/fancy"
  }
};
