const connection = require('./database');

const express = require('express');
const { invalidEmail, isBlank } = require('./validation');

router = express.Router();

router.post('/', (req, res) => {
     const email = req.body.email;
     const password = req.body.password;

     if (isBlank(email)) {
          res.status(400).send({ message: 'Email is blank' });
          return;
     }
     if (isBlank(password)) {
          res.status(400).send({ message: 'Password is blank' });
          return;
     }
     if (invalidEmail(email)) {
          res.status(400).send({ message: 'Invalid Email format' });
          return;
     }

     connection.query(
          `SELECT user_id FROM users 
          WHERE email = ? AND password = ?`,
          [email, password],
          (errors, results) => {
               if (errors) {
                    res.status(400).send({ message: 'Error occured while sending request.' });
                    return;
               }
               if (results.length == 0) {
                    res.status(400).send({ message: 'Wrong email/password combination' });
                    return;
               }

               res.send(results[0]);
          }
     );

});

module.exports = router;