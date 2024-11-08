const express = require('express');

const app = express();

let buyDemand = 0;       
let bidCount = 0;
let loan = 0;          
let percentage = 0;    

app.use(express.json());

function generateUniqueBits() {
    return Math.random() * 100; 
}

function adjustPriceBasedOnDemandSupply(loan) {
    const demandEffect = buyDemand * 2;  
    const adjustedPrice = loan + demandEffect;
    return adjustedPrice;
}

app.post("/loan", (req, res) => {
    const { loan: userLoan, percentage: userPercentage } = req.body;
    loan = userLoan;  // Store the user-provided loan
    percentage = userPercentage;  // Store the user-provided percentage
    res.json({
        message: `Loan and percentage values have been set.`,
        loan,
        percentage
    });
});

app.post("/bid", (req, res) => {
    const uniqueBits = generateUniqueBits(); 
    buyDemand += uniqueBits;

    const updatedLoan = adjustPriceBasedOnDemandSupply(loan);
    const updatedPercentage = percentage - (uniqueBits / 100);
    const paidAmount = updatedPercentage - percentage;
    bidCount++;

    percentage = updatedPercentage;
    loan = updatedLoan;

    const returnOnLoan = loan * percentage / 100;
    const TotalLoanValue = loan + returnOnLoan;

    res.json({
        message: `You have bought assets with unique bits factor of ${uniqueBits.toFixed(2)}.`,
        paidAmount: paidAmount.toFixed(2),
        currentPercentage: updatedPercentage.toFixed(2),
        returnOnLoan: returnOnLoan.toFixed(2),
        demand: buyDemand.toFixed(2),
        TotalLoanValue: TotalLoanValue.toFixed(2),
        bidCount: bidCount,
        loan,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
