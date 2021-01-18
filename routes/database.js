const mysql = require('mysql');

// set parameters
parameters = {
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: 'password', 
     database: 'fullstack_db'
};

// define a connection object
connection = mysql.createConnection(parameters);

// invoke the connection
connection.connect((errors) => {
     if (errors) {
          console.log(errors);
     } else {
          console.log("Connection successful.");
     }
});

module.exports = connection;