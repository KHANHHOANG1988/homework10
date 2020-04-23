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
connection.connect(function (err) {
    if (err) throw err;
    promptuser();
});

// Prompt for user input 
function promptuser() {
    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do?",
                name: "choices",
                choices: [
                    "View all employees",
                    "View all employees by departments",
                    "View all employees by roles",
                    "Add employee",
                    "Add role",
                    "Add manager",
                    "Update epmloyee role",
                    "Quit",]
                    
                //     {
                //         name: "View all employees",
                //         value: "viewEmployees"
                //     },
                //     {
                //         name: "View all employees by departments",
                //         value: "viewDepartments"
                //     },
                //     {
                //         name: "View all employees by roles",
                //         value: "viewRoles"
                //     },
                //     {
                //         name: "Add employee",
                //         value: "addEmployee"
                //     },
                //     {
                //         name: "Add role",
                //         value: "addRole"
                //     },
                //     {
                //         name: "Add manager",
                //         value: "addManager"
                //     },
                //     {
                //         name: "Update epmloyee role",
                //         value: "updateRole"
                //     },
                //     {
                //         name: "Quit",
                //         value: "quit"
                //     }
                // ]
            }).then(function (res) {
                console.log(res);
                switch (res.choices) {
                    case "View all employees":
                        viewAllEmployees();
                        break;
                    case "View all employees by departments":
                        viewAllDepartments();
                        break;
                    case "View all employees by roles":
                        viewAllRoles();
                        break;
                    case "add Employee":
                        promptEmployee();
                        break;
                    case "add Role":
                        promptRole();
                        break;
                    case "add Manager":
                        promptManager();
                        break;
                    case "Update epmloyee role":
                        promptUpdateRole();
                        break;
                }
            })
        }

// //   swich case function
// function questions(option) {
//     switch (option) {
//         case "viewEmployees":
//             viewAllEmployees();
//             break;
//         case "viewDepartments":
//             viewAllDepartments();
//             break;
//         case "viewRoles":
//             viewAllRoles();
//             break;
//         case "addEmployee":
//             promptEmployee();
//             break;
//         case "addRole":
//             promptRole();
//             break;
//         case "addManager":
//             promptManager();
//             break;
//         case "updateRole":
//             promptUpdateRole();
//             break;
//         case "quit":
//             connection.end();
//     }
// }

// to view all employess   
function viewAllEmployees() {
    connection.query("SELECT * from employee", function (err, res) {
        console.table(res);
        promptmore();
    })
}
//   to view all departments
function viewAllDepartments() {
    connection.query("SELECT * from department", function (err, res) {
        console.table(res);
        promptmore();
    })
}

//   to view all roles
function viewAllRoles() {
    connection.query("SELECT * from role", function (err, res) {
        console.table(res);
        promptmore();
    })
}

// collect a list of role
var RoleList
connection.query("SELECT * from role", function (err, res) {
    RoleList = res.map(role => ({ name: role.title }))
})

// collect a list of managers's name
var ManagersList
connection.query("SELECT * from employee WHERE role_id IN (1, 3, 5, 7)", function (err, res) {
    ManagersList = res.map(employee => ({ name: `${employee.first_name} ${employee.last_name}` }))
})

// collect a list of department
var Departmentslist
connection.query("SELECT * from department", function (err, res) {
    Departmentslist = res.map(department => ({ name: department.name }))
})

//   collect all employees' name
var EmployeesList
connection.query("SELECT * from employee", function (err, res) {
    EmployeesList = res.map(employee => ({ name: `${employee.first_name} ${employee.last_name}` }))
})

// prompt for employee info
function promptEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the first name?",
                name: "firstName",
            },
            {
                type: "input",
                message: "What is the last name?",
                name: "lastName",
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: RoleList
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: ManagersList
            }
        ]).then(function (response) {
            addEmployee(response)
        })
}
// add new employee
function addEmployee(data) {

    connection.query("INSERT INTO employee SET ?",
        {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.title,
            manager_id: data.manager
        }, function (error, res) {
            if (error) throw error;
        })
    promptmore();
}

// prompt for more role info
function promptRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the new employee role?",
                name: "title"
            },
            {
                type: "input",
                message: "How much is the salary of the new role?",
                name: "salary"
            },
            {
                type: "list",
                message: "In which department is the new role?",
                name: "id",
                choices: Departmentslist
            }
        ])
        .then(function (response) {
            addRole(response);
        })
}

//   add new role
function addRole(data) {
    connection.query("INSERT INTO role SET ?", {
        title: data.title,
        salary: data.salary,
        department_id: data.id
    }, function (error, res) {
        if (error) throw error;
    });
    promptmore();
}

// prompt for new employee's info
function promptUpdateRole() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "For which employee would you like to update the role?",
                name: "empID",
                choices: EmployeesList
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "titleID",
                choices: RoleList
            }
        ])
        .then(function (response) {
            updateRole(response);
        })
}

//   update employee role
function updateRole(data) {
    connection.query(`UPDATE employee SET role_id = ${data.titleID} WHERE id = ${data.empID}`,
        function (error, res) {
            if (error) throw error;
        });
    promptmore();
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