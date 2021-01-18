/*
routes file for getting cpf accounts for user_id

user_id is sent through web URI
*/

const connection = require('./database');

const express = require('express');

router = express.Router();

router.get('/:userId', (req, res) => {
    connection.query(
        `SELECT account_id, institution_id, 'CPF' AS short_name, account_type, account_number, balance 
               FROM accounts
               WHERE (user_id = ${req.params.userId}) 
               AND (institution_id = 11)`,
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