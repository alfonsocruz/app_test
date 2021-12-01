const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const passport = require("./modules/auth/passport-config");
const keys = require("./settings/key");
const apiRoutes = require("./routes/api");
const webRoutes = require("./routes/web");

app.set("key", keys.key);
app.use(express.json({ limit: "50mb" }));

app.use(cookieParse(process.env.JWT_KEY));
app.use(
  session({
    secret: process.env.JWT_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 360000
    }
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", __dirname + "/views/layouts/admin");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  const token = req.cookies.token;
  let user = {};
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      next();
    } else {
      user = decoded;
    }
  });
  res.locals.user = user;
  next();
});

app.use("/", webRoutes);
app.use("/api", apiRoutes);

/** 404 */
app.use((req, res, next) => {
  res.status(404).render("errors/404", { layout: false });
});

/** ERROR */
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  const status = error.code ? error.code : error.status ? error.status : 500;
  res.status(status);
  switch (status) {
    case 401:
      res.render("errors/401", { layout: false });
      break;
    case 403:
      res.render("errors/403", { layout: false });
      break;
    default:
      res.json(error);
      break;
  }
});

module.exports = app;
