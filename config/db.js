require("dotenv").config();

const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  database: process.env.MYSQL_ADDON_DB,
  password: process.env.MYSQL_ADDON_PASSWORD,
  port: process.env.MYSQL_ADDON_PORT || 3306, 
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected to mysql database");
});

module.exports=pool;
