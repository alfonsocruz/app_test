const jwt = require("jsonwebtoken");
const key = require("../settings/key");

const webAuth = (req, res, next) => {
  console.log(req.headers)
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = webAuth;
