const express = require("express");
const auth = require("../modules/auth/auth.routes");

var router = express.Router();

router.use("/auth", auth);

module.exports = router;
