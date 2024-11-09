const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/', loanController.setLoan); 
router.get('/', loanController.getLoan)
router.get('/:address', loanController.getUserLoans)
router.post('/bid', loanController.bid);
router.post('/approve', loanController.approveBid)
router.get('/approved/:address', loanController.getUserApprovedBids)

router.post("/bid_counts",loanController.bid_count )

module.exports = router;
