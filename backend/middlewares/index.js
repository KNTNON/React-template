"use strict";

module.exports = function(app) {
  var config = require("../config/appConfig");
  var helmet = require("helmet");
  var session = require("express-session");
  var bodyParser = require("body-parser");
  var cookieParser = require("cookie-parser");
  var minifyHTML = require("express-minify-html");
  var compression = require("compression");
  var MemoryStore = require("memorystore")(session);
  var cors = require("cors");

  var maxAge = config.cookie.maxAge;

  var sessionOptions = {
    store: new MemoryStore({
      checkPeriod: maxAge
    }),
    secret: "ym3zIDlgU9syaL2avzAEu37inSnSsTvr",
    proxy: true,
    cookie: {
      maxAge: maxAge,
      secure: true,
      httpOnly: false
    },
    saveUninitialized: false,
    resave: false
  };

  var minifyHTMLOptions = {
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
      minifyCSS: true
    }
  };

  // Request body parsers
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );

  app.use(cors());

  // Cookie parser
  app.use(cookieParser()); // Parses the Cookie data for each request

  // Express-session
  app.use(session(sessionOptions));

  // Minify html
  app.use(minifyHTML(minifyHTMLOptions));

  // Helmet for web security
  app.use(
    helmet({
      nosniff: false
    })
  );

  app.disable("x-powered-by");

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [
          "'self'",
          "https://mainnet.infura.io",
          "https://ropsten.infura.io"
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://www.google.com",
          "https://www.gstatic.com",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com"
        ],
        frameSrc: ["'self'", "https://www.google.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: [
          "'self'",
          "https://www.google-analytics.com",
          "https://stats.g.doubleclick.net"
        ]
      }
    })
  );

  app.use(compression());
};
