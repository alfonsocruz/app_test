const jwt = require("jsonwebtoken");
const key = require("../settings/key");

const webAuth = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      res.redirect("login");
    }
    const token = req.cookies.token;
    jwt.verify(token, key.key, (err, decoded) => {
      if (err) {
        res.redirect("login");
      } else {
        req.user = decoded;
        return next();
      }
    });
  } catch (e) {
    res.redirect("login");
  }
};

module.exports = webAuth;
