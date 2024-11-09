const Loan = require('../models/loan');
const moment = require('moment');

function generateUniqueBits() {
    return Math.random() * 100;
}

function adjustPriceBasedOnDemandSupply(loan, buyDemand) {
    const demandEffect = buyDemand * 2;
    const adjustedPrice = loan + demandEffect;
    return adjustedPrice;
}

exports.bid_count = async (req, res) => {
    try {
        const { loanId } = req.body;
        
        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        
        const bidCount = loan.bidCount;
        res.json({
            message: 'Bid count retrieved successfully.',
            bidCount: bidCount
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching bid count", error: error });
    }
};

exports.setLoan = async (req, res) => {
    console.log("calling")
    try {
        console.log(req.body)
        const { address, userLoan, userPercentage, loanIndex } = req.body;

        const newLoan = new Loan({
            address:address,
            loan: userLoan,
            percentage: userPercentage,
            bidCount: 0,
            buyDemand: 0,
            paidAmount: 0,
            returnOnLoan: 0,
            totalLoanValue: userLoan,
            bids: [],
            loanIndex: loanIndex
        });

        await newLoan.save();
        res.json({
            message: 'Loan has been created successfully.',
            loan: newLoan
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating loan", error: err });
    }
};

exports.getLoan=async(req, res) =>{
    const loans=await Loan.find({})
    res.json(loans)
}

exports.bid = async (req, res) => {
    try {
        const { loanId, bidBy } = req.body;
        const uniqueBits = generateUniqueBits();
        
        const bidOpenAt = moment().toDate();
        const bidCloseAt = moment().add(30, 'minutes').toDate();
        const loan = await Loan.findById(loanId);
        
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        const updatedLoan = adjustPriceBasedOnDemandSupply(loan.loan, loan.buyDemand + uniqueBits);
        
        const updatedPercentage = loan.percentage - (uniqueBits / 100);
        const paidAmount = updatedPercentage - loan.percentage;
        const returnOnLoan = updatedLoan * updatedPercentage / 100;
        const totalLoanValue = updatedLoan + returnOnLoan;

        const newBid = {
            bidBy,
            uniqueBits,
            paidAmount,
            returnOnLoan,
            bidOpenAt,
            bidCloseAt,
            bidAt: moment().toDate(),
            status: 'open',
        };

        loan.bids.push(newBid);
        loan.buyDemand += uniqueBits;
        loan.bidCount++;
        loan.loan = updatedLoan;
        loan.percentage = updatedPercentage;
        loan.paidAmount = paidAmount;
        loan.returnOnLoan = returnOnLoan;
        loan.totalLoanValue = totalLoanValue;

        const savedLoan = await loan.save();

        res.json({
            message: `Bid placed successfully with unique bits factor of ${uniqueBits.toFixed(2)}.`,
            paidAmount: paidAmount.toFixed(2),
            currentPercentage: updatedPercentage.toFixed(2),
            returnOnLoan: returnOnLoan.toFixed(2),
            demand: loan.buyDemand.toFixed(2),
            totalLoanValue: totalLoanValue.toFixed(2),
            bidCount: loan.bidCount,
            loan: savedLoan
        });
    } catch (err) {
        res.status(500).json({ message: "Error placing bid", error: err });
    }
};
