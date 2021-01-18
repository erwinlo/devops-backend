const connection = require('./database');
const validate = require('./validation');
const express = require('express');

router = express.Router();

router.put('/:userId', (req, res) => {
     console.log('body:', req.body);
     
     const userId = req.params.userId;
     const mobile = req.body.mobile;

     if (validate.isBlank(mobile)) {
          res.status(400).send({ message: 'Error! Mobile number is blank.' }); 
          return;
     }
     if (validate.notNumber(mobile) || mobile.toString().length != 8) {
          res.status(400).send({ message: 'Error! Mobile number needs to be an 8-digit number.' });
          return;
     }

     connection.query(
          `UPDATE users SET mobile = ? WHERE user_id = ?`,
          [mobile, userId],
          (errors, results) => {
               if (errors) {
                    console.log(errors);
                    res.status(400).send({ message: 'Error ocurred while sending request.' });
               } else {
                    res.send({ message: 'Mobile number updated successfully' })
               }
          });
});

module.exports = router;