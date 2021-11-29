const Joi = require("joi");
const validation = require("../../helpers/validation");
const Validations = require("../../helpers/global_validations");

class MenusValidations extends Validations {
  constructor() {
    super();
  }

//   getAllValidation(body) {
//     const results = validation.validate({
//       data: body,
//       rules: {
//         filtered: Joi.array().optional(),
//         sorted: Joi.array().optional(),
//       }
//     });
//     return validation.formatResponse(results);
//   }
}

module.exports = new MenusValidations();