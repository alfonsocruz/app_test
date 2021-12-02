const jwt = require("jsonwebtoken");
const key = require("../settings/key");

const isNotAuthenticated = (req, res, next) => {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      jwt.verify(token, key.key, (err, decoded) => {
        if (err) {
          res.redirect("login");
        } else {
          req.user = decoded;
          res.redirect("/");
        }
      });
    } else {
      next();
    }
  } catch (e) {
    res.redirect("login");
  }
};

module.exports = isNotAuthenticated;
