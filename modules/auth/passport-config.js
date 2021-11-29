const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const mysql = require("../users/users.mysql");
const JWTClass = require("../../helpers/jwt");


const authenticateUser = async (email, password, done) => {
  try {
    let queryResults = await mysql.findOne({ email: email });

    if (!queryResults.results) {
      return done(null, false, { message: "No se encontró una cuenta de usuario con las credenciales proporcionadas." });
    }
    const user  = queryResults.data;
    const isValidPassword = await JWTClass.checkPassword(password, user.password);
    
    if (!isValidPassword) {
      return done(null, false, { message: "La contraseña no coincide, intente de nuevo." })
    }
    
    return done(null, user, { message: 'Login successfull' })
  } catch (e) {
    return done(e)
  }
};

passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    authenticateUser
  )
);

passport.use(new JWTStrategy({
    secretOrKey: process.env.JWT_KEY,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
}, async (token, done) => {
    try {
        return done(null, token)
    } catch (e) {
        done(error)
    }
}));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   let queryResults = mysql.findOne({ email: email });
//   // User.findById(id, function (err, user) {
//   //   done(err, user);
//   // });
//   if(!queryResults.results)
//     done(null, false)

//   done(null, queryResults.data);
// });

module.exports = passport;