import React, { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar";

// Sample loan data for the dashboard
const userLoans = [
  {
    id: 1,
    loanType: "Personal Loan",
    amount: 20000,
    timer: 24, // Timer in hours
    bids: [
      { name: "User1", roi: 5 },
      { name: "User2", roi: 6 },
    ],
  },
  {
    id: 2,
    loanType: "Business Loan",
    amount: 50000,
    timer: 12, // Timer in hours
    bids: [{ name: "User3", roi: 4 }],
  },
];

function Dashboard() {
  const [loanTimers, setLoanTimers] = useState(
    userLoans.map((loan) => loan.timer)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLoanTimers((prevTimers) =>
        prevTimers.map((timer) => (timer > 0 ? timer - 1 : 0))
      );
    }, 3600000); // 1 hour interval
    return () => clearInterval(interval);
  }, []);

  const handleContinue = (loanId) => {
    console.log("Loan continued with ID:", loanId);
    // Reset timer to user's selected value here
  };

  const handleWithdraw = (loanId) => {
    console.log("Loan withdrawn with ID:", loanId);
    // Logic for withdrawing the loan
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <div className="px-6 py-12">
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Your Loans
        </h1>
        <div className="space-y-6 mx-10">
          {userLoans.map((loan, index) => (
            <div key={loan.id} className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {loan.loanType}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Amount: ${loan.amount}
                  </p>
                  <p className="text-sm text-gray-400">
                    Remaining Time: {loanTimers[index]} hours
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleContinue(loan.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => handleWithdraw(loan.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-white">Bids:</h3>
                <ul className="space-y-2">
                  {loan.bids.map((bid, index) => (
                    <li key={index} className="text-gray-300">
                      <strong>{bid.name}:</strong> {bid.roi}% ROI
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
