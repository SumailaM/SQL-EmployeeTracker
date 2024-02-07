const mysql = require('mysql');
const inquirer = require('inquirer');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'yourpassword',
  database: 'employee_db'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
  // Call function to start application
  startApp();
});

// Function to start the application
function startApp() {
    // Prompt user for actions
    inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role'
        ]
      }
    ]).then((answers) => {
      // Based on user selection, call appropriate function
      switch (answers.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
      }
    });
  }
  
  // Function to view all departments
  function viewAllDepartments() {
    // Query database to retrieve all departments
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      // Display department data
      console.table(res);
      // Restart application
      startApp();
    });
  }
  
  // Function to view all roles
  function viewAllRoles() {
    // Query database to retrieve all roles
    connection.query('SELECT * FROM roles', (err, res) => {
      if (err) throw err;
      // Display role data
      console.table(res);
      // Restart application
      startApp();
    });
  }
  
  // Function to view all employees
  function viewAllEmployees() {
    // Query database to retrieve all employees
    connection.query('SELECT * FROM employees', (err, res) => {
      if (err) throw err;
      // Display employee data
      console.table(res);
      // Restart application
      startApp();
    });
  }
  
  // Function to add a department
  function addDepartment() {
    // Prompt user to enter department details
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
      }
    ]).then((answers) => {
      // Insert new department into database
      connection.query('INSERT INTO departments SET ?', { name: answers.name }, (err, res) => {
        if (err) throw err;
        console.log('Department added successfully!');
        // Restart application
        startApp();
      });
    });
  }
  
  // Function to add a role
  function addRole() {
    // Prompt user to enter role details
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:'
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:'
      }
    ]).then((answers) => {
      // Insert new role into database
      connection.query('INSERT INTO roles SET ?', { title: answers.title, salary: answers.salary, department_id: answers.department_id }, (err, res) => {
        if (err) throw err;
        console.log('Role added successfully!');
        // Restart application
        startApp();
      });
    });
  }
  
  // Function to add an employee
  function addEmployee() {
    // Prompt user to enter employee details
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee:'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee:'
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID for the employee:'
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager ID for the employee:'
      }
    ]).then((answers) => {
      // Insert new employee into database
      connection.query('INSERT INTO employees SET ?', { first_name: answers.first_name, last_name: answers.last_name, role_id: answers.role_id, manager_id: answers.manager_id }, (err, res) => {
        if (err) throw err;
        console.log('Employee added successfully!');
        // Restart application
        startApp();
      });
    });
  }
  
  // Function to update an employee role
  function updateEmployeeRole() {
    // Query database to get employee list
    connection.query('SELECT * FROM employees', (err, employees) => {
      if (err) throw err;
      // Prompt user to select employee to update
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee to update:',
          choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))
        },
        {
          type: 'input',
          name: 'new_role_id',
          message: 'Enter the new role ID for the employee:'
        }
      ]).then((answers) => {
        // Update employee role in database
        connection.query('UPDATE employees SET ? WHERE ?', [{ role_id: answers.new_role_id }, { id: answers.employee_id }], (err, res) => {
          if (err) throw err;
          console.log('Employee role updated successfully!');
          // Restart application
          startApp();
        });
      });
    });
  }