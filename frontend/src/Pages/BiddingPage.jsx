import React, { useState } from "react";
import { motion } from "framer-motion";

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
  },
  {
    id: 2,
    loanType: "Business Loan",
    amount: 50000,
    bids: [{ name: "User3", roi: 4 }],
  },
  {
    id: 3,
    loanType: "Student Loan",
    amount: 15000,
    bids: [
      { name: "User4", roi: 5.2 },
      { name: "User5", roi: 6 },
    ],
  },
  {
    id: 4,
    loanType: "Personal Loan",
    amount: 25000,
    bids: [
      { name: "User6", roi: 5.7 },
      { name: "User7", roi: 6.3 },
    ],
  },
  {
    id: 5,
    loanType: "Business Loan",
    amount: 100000,
    bids: [
      { name: "User8", roi: 4.5 },
      { name: "User9", roi: 5 },
    ],
  },
  {
    id: 6,
    loanType: "Student Loan",
    amount: 20000,
    bids: [
      { name: "User10", roi: 3.8 },
      { name: "User11", roi: 4.2 },
    ],
  },
  {
    id: 7,
    loanType: "Personal Loan",
    amount: 12000,
    bids: [
      { name: "User12", roi: 6 },
      { name: "User13", roi: 6.5 },
    ],
  },
  {
    id: 8,
    loanType: "Business Loan",
    amount: 40000,
    bids: [
      { name: "User14", roi: 5.5 },
      { name: "User15", roi: 5.8 },
    ],
  },
  {
    id: 9,
    loanType: "Student Loan",
    amount: 30000,
    bids: [
      { name: "User16", roi: 4.6 },
      { name: "User17", roi: 4.9 },
    ],
  },
  {
    id: 10,
    loanType: "Personal Loan",
    amount: 20000,
    bids: [
      { name: "User18", roi: 5.5 },
      { name: "User19", roi: 6 },
    ],
  },
];

const LoanBiddingPage = () => {
  const [filteredLoans, setFilteredLoans] = useState(loanRequests);
  const [loanTypeFilter, setLoanTypeFilter] = useState("All");
  const [amountFilter, setAmountFilter] = useState("");
  const [roiBid, setRoiBid] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [userBids, setUserBids] = useState({});

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
          // Add a new bid
          loan.bids.push({ name: currentUser, roi: newRoi });
        }
      }
      return loan;
    });

    // Set updated loan data
    console.log("Updated Loan Requests:", newLoanRequests);
    setRoiBid(""); // Reset the input field after submission
    setSelectedLoan(null); // Close the bidding section
    setUserBids((prev) => ({
      ...prev,
      [loanId]: newRoi, // Save user's bid for the specific loan
    }));
  };

  return (
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
            <div className="mt-4">
              <h4 className="font-semibold">Bids:</h4>
              {loan.bids.length > 0 ? (
                loan.bids.map((bid, index) => (
                  <div key={index} className="mt-2">
                    <p>
                      <span className="font-bold">{bid.name}</span>: {bid.roi}%
                      ROI
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
  );
};

export default LoanBiddingPage;
