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

// to view all employess   
    function viewAllEmployees() {
        connection.query("SELECT * from employee", function (error, res) {
        console.table(res);
        promptmore();
        })
    }
//   to view all departments
    function viewAllDepartments() {
        connection.query("SELECT * from department", function (error, res) {
        console.table(res);
        promptmore();
        })
    }

//   to view all roles
    function viewAllRoles() {
        connection.query("SELECT * from role", function (error, res) {
        console.table(res);
        promptmore();
        })
    }


// ask if user wants to continue
  function promptmore() {
    confirm("Would you like to continue?")
    .then(function confirmed() {
      promptuser();
    }, function cancelled() {
      end();
    });
  }