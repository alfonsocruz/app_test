const mysqlcon = require("../../connections/dbconnection");
const { formatQueryResponse } = require("../../helpers/response");
const queries = require("./users.queries");

class UserMySql {
  async findOne(param) {
    let parameters = [];
    let query = "";
    if(param.email){
      query = queries.findByEmail;
      parameters.push(param.email)
    }else if(param.id){
      query = queries.findByEmail;
      parameters.push(param.id)
    }
    
    let res = await mysqlcon.getConnectionWithData(query, parameters);
    return formatQueryResponse(res, "FIRST", "mysql");
  }

  async getMenusUser({ idUser, type }) {
    try {
      var query = queries.getMenus;
      let res = await mysqlcon.getConnectionWithData(query, [idUser, type]);
      return formatQueryResponse(res, "SELECT", "mysql");
    } catch (e) {
      console.log(e);
    }
  }

  createTransaction(body) {
    const query = queries.create;
    const parameters = [
      body.admin_type,
      body.first_name,
      body.last_name,
      body.email,
      body.password,
      body.date_created
    ];

    return { query, parameters };
  }
}

module.exports = new UserMySql();
