const passport = require("passport");
const JWTClass = require("../../helpers/jwt");
// const mysql = require("../users/users.mysql");
const response = require("../../helpers/response");
const validations = require("./auth.validations");
const users = require("../users/users.model");

class AuthController {
  async signIn(req, res, next) {
    try {
      const validationResult = validations.signInValidation(req.body);
      if (!validationResult.success) return next(validationResult.error);
      
      passport.authenticate('login', async (err, user, info) => {
        try{
          if (err || !user) {
            return next(
              response.errorResponse({
                code: 500,
                message: "",
                errors: err
              })
            );
          }
          if (!user) { return res.redirect('/login'); }
          
          req.login(user, { session: false }, async (err) => {
            if (err) return next(err)
            const token = JWTClass.respondWithToken(user);
            return res.json({ token })
          })

        }catch(err){
          console.log("Error => ", err)
          next(
            response.errorResponse({
              code: 500,
              message:
                "Hubo un error, intente de nuevo. Si el error persiste contacte al administrador.",
              errors: err
            })
          );
        }
      })(req, res, next)
    } catch (err) {
      next(
        response.errorResponse({
          code: 500,
          message:
            "Hubo un error, intente de nuevo. Si el error persiste contacte al administrador.",
          errors: err
        })
      );
    }
  }

  async signUp(req, res, next) {
    try {
      const { body, user } = req;
      const validationResult = validations.signUpValidation(body);
      if (!validationResult.success) return next(validationResult.error);

      let queryResults = await users.create(body);
      res.json(queryResults);
    } catch (err) {
      next(
        response.errorResponse({
          code: 500,
          message:
            "Hubo un error, intente de nuevo. Si el error persiste contacte al administrador.",
          errors: err
        })
      );
    }
  }

  async logout(req, res) {
    return res.json("API PARA PROGRAMAR EL LOGOUT");
  }

  async refreshToken(req, res) {
    return res.json("API PARA REFRESCAR EL TOKEN");
  }
}

module.exports = new AuthController();
