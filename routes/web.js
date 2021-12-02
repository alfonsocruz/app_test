const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../settings/key");
const isAuthenticated = require("../middlewares/ProtectedWebRoute");
const isNotAuthenticated = require("../middlewares/UnprotectedWebRoute");
const router = express.Router();

router.use((req, res, next) => {
  const token = req.cookies.token;
  let user = {};
  jwt.verify(token, keys.key, (err, decoded) => {
    if (err) {
      next();
    } else {
      user = decoded;
    }
  });
  res.locals.user = user;
  res.locals.hasAccess = id => {
    if (!user) return false;
    return user.menus
      .map(item => {
        return item.access_id;
      })
      .includes(id);
  };
  next();
});

router.get("/login", [isNotAuthenticated], (req, res) => {
  res.render("login", { layout: "./layouts/public", title: "Login" });
});

router.get("/registro", [isNotAuthenticated], (req, res) => {
  res.render("register", { layout: "./layouts/public", title: "Registro" });
});

router.get("/", [isAuthenticated], (req, res) => {
  res.render("index", { title: "Inicio" });
});

router.get("/usuarios", [isAuthenticated], (req, res) => {
  res.render("users/index", { title: "Inicio" });
});

router.get("/agregar-usuarios", [isAuthenticated], (req, res) => {
  res.render("users/create", { title: "Inicio" });
});

module.exports = router;
