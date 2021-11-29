const express = require('express');
const AuthController = require('./auth.controller');
const router = express.Router();

router.post("/sign-in", AuthController.signIn);
router.post("/sign-up", AuthController.signUp);
router.get("/logout", AuthController.logout);
router.post("/refreshToken", AuthController.refreshToken);

module.exports = router;