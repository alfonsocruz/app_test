const express = require("express");
const auth = require("../middlewares/ProtectedWebRoute");
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

router.get("/admin", [auth], (req, res) => {
  res.render("index", { title: "Inicio" });
});

module.exports = router;
