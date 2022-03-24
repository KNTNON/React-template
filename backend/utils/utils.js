const path = require("path");

const utils = {};

utils.getRootPath = () => {
  return path.dirname(require.main.filename || process.mainModule.filename);
};

utils.getRandomIntInclusive = (min, max) => {
  // The maximum is inclusive and the minimum is inclusive
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};

utils.trackError = (err, file, fnName) => {
  if (err) {
    !err.fnTrack && (err.fnTrack = []);
    !err.fileTrack && (err.fileTrack = []);
    err.fileTrack.push(file);
    err.fnTrack.push(fnName);
  }
};

utils.normalizeEmail = email => {
  if (!email) return null;
  let rawParts = email.split("@");
  let domain = rawParts.pop();
  let user = rawParts.join("@");
  let parts = [user, domain];
  parts[1] = parts[1].toLowerCase();

  // remove sub-address
  parts[0] = parts[0].split("+")[0];
  if (parts[1] === "gmail.com" || parts[1] === "googlemail.com") {
    // Gmail ignores the dots
    parts[0] = parts[0].replace(/\./g, "");
  }
  return parts.join("@");
};

utils.parseJson = value => {
  try {
    if (value instanceof Object) {
      return value;
    }
    return JSON.parse(value);
  } catch (ex) {
    return null;
  }
};

utils.stringIsNotNull = string => {
  try {
    if (
      string === null ||
      string === undefined ||
      string === "" ||
      string.trim() === ""
    ) {
      return false;
    }

    return true;
  } catch (ex) {
    return false;
  }
};

module.exports = utils;
