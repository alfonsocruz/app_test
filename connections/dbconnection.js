const mysql = require("mysql");
const { formatQueryResponse } = require("../helpers/response");

class DBConnection {
  getConnectionWithData(query, parameters = []) {
    try {
      return new Promise(function(resolve, reject) {
        let pool = DBGenerateConnection.getInstance();
        pool.getConnection(function(err, connection) {
          if (err) throw err;

          connection.query(query, parameters, function(error, results, fields) {
            connection.release();

            if (error) throw error;

            // resolve(JSON.parse(JSON.stringify(results)));
            resolve({
              success: true,
              data: JSON.parse(JSON.stringify(results))
            });
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  getConnection() {
    try {
      let conn = DBGenerateConnection.getInstance();
      return conn;
    } catch (error) {
      console.log(error);
    }
  }

  executeQuery(connection, query, parameters) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(query, parameters, function(error, results, fields) {
          if (error) {
            reject({ success: false, error });
          } else {
            resolve({
              success: true,
              data: JSON.parse(JSON.stringify(results))
            });
          }
        });
      } catch (error) {
        reject({ success: false, error });
      }
    });
  }

  executeTransaction(elements) {
    return new Promise((resolve, reject) => {
      const pool = DBGenerateConnection.getInstance();
      try {
        let result = [];
        pool.getConnection(function(err, connection) {
          console.log(err);
          connection.beginTransaction(function(err) {
            if (err) {
              console.log("Error 1: Transaction =>", err);
              connection.rollback(function() {
                connection.release();
              });
              reject({ success: false, error: err });
            } else {
              for (const element of elements) {
                let operation = element.query.trim().split(" ")[0];
                connection.query(element.query, element.parameters, function(
                  err,
                  results
                ) {
                  if (err) {
                    console.log("Error 2: Query =>", err);
                    connection.rollback(function() {
                      connection.release();
                    });
                    reject({ success: false, error: err });
                  } else {
                    let res = formatQueryResponse(
                      JSON.parse(JSON.stringify(results)),
                      element.operation ? element.operation : operation,
                      "mysql"
                    );
                    result.push(res);
                  }
                });
              }

              connection.commit(function(err) {
                if (err) {
                  connection.rollback(function() {
                    connection.release();
                  });
                  console.log("Error 3: Error Commit =>", err);
                } else {
                  connection.release();
                  resolve({ success: true, result });
                }
              });
            }
          });
        });
      } catch (err) {
        console.log("Error General => ", err);
        reject({ success: false, error: err });
      }
    });
  }
}

class DBGenerateConnection {
  static Singleton;
  static getInstance() {
    if (!this.Singleton) {
      const {
        DB_USER_MYSQL,
        DB_PASSWORD_MYSQL,
        DB_HOST_MYSQL,
        DB_DATABASE_MYSQL,
        DB_PORT_MYSQL
      } = process.env;

      let conn = mysql.createPool({
        connectionLimit: 10,
        user: DB_USER_MYSQL,
        password: DB_PASSWORD_MYSQL,
        host: DB_HOST_MYSQL,
        database: DB_DATABASE_MYSQL,
        port: parseInt(DB_PORT_MYSQL, 10),
        timezone: "UTC"
      });

      this.Singleton = conn;
    }
    return this.Singleton;
  }
}

module.exports = new DBConnection();
