/*
Fill in code to do GET, POST, PUT, DELETE for institutions table here.
*/

/*
routes file for getting bank accounts for user_id

user_id is sent through web URI
*/

const connection = require('./database');

const express = require('express');

router = express.Router();

router.get('/', (req, res) => {
    connection.query(
        `SELECT * FROM institutions`,
        (errors, results) => {
            if (errors) {
                res.status(400).send('Error occured while sending request.');
            } else {
                if (res.length == 0) {
                    res.status(404).send('Id not found.');
                }
                res.send(results);
            }
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