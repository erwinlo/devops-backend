/*
Fill in code to do GET, POST, PUT, DELETE for transactions table here.
*/

const connection = require('./database');

const express = require('express');

router = express.Router();

router.get('/:userId', (req, res) => {
     connection.query(
          `SELECT t.date, i.short_name, a.account_type, a.account_number, t.type, t.amount 
               FROM transactions AS t 
               LEFT JOIN accounts AS a 
               ON t.account_id = a.account_id 
               LEFT JOIN institutions AS i 
               ON a.institution_id = i.institution_id 
               WHERE (a.user_id = ${req.params.userId})
               ORDER BY t.date DESC`,
          (errors, results) => {
               if (errors) {
                    res.status(400).send('Error occured while sending request.'); return;
               }
               if (results.length == 0) {
                   res.status(404).send('Id not found.'); return;
               }
           
               res.send(results);
           }
     );

});

router.post('/:userId', (req, res) => {
     res.status(403).send('POST operation not supported.');
});

router.put('/:userId', (req, res) => {
     res.status(403).send('PUT operation not supported.');
});

router.delete('/:userId', (req, res) => {
     res.status(403).send('DELETE operation not supported.');
});

/*     routers for /     */
router.get('/', (req, res) => {
     res.status(400).send('Error! Id is blank.');
});

router.post('/', (req, res) => {
     res.status(403).send('POST operation not supported.');
});

router.put('/', (req, res) => {
     res.status(403).send('PUT operation not supported.');
});

router.delete('/', (req, res) => {
     res.status(403).send('DELETE operation not supported.');
});

module.exports = router;