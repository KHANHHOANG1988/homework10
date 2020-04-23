var mysql = require("mysql");
const inquirer = require("inquirer");
const confirm = require('inquirer-confirm');

// MySQL DB Connection Information
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "khanh1988",
  database: "employees"
}); 
connection.connect(function(err) {
    if (err) throw err;
    connection.end();
  });
  