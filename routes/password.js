const connection = require('./database');
const validate = require('./validation');
const express = require('express');

router = express.Router()

router.put('/:userId', (req, res) => {
     const userId = req.params.userId;
     const oldPassword = req.body.oldPassword;
     const newPassword = req.body.newPassword;

     if (validate.isBlank(oldPassword)) {
          res.status(400).send({ message: 'Error! Old Password is blank.' }); return;
     }
     if (validate.isBlank(newPassword)) {
          res.status(400).send({ message: 'Error! New Password is blank.' }); return;
     }

     // check whether old password match the record in db
     connection.query(
          `SELECT user_id FROM users WHERE (user_id = ?) AND (password = ?)`,
          [userId, oldPassword],
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(400).send('Error ocurred while sending request.');
               } else {
                    if (results.length === 0) {
                         res.status(400).send({ message: 'Error! old password does not match record' });
                    } else {
                         // password match, so we can go ahead and update record in db
                         connection.query(
                              `UPDATE users SET password = ? WHERE user_id = ?`,
                              [newPassword, userId],
                              (errors, results) => {
                                   if (errors) {
                                        console.log(errors);
                                        res.status(400).send('Error ocurred while sending request.');
                                   } else {
                                        res.send('Password updated successfully')
                                   }
                              });
                    }
               }
          });
});

module.exports = router;