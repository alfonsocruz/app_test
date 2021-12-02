const moment = require("moment");
const {
  startTransaction,
  revertTransaction,
  endTransaction
} = require("../../connections/transaction");
const mysql = require("../users/users.mysql");
const hash = require("../../helpers/hash");

class UserModel {
  async signUp(body) {
    try {
      delete body.confirm;
      let data = {
        ...body,
        admin_type: 12,
        date_created: moment().unix(),
        email: body.email.toLowerCase(),
        password: await hash.Encrypt(body.password)
      };

      const exists = await mysql.findOne({ email: data.email });
      if (exists.success && exists.results) {
        if (exists.data) {
          return {
            succes: false,
            error:
              "Ya existe una cuenta de usuario con el correo electrónico proporcionado"
          };
        }
      }

      const dbResponse = await startTransaction();

      if (!dbResponse.success) {
        return {
          succes: false,
          error: "Ocurrió un error, contacte al administrador."
        };
      }

      const transaction = await dbResponse.transaction;

      const signUpResults = await mysql.signUp(transaction, data);

      if (!signUpResults.success) {
        await revertTransaction(transaction);
        return { success: false, error: "Error al crear usuario" };
      }

      let accessData = {
        admin_id: signUpResults.data,
        admin_granter: 1,
        access_id: [1, 6, 7, 8]
      };

      const accessResults = await mysql.setAccess(transaction, accessData);

      if (!accessResults.success) {
        await revertTransaction(transaction);
        return { succes: false, error: "Error al registar los accesos" };
      }

      await endTransaction(transaction);

      return { success: true, data: {} };
    } catch (e) {
      return { success: false, error: e };
    }
  }
}
module.exports = new UserModel();
