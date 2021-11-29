const Joi = require("joi");
const validation = require("./validation");

class Validations {
  constructor() {}

  getValidation(body) {
    const results = validation.validate({
      data: body,
      rules: {
        page: Joi.number().required(),
        pageSize: Joi.number().required(),
        filtered: Joi.array().optional(),
        sorted: Joi.array().optional(),
        export: Joi.boolean().optional()
      }
    });
    return validation.formatResponse(results);
  }

  getByIdValidation(body) {
    const results = validation.validate({
      data: body,
      rules: {
        id: Joi.number().required()
      }
    });
    return validation.formatResponse(results);
  }

  deleteValidation(body) {
    const results = validation.validate({
      data: body,
      rules: {
        id: Joi.number().required()
      }
    });
    return validation.formatResponse(results);
  }
}

module.exports = Validations;
