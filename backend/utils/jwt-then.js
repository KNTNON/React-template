"use strict";
const jwt = require("jsonwebtoken");
const crypto = require("crypto-promise");
const config = require("../config/appConfig");
const utils = require("./utils");

exports._jwt = jwt;

exports.sign = (payload, key, opts) => {
  const newOpts = opts || {};
  return new Promise((resolve, reject) => {
    jwt.sign(payload, key, newOpts, (err, token) => {
      if (err || !token) return reject(err);
      resolve(token);
    });
  });
};

exports.verify = (token, key, opts) => {
  const newOpts = opts || {};
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, newOpts, (err, verified) => {
      if (err) return reject(err);
      resolve(verified);
    });
  });
};

exports.genTicket = async (data, opts) => {
  const newData = data || {};
  const newOpts = opts || {};
  let randLength = utils.getRandomIntInclusive(1, 4);
  let rand = await crypto.randomBytes(36 - randLength);
  let jwtId = rand.toString("hex");
  let token = await this.sign(
    {
      ...newData,
      jwi: jwtId
    },
    config.jsonWebToken.secret,
    newOpts
  );
  return token;
};

exports.getTokenWithReq = async req => {
  let token =
    req.headers["x-access-token"] || req.headers["authorization"] || null; // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  return token;
};