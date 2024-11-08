import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../Components/Navbar";

// Sample Loan Requests with 3 types
const loanRequests = [
  {
    id: 1,
    loanType: "Personal Loan",
    amount: 20000,
    bids: [
      { name: "User1", roi: 5 },
      { name: "User2", roi: 6 },
    ],
    timer: 24, // Timer in hours
  },
  {
    id: 2,
    loanType: "Business Loan",
    amount: 50000,
    bids: [{ name: "User3", roi: 4 }],
    timer: 12,
  },
  // Add other loan objects here...
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

  // Handle countdown timer for each loan
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

    // Filter by loan type
    if (loanTypeFilter !== "All") {
      filtered = filtered.filter((loan) => loan.loanType === loanTypeFilter);
    }

    // Filter by amount (only if the amount filter is provided)
    if (amountFilter) {
      filtered = filtered.filter(
        (loan) => loan.amount <= parseInt(amountFilter)
      );
    }

    setFilteredLoans(filtered);
  };

  // Handle bid submission or update
  const handleSubmitBid = (loanId) => {
    const currentUser = "CurrentUser"; // Replace with actual user ID from authentication
    const newRoi = parseFloat(roiBid);

    // Update bid if user already has one
    const newLoanRequests = loanRequests.map((loan) => {
      if (loan.id === loanId) {
        const existingBidIndex = loan.bids.findIndex(
          (bid) => bid.name === currentUser
        );
        if (existingBidIndex > -1) {
          // Update existing bid
          loan.bids[existingBidIndex].roi = newRoi;
        } else {
          // Add new bid
          loan.bids.push({ name: currentUser, roi: newRoi });
        }
      }
      return loan;
    });

    console.log("Updated Loan Requests:", newLoanRequests);
    setRoiBid("");
    setSelectedLoan(null);
    setUserBids((prev) => ({
      ...prev,
      [loanId]: newRoi,
    }));
  };

  return (
    <div className="bg-gray-800">
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-800 min-h-screen p-8">
        {/* Search Bar */}
        <h1 className="text-4xl font-semibold text-center text-white mb-8">
          Loan Bidding
        </h1>
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            {/* Amount Filter */}
            <input
              type="number"
              placeholder="Max Amount"
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 text-gray-900"
            />
            {/* Loan Type Filter */}
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
        {/* Loan Requests */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {filteredLoans.map((loan, index) => (
            <motion.div
              key={loan.id}
              className="bg-gray-700 text-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold">{loan.loanType}</h3>
              <p className="mt-2 text-lg">Amount: ${loan.amount}</p>
              <p className="mt-2 text-sm">
                Time Left: {loanTimers[index]} hours
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">Bids:</h4>
                {loan.bids.length > 0 ? (
                  loan.bids.map((bid, index) => (
                    <div key={index} className="mt-2">
                      <p>
                        <span className="font-bold">{bid.name}</span>: {bid.roi}{" "}
                        % ROI
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No bids yet.</p>
                )}
              </div>

              {/* Button for Viewing and Placing a Bid */}
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => setSelectedLoan(loan.id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  View/Place Bid
                </button>

                {selectedLoan === loan.id && (
                  <div className="mt-4">
                    <input
                      type="number"
                      placeholder="Enter ROI"
                      value={roiBid}
                      onChange={(e) => setRoiBid(e.target.value)}
                      className="w-full text-black p-2 rounded-lg border border-gray-300"
                    />
                    <button
                      onClick={() => handleSubmitBid(loan.id)}
                      className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Submit/Update Bid
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;
