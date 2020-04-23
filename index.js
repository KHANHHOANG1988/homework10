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
    promptuser();
  });

// Prompt for user input 
function promptuser() {
    inquirer
      .prompt(
        {
          type: "list",
          message: "Welcome to Employee Tracker. What would you like to do?",
          name: "choices",
          choices: [
            {
              name: "View all employees",
              value: "viewEmployees"
            },
            {
              name: "View all employees by departments",
              value: "viewDepartments"
            },
            {
              name: "View all employees by roles",
              value: "viewRoles"
            },
            {
              name: "Add employee",
              value: "addEmployee"
            },            
            {
              name: "Add role",
              value: "addRole"
            },
            {
              name: "Add manager",
              value: "addManager"
              },
            {
              name: "Update epmloyee role",
              value: "updateRole"
            },
            
            {
              name: "Quit",
              value: "quit"
            }
          ]
        }).then(function (res) {
          // console.log(res);
        questions(res.choices)
      })
  }

//   swich case function
  function questions(option) {
    switch (option) {
      case "viewEmployees":
        viewAllEmployees();
        break;
      case "viewDepartments":
        viewAllDepartments();
        break;
      case "viewRoles":
        viewAllRoles();
        break;
      case "addEmployee":
        addEmployee();
        break;      
      case "addRole":
        addRole();
        break;
      case "addManager":
        addManager();
        break;
      case "updateRole":
        updateRole();
        break;      
      case "quit":
        end();
    }
  }
