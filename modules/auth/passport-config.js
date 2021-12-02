const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const mysql = require("../users/users.mysql");
const JWTClass = require("../../helpers/jwt");

const authenticateUser = async (email, password, done) => {
  try {
    let queryResults = await mysql.findOne({ email: email });

    if (!queryResults.results) {
      return done(null, false, {
        message:
          "No se encontró una cuenta de usuario con las credenciales proporcionadas."
      });
    }
    let user = queryResults.data;
    const isValidPassword = await JWTClass.checkPassword(
      password,
      user.password
    );

    if (!isValidPassword) {
      return done(null, false, {
        message: "La contraseña no coincide, intente de nuevo."
      });
    }

    delete user.password;
    const menusResults = await mysql.getAccess(user.admin_id);
    user.menus = menusResults.results ? menusResults.data : [];
    return done(null, user, { message: "Login successfull" });
  } catch (e) {
    return done(e);
  }
};

passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    authenticateUser
  )
);

passport.serializeUser((user, done) => {
  done(null, user.admin_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let queryResults = await mysql.findOne({ id: id });
    if (queryResults.success && queryResults.results) {
      let user = queryResults.data;
      const menusResults = await mysql.getAccess(user.admin_id);
      user.menus = menusResults.results ? menusResults.data : [];
      done(null, user);
    }
  } catch (e) {
    done(e);
  }
});

module.exports = passport;
