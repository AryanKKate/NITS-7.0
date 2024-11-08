import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../Components/Navbar";

const loanRequests = [
  {
    id: 1,
    loanType: "Personal Loan",
    amount: 20000,
    bids: [
      { name: "User1", roi: 5 },
      { name: "User2", roi: 6 },
    ],
    timer: 24,
  },
  {
    id: 2,
    loanType: "Business Loan",
    amount: 50000,
    bids: [{ name: "User3", roi: 4 }],
    timer: 12,
  },
];

const BiddingPage = () => {
  const [filteredLoans, setFilteredLoans] = useState(loanRequests);
  const [loanTypeFilter, setLoanTypeFilter] = useState("All");
  const [amountFilter, setAmountFilter] = useState("");
  const [roiBid, setRoiBid] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [userBids, setUserBids] = useState({});
  const [loanTimers, setLoanTimers] = useState(
    loanRequests.map((loan) => loan.timer)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLoanTimers((prevTimers) =>
        prevTimers.map((timer) => (timer > 0 ? timer - 1 : 0))
      );
    }, 3600000); // 1 hour interval
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    let filtered = loanRequests;

    if (loanTypeFilter !== "All") {
      filtered = filtered.filter((loan) => loan.loanType === loanTypeFilter);
    }

    if (amountFilter) {
      filtered = filtered.filter(
        (loan) => loan.amount <= parseInt(amountFilter)
      );
    }

    setFilteredLoans(filtered);
  };

  const handleSubmitBid = (loanId) => {
    const currentUser = "CurrentUser";
    const newRoi = parseFloat(roiBid);

    const newLoanRequests = loanRequests.map((loan) => {
      if (loan.id === loanId) {
        const existingBidIndex = loan.bids.findIndex(
          (bid) => bid.name === currentUser
        );
        if (existingBidIndex > -1) {
          loan.bids[existingBidIndex].roi = newRoi;
        } else {
          loan.bids.push({ name: currentUser, roi: newRoi });
        }
      }
      return loan;
    });

    setRoiBid("");
    setSelectedLoan(null);
    setUserBids((prev) => ({
      ...prev,
      [loanId]: newRoi,
    }));
  };

  return (
    <div className="bg-gray-900">
      <Navbar />

      <div className="bg-gray-900 min-h-screen p-8">
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Loan Bidding
        </h1>
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Max Amount"
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 text-gray-900"
            />
            <select
              onChange={(e) => setLoanTypeFilter(e.target.value)}
              value={loanTypeFilter}
              className="px-4 py-2 rounded-lg border-2 text-gray-900"
            >
              <option value="All">All Loans</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Student Loan">Student Loan</option>
            </select>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {filteredLoans.map((loan) => (
            <motion.div
              key={loan.id}
              className="bg-gray-700 text-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold">{loan.loanType}</h3>
              <p className="mt-2 text-lg">Amount: ${loan.amount}</p>

              <button
                onClick={() => setSelectedLoan(loan)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                View/Place Bid
              </button>
            </motion.div>
          ))}
        </div>

        {selectedLoan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-1/2">
              <h3 className="text-2xl font-semibold">
                {selectedLoan.loanType} Details
              </h3>
              <p className="mt-2">Amount: ${selectedLoan.amount}</p>
              <p className="mt-2">
                Time Left:{" "}
                {
                  loanTimers[
                    loanRequests.findIndex(
                      (loan) => loan.id === selectedLoan.id
                    )
                  ]
                }{" "}
                hours
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">Bids:</h4>
                {selectedLoan.bids.length > 0 ? (
                  selectedLoan.bids.map((bid, index) => (
                    <div key={index} className="mt-2">
                      <p>
                        <span className="font-bold">{bid.name}</span>: {bid.roi}
                        % ROI
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No bids yet.</p>
                )}
              </div>
              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Enter ROI"
                  value={roiBid}
                  onChange={(e) => setRoiBid(e.target.value)}
                  className="w-full text-black p-2 rounded-lg border border-gray-300"
                />
                <button
                  onClick={() => handleSubmitBid(selectedLoan.id)}
                  className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit/Update Bid
                </button>
              </div>
              <button
                onClick={() => setSelectedLoan(null)}
                className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiddingPage;
