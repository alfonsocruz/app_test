const moment = require("moment");
const DB = require('../../connections/dbconnection');
const mysql = require("../users/users.mysql");
const menuModel = require("../menus/menus.model");
const hash = require("../../helpers/hash");

class UserModel {
  async getMenusUser({ idUser, type }) {
    try {
      const output = await mysql.getMenusUser({ idUser, type });
      const menus = menuModel.mapMenus(output.data);
      return menus;
    } catch (error) {
      return [];
    }
  }

  async create(body) {
    delete body.confirm;
    let data = {...body,
      admin_type: 10,
      date_created : moment().unix(),
      password: await hash.Encrypt(body.password),
    }

    let elements = [mysql.createTransaction(data)];
    const result = DB.executeTransaction(elements);
    return result;
  }
}
module.exports = new UserModel();
