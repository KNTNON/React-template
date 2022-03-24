const express = require("express");
const path = require("path");
const config = require("./config/appConfig");

const app = express(); // init node express

// node environment
const dev = process.env.NODE_ENV !== "production";

// WHY : https://stackoverflow.com/questions/39930070/nodejs-express-why-should-i-use-app-enabletrust-proxy
if (dev) {
  app.set("trust proxy", 1); // Express will have knowledge that it's sitting behind a proxy
}

const clientRoute = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
};

// Middlewares
require("./middlewares")(app);

app.get("/", clientRoute);

// Routes file for interacting
require("./routes")(app);

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/*", clientRoute);

// Connect database
require("./models")(app);

// development error handler
// middleware error
// will print stacktrace
const handleError = require("./middlewares/handleError");
app.use(handleError);

if (dev) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // uncheck https cert
}

if (!module.parent) {
  app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`);
  });
}
