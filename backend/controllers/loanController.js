const Loan = require('../models/loan');

let buyDemand = 0;       
let bidCount = 0;
let loan = 0;          
let percentage = 0;

function generateUniqueBits() {
    return Math.random() * 100; 
}

function adjustPriceBasedOnDemandSupply(loan) {
    const demandEffect = buyDemand * 2;  
    const adjustedPrice = loan + demandEffect;
    return adjustedPrice;
}

exports.setLoan = (req, res) => {
    const { loan: userLoan, percentage: userPercentage } = req.body;
    loan = userLoan;  
    percentage = userPercentage;  
    res.json({
        message: `Loan and percentage values have been set.`,
        loan,
        percentage
    });
};

exports.bid = async (req, res) => {
    const uniqueBits = generateUniqueBits(); 
    buyDemand += uniqueBits;

    const updatedLoan = adjustPriceBasedOnDemandSupply(loan);
    const updatedPercentage = percentage - (uniqueBits / 100);
    const paidAmount = updatedPercentage - percentage;
    bidCount++;

    percentage = updatedPercentage;
    loan = updatedLoan;

    const returnOnLoan = loan * percentage / 100;
    const totalLoanValue = loan + returnOnLoan;

    const loanData = new Loan({
        loan,
        percentage: updatedPercentage,
        bidCount,
        buyDemand,
        paidAmount,
        returnOnLoan,
        totalLoanValue
    });

    try {
        const savedLoan = await loanData.save();
        res.json({
            message: `You have bought assets with unique bits factor of ${uniqueBits.toFixed(2)}.`,
            paidAmount: paidAmount.toFixed(2),
            currentPercentage: updatedPercentage.toFixed(2),
            returnOnLoan: returnOnLoan.toFixed(2),
            demand: buyDemand.toFixed(2),
            TotalLoanValue: totalLoanValue.toFixed(2),
            bidCount: bidCount,
            loan,
            savedLoan
        });
    } catch (err) {
        res.status(500).json({ message: "Error saving loan data", error: err });
    }
};
