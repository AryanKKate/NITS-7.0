const express = require('express');
const router = express.Router();  
const loanController = require('../controllers/loanController');

router.post('/loan', loanController.setLoan);  
router.post('/bid', loanController.bid);      

module.exports = router;
