const csvtojson = require('csvtojson');
const mysql = require("mysql2");

// connect to the database
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'mysql',
});

con.connect((err) => {
    if (err) return console.error('error: ' + err.message);

    con.query("DROP DATABASE IF EXISTS products_db");

    con.query("CREATE DATABASE products_db");
    con.query("USE products_db");
  
    con.query("DROP TABLE IF EXISTS products", 
        (err, drop) => {
  
        // Query to create table "products"
        var createStatament = 
        "CREATE TABLE products(Product_Name char(50), " +
        "Product_Description char(50), Original_Price int, Selling_Price int)"
  
        // Creating table "products"
        con.query(createStatament, (err, drop) => {
            if (err) {
              console.log("ERROR: ", err);
            } else {
              console.log("No error");
            }
        });
    });
});
  
// CSV file name
const fileName = "products.csv";
  
csvtojson().fromFile(fileName).then(source => {
    const insertStatement = "INSERT INTO products (Product_Name, Product_Description, Original_Price, Selling_Price) VALUES ?";
    const items = source.map(i => [
      i.product_name,
      i.product_description,
      Number(i.original_price),
      Number(i.selling_price) ]);

  		console.log(items);
      con.query(insertStatement, [items], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
      });
    
});