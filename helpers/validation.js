const Joi = require("joi");
const errorMessages = require("./error_messages");
const response = require("./response");

const validate = ({ data, rules }) => {
  const JoiSchema = Joi.object(rules)
    .options({ abortEarly: false })
    .error(errors => {
      errors.forEach(err => {
        err.message = errorMessages(err);
      });
      return errors;
    });

  return JoiSchema.validate(data);
};

const formatResponse = validationResult => {
  let res = {
    success: true,
    message: "Validado con éxito"
  };
  if (validationResult.error) {
    res = {
      success: false,
      error: response.errorResponse({
        code: 403,
        message: "Error en la validación",
        errors: validationResult.error.details
      })
    };
  }
  return res;
};

module.exports = { validate, formatResponse };
