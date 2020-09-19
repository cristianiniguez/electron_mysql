require('dotenv').config()

const mysql = require('promise-mysql')

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME
})

function getConnection() {
  return connection
}

module.exports = { getConnection }