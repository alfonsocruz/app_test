const mysqlcon = require("../../connections/dbconnection");
const { formatQueryResponse } = require("../../helpers/response");
const queries = require("./users.queries");

class UserMySql {
  async findOne(param) {
    let parameters = [];
    let query = "";
    if (param.email) {
      query = queries.findByEmail;
      parameters.push(param.email);
    } else if (param.id) {
      query = queries.findByID;
      parameters.push(param.id);
    }

    let res = await mysqlcon.getConnectionWithData(query, parameters);
    return formatQueryResponse(res, "FIRST", "mysql");
  }

  async signUp(connection, body) {
    try {
      const query = queries.create;
      const params = [
        body.admin_type,
        body.first_name,
        body.last_name,
        body.email,
        body.password,
        body.date_created
      ];
      let res = await mysqlcon.executeQuery(connection, query, params);
      return formatQueryResponse(res, "INSERT", "mysql");
    } catch (e) {
      return { success: false, error: e };
    }
  }

  async getAccess(id) {
    try {
      const query = queries.getAccess;
      let res = await mysqlcon.getConnectionWithData(query, [id]);
      return formatQueryResponse(res, "SELECT", "mysql");
    } catch (e) {
      return { success: false, error: e };
    }
  }

  async setAccess(connection, body) {
    try {
      const query = queries.setAccess;
      const params = [body.admin_id, body.admin_granter, body.access_id];
      let res = await mysqlcon.executeQuery(connection, query, params);
      return formatQueryResponse(res, "INSERT", "mysql");
    } catch (e) {
      return { success: false, error: e };
    }
  }
}

module.exports = new UserMySql();
