const mysql = require('mysql2');
// fazendo o node conectar com o mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'saboroso',
    password: '',
    multipleStatements: true
  });

  module.exports = connection;