const express = require("express");
const AuthController = require("./auth.controller");
const router = express.Router();

router.post("/sign-in", AuthController.signIn);
router.post("/sign-up", AuthController.signUp);
router.post("/logout", AuthController.logout);

module.exports = router;
