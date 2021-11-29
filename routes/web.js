const express = require("express");
const auth = require("../middlewares/ProtectedWebRoute");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { layout: "./layouts/public", title: "Login" });
});

router.get("/registro", (req, res) => {
  res.render("register", { layout: "./layouts/public", title: "Registro" });
});

router.get("/", [auth], (req, res) => {
  res.render("index", { title: "Inicio" });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      message: "You did it!",
      user: req.user,
      token: req.query.token
    });
  }
);

module.exports = router;
