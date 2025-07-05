const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '170898',
  database: 'iwt_project'
})

module.exports = pool.promise();