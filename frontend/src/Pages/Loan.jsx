import React, { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar";

function Loan() {
  const [loanType, setLoanType] = useState("Personal");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(0); // Timer in hours
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // You can save the loan data here, e.g., to a database
    console.log("Loan Submitted:", { loanType, amount, description, timer });
  };

  useEffect(() => {
    if (submitted) {
      // Timer logic: reset after a certain amount of time
      const interval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        }
      }, 3600000); // 1 hour interval
      return () => clearInterval(interval);
    }
  }, [submitted, timer]);

  return (
    <div className="flex flex-col bg-gray-800 min-h-screen w-full">
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <div className="flex pl-44 items-center">
          <img
            src="https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.4e76c802.png&w=640&q=75"
            alt="Hero Illustration"
            width="450px"
          />
        </div>
        <div className="flex justify-center items-center pl-64 w-1/2">
          <div className="w-5/6 max-w-xl mx-auto my-auto p-8 border-2 border-gray-300 rounded-lg min-h-[600px]">
            <h1 className="text-3xl font-semibold text-center text-white mb-6">
              Get Loan
            </h1>
            <form onSubmit={handleSubmit}>
              <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Select type of Loan
              </label>
              <select
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                onChange={(e) => setLoanType(e.target.value)}
                value={loanType}
              >
                <option>Personal</option>
                <option>Business</option>
                <option>Student</option>
              </select>

              <label className="block mb-3 mt-3 text-sm font-medium text-gray-900 dark:text-white">
                Enter Amount:
              </label>
              <input
                type="number"
                min={10000}
                max={100000}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$"
                required
              />

              <label className="block mb-3 mt-3 text-sm font-medium text-gray-900 dark:text-white">
                Timer (Hours)
              </label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                required
              />

              <label className="block mb-3 mt-3 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                rows="8"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Briefly describe why you need the loan"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loan;
