const jwt = require("jsonwebtoken");
const key = require("../settings/key");
const verifyToken = (req, res, next) => {
  try {
    const isLoggedIn = req.body.token || req.query.token || req.headers["authorization"];
    if (!isLoggedIn) {
      next({
        code: 401,
        message: "¡Autenticacion incorrecta, favor de verificar la sesión!",
        success: true,
        results: false,
        user: [],
        error:
          "¡El token no fue enviado, tipo-header: authorization, tipo-autorizacion:  bearer token!"
      });
    }

    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, key.key, (err, decoded) => {
      if (err) {
        next({
          code: 401,
          message: "¡Autenticacion incorrecta, favor de renovar la sesión!",
          success: true,
          results: false,
          user: [],
          error: "¡El token ha caducado!"
        });
      } else {
        req.decoded = decoded;
        req.user = decoded;
      }
    });
  } catch (err) {
    next({
      code: 401,
      message: "¡Autenticacion incorrecta, favor de verificar la sesión!",
      success: false,
      results: false,
      user: [],
      error: "¡El token es invalido, no cumple con la estructura del jwt!"
    });
  }
  return next();
};

module.exports = verifyToken;
