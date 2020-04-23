USE employees;
-- Department
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

-- Roles
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 55000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer Manager", 150000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant Manager", 160000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Manager", 250000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Wick", 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Tyson", 2, "John Wick");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Cena", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Bond", 4, "John Cena");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brian", "O'cornor", 5, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "May", 6, "Brian O'cornor");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeremy", "Clarkson", 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Richard", "Hammond", 8, "Jeremy Clarkson");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tim", "Allen", 2, "John Wick");
