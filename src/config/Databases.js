const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : process.env.DB_HOST || 'localhost',
  user     : process.env.DB_USER || 'root',
  password : process.env.DB_PASSWORD || '1sampai9',
  database : process.env.DB_NAME || 'sipeka',
  port     : process.env.DB_PORT || 3306
});

module.exports = connection