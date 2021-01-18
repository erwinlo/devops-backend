const mysql = require('mysql');

// set parameters
parameters = {
     host: '34.126.91.85',
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