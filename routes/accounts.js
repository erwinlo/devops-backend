/*
Fill in code to do GET, POST, PUT, DELETE for accounts table here.
user_id is sent through web URI
*/

const connection = require('./database');
const validate = require('./validation');

const express = require('express');

router = express.Router();

router.post('/:userId', (req, res) => {
    ac_number = req.body.ac_number;  insti_id = req.body.insti_id;  
    ac_type = req.body.ac_type;     balance = req.body.balance;

    console.log('body:', req.body);
       
    // validate the parameters
    if (validate.isBlank(insti_id)) {
        res.status(400).send("Error! Institution is blank"); return;
    }
    if (validate.isBlank(ac_number)) {
        res.status(400).send("Error! Account No is blank"); return;
    }
    if (validate.isWrong(ac_type)) {
        res.status(400).send("Error! Account type must be one of 'Savings', 'Current', 'Fixed Deposit', 'Investment'");
        return;
    } 
    if (validate.isBlank(balance) || validate.isNegative(balance)) {
        res.status(400).send("Error! Account balance cannot be blank or negative");
        return;
    }
    if (validate.notNumber(balance)) {
        res.status(400).send("Error! Account balance needs to be numeric without any special characters");
        return;
    } 

    connection.query(
        `INSERT into accounts 
        (institution_id, user_id, account_number, account_type, balance, creation_date, updated_time) 
        values (${req.body.insti_id}, ${req.params.userId}, '${req.body.ac_number}',
        '${req.body.ac_type}', ${req.body.balance}, NOW(), NOW())`,
        (errors, results) => {
            if (errors) {
                //res.status(400).send('Error occured while sending request.');
                res.send(errors);
            } else {
                res.send('Data added successfully');
            }
        }
    );
});


router.put('/:userId', (req, res) => {
     console.log('body:', req.body);

    ac_number = req.body.ac_number;  insti_id = req.body.insti_id;  
    ac_type = req.body.ac_type;     balance = req.body.balance; 
     
    // validate the parameters
    if (validate.isBlank(insti_id)) {
        res.status(400).send("Error! Institution is blank"); return;
    }
    if (validate.isBlank(ac_number)) {
        res.status(400).send("Error! Account No is blank"); return;
    }
    if (validate.isWrong(ac_type)) {
        res.status(400).send("Error! Account type must be one of 'Savings', 'Current', 'Fixed Deposit', 'Investment'");
        return;
    } 
    if (validate.isBlank(balance) || validate.isNegative(balance)) {
        res.status(400).send("Error! Account balance cannot be blank or negative");
        return;
    }
    if (validate.notNumber(balance)) {
        res.status(400).send("Error! Account balance needs to be numeric without any special characters");
        return;
    } 
    
    connection.query(
        `UPDATE accounts SET institution_id = ${req.body.insti_id}, account_number = '${req.body.ac_number}', 
        account_type = '${req.body.ac_type}', balance = ${req.body.balance}, updated_time = NOW()
        WHERE  user_id = ${req.params.userId} AND account_id = ${req.body.ac_id}`,
        (errors, results) => {
            if (errors) {
                res.status(400).send('Error occured while sending request.');
            } else {
                res.send('Data updated successfully');
            }
        }
    );
});


router.delete('/:userId', (req, res) => {
     console.log('body:', req.body);
     
    ac_id = req.body.ac_id;
    connection.query(
        `DELETE from accounts  WHERE user_id = ${req.params.userId} AND account_id = ${req.body.ac_id}`,
        (errors, results) => {
            if (errors) {
                res.status(400).send('Error occured while sending request.');  return; 
            } 
            if (results.affectedRows === 0) {
                res.status(404).send('Id not found.'); return;
            }
            res.send("You have successfully deleted Account ID " + ac_id);
        });

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