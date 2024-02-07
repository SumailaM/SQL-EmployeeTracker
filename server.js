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