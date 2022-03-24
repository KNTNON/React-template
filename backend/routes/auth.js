const express = require("express");
const router = express.Router();

const config = require("../config/appConfig");
const isAuthen = require("../utils/authenticated");

const controller = require("../controllers/auth");
const apiConfig = config.getServiceConfig("authAPI");

router.prefix = apiConfig.prefix;

router.post(apiConfig.function.signin, controller.login);

router.get(apiConfig.function.deleteAccount, isAuthen, controller.deleteAccount);
router.get(apiConfig.function.signout, isAuthen, controller.signout);

router.put(apiConfig.function.updatePassword, isAuthen, controller.updatePassword);
router.put(apiConfig.function.user, isAuthen, controller.update);

// Register flow
router.post(apiConfig.function.signup, controller.register);

// Verify token
router.post(apiConfig.function.verifyToken, isAuthen, controller.verifyToken);

module.exports = router;
