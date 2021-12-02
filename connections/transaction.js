const mysqlcon = require("./dbconnection");

async function startTransaction() {
  return new Promise(async (resolve, reject) => {
    const pool = await mysqlcon.getConnection();
    pool.getConnection(async (err, connection) => {
      if (err) {
        reject({ success: false, error: err });
      } else {
        await connection.beginTransaction();
        resolve({
          success: true,
          transaction: connection
        });
      }
    });
  });
}
async function endTransaction(connection) {
  return new Promise((resolve, reject) => {
    connection.commit(function(err) {
      if (err) {
        connection.rollback(function() {
          connection.release();
        });
        reject({ success: false, error: err });
      } else {
        connection.release();
        resolve({ success: true });
      }
    });
  });
}
async function revertTransaction(connection) {
  connection.rollback(function() {
    connection.release();
  });
}

module.exports = {
  startTransaction,
  endTransaction,
  revertTransaction
};
