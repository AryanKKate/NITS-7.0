const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.get('/', loanController.getLoan)
router.post('/', loanController.setLoan); 
router.post('/bid', loanController.bid);

router.post("/bid_counts",loanController.bid_count )

module.exports = router;
