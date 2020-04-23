-- Design the following database schema containing three tables:
DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

-- department
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
);

-- role
CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL,
  );

-- employee
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL  PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id iNT NOT NULL,
  manager_id VARCHAR(30),
);