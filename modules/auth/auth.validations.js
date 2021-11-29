const Joi = require("joi");
const validation = require("../../helpers/validation");

class AuthValidations {
  signInValidation(body) {
    const results = validation.validate({
      data: body,
      rules: {
        email: Joi.string()
          .required()
          .email()
          .label("Usuario"),
        password: Joi.string()
          .min(6)
          .required()
          .label("Contraseña")
      }
    });

    return validation.formatResponse(results);
  }

  signUpValidation(body) {
    const results = validation.validate({
      data: body,
      rules: {
        first_name: Joi.string()
          .required()
          .min(3)
          .label("Nombre"),
        last_name: Joi.string()
          .required()
          .min(2)
          .label("Apellidos"),
        email: Joi.string()
          .required()
          .email()
          .label("Usuario"),
        password: Joi.string()
          .min(6)
          .required()
          .label("Contraseña"),
        confirm: Joi.string()
          .required()
          .valid(Joi.ref("password"))
          .label("Confirmar contraseña")
      }
    });

    return validation.formatResponse(results);
  }
}

module.exports = new AuthValidations();
