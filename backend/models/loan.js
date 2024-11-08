const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    loan: { type: Number, required: true },
    percentage: { type: Number, required: true },
    bidCount: { type: Number, required: true },
    buyDemand: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    returnOnLoan: { type: Number, required: true },
    totalLoanValue: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
