const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",   
  database: "growstudydb",
  port: 3306
});


db.connect(err => {
  if (err) {
    console.log("MySQL error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;
