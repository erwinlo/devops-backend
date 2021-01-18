/*
Fill in code to do GET, POST, PUT, DELETE for users table here.
*/

const connection = require('./database');
const { isBlank, invalidEmail } = require('./validation');
const express = require('express');

router = express.Router();

router.get('/:userId', (req, res) => {
     connection.query(
          `SELECT name, email, mobile
             FROM users 
             WHERE (user_id = ${req.params.userId})`,
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(500).send('Error ocurred while querying'); return;
               }
               if (results.length == 0) {
                    res.status(404).send('Id not found.'); return;
               }

               res.send(results);
          }
     );
});

router.post('/', (req, res) => {
     console.log('body:', req.body);

     const name = req.body.name;
     const email = req.body.email;
     const mobile = req.body.mobile;
     const password = req.body.password;

     if (isBlank(name)) {
          res.status(400).send({ message: 'Error! Name is blank.' });
          return;
     }
     if (isBlank(email)) {
          res.status(400).send({ message: 'Error! Email is blank.' });
          return;
     }
     if (invalidEmail(email)) {
          res.status(400).send({ message: 'Error! Invalid Email format.' });
          return;
     }
     if (isBlank(mobile)) {
          res.status(400).send({ message: 'Error! Mobile Number is blank.' });
          return;
     }
     if (isBlank(password)) {
          res.status(400).send({ message: 'Error! Password is blank.' });
          return;
     }

     connection.query(
          `INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)`,
          [name, email, mobile, password],
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(500).send({ message: 'Error ocurred while querying' });
               } else {
                    res.send({ message: 'User saved successfully' });
               }
          }
     );

});


router.delete('/:userid', (req, res) => {
     console.log('body:', req.body);
     
     connection.query(
          `delete from users where user_id = '${req.params.userId}'`,
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(500).send({ message: 'Error ocurred while querying' });
               } else {
                    res.send({ message: 'User deleted successfully' });
               }
          }
     );
}
);

module.exports = router;