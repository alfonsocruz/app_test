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

      passport.authenticate("login", async (err, user, info) => {
        try {
          if (err || !user) {
            return next(
              response.errorResponse({
                code: 500,
                message: info.message,
                errors: err
              })
            );
          }
          if (!user) {
            return res.redirect("/login");
          }

          req.login(user, { session: true }, async err => {
            if (err) return next(err);

            const token = JWTClass.respondWithToken(user);
            user.token = token;
            res.cookie("token", token);
            return res.json(
              response.successResponse({
                message: `¡Bienvenido ${user.Nombre}!`,
                response: user
              })
            );
          });
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
      })(req, res, next);
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

      let result = await users.create(body);
      if (!result.success) {
        return next(
          response.errorResponse({
            code: 500,
            message: "Ocurrió un error, contacte al administrador",
            errors: "No se obtuvo respuesta por parte del servidor"
          })
        );
      }

      return res.json(
        response.successResponse({
          message: "Usuario creado con éxito",
          response: result.data
        })
      );
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
