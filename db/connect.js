var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "my-secret-pw",
  database: 'mysql',
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});