const { isNullOrUndefined } = require("../utils/utilities");
class Response {
  successResponse({ response, message = "¡Éxito!" }) {
    return {
      success: true,
      results: true,
      status: 200,
      message,
      response
    };
  }

  errorResponse({ code, success = true, message, errors = {} }) {
    return {
      success: success,
      results: false,
      status: code,
      message,
      errors
    };
  }

  formatQueryResponse(response, operation = "SELECT", dbm = "mysql") {
    let success = false;
    let results = false;
    let data = [];
    if (dbm === "mssql") {
      success =
        !isNullOrUndefined(response.recordset) ||
        !isNullOrUndefined(response.rowsAffected);
      results = response.rowsAffected[0] > 0;
    } else if (dbm === "mysql") {
      success = response.success ? response.success : true;
      results = response.data.length > 0;
    }

    if (!success) {
      return { success, results: false, data };
    }

    switch (operation) {
      case "SELECT":
        if (dbm === "mssql") {
          data = results ? response.recordset : [];
        } else if (dbm === "mysql") {
          data = response.data;
        }
        break;

      case "FIRST":
        if (dbm === "mssql") {
          data = results ? response.recordset[0] : null;
        } else if (dbm === "mysql") {
          data = results ? response.data[0] : [];
        }
        break;

      case "COUNT":
        if (dbm === "mssql") {
          data = results ? response.recordset[0].Total : null;
        } else if (dbm === "mysql") {
          data = results ? response.data[0].Total : 0;
        }
        break;

      case "CREATE_GET_ID":
        if (dbm === "mssql") {
          data = results ? response.recordset[0].id : null;
        }
        break;

      case "INSERT":
        if (dbm === "mysql") {
          results = response.data.affectedRows > 0 ? true : false;
          data = results ? response.data.insertId : null;
        }
        break;
      case "UPDATE":
        if (dbm === "mysql") {
          results =
            response.data.changedRows !== undefined
              ? response.data.changedRows > 0
                ? true
                : false
              : false;
        }
        data = [];
        break;
      case "DELETE":
        if (dbm === "mysql") {
          results =
            response.data.affectedRows !== undefined
              ? response.data.affectedRows > 0
                ? true
                : false
              : false;
        }
        data = [];
        break;

      default:
        // data = results ? response.recordset : [];
        break;
    }

    return { success: success, results: results, data: data };
  }
}

module.exports = new Response();
