require("dotenv").config();

const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connected to mysql database");
});

module.exports=pool;
