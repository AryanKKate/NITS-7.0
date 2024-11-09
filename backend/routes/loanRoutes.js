const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

router.get("/", loanController.getLoan);
router.post("/", loanController.setLoan);
router.post("/bid", loanController.bid);
router.get('/:address', loanController.getUserLoans)
router.post('/approve', loanController.approveBid)
router.get('/approved/:address', loanController.getUserApprovedBids)

router.post("/bid_counts", loanController.bid_count);
router.post("/getAllPercentage", loanController.all_percentage);

module.exports = router;
