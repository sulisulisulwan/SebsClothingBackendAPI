const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')})

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB
})

module.exports = connection.promise();