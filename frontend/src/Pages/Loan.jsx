import React, { useState } from "react";

function Loan() {
  return (
    <div className="flex bg-gray-800 min-h-screen w-full">
      <div className="flex pl-44 items-center">
        {/* Hero Image */}
        <img
          src="https://nextly.web3templates.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.4e76c802.png&w=640&q=75"
          alt="Hero Illustration"
          loading="eager"
        />
      </div>
      <div className="flex justify-center items-center pl-64 w-1/2">
        <div className="w-5/6 max-w-xl mx-auto my-auto p-8 border-2 border-gray-300 rounded-lg min-h-[650px]">
          {/* Title */}
          <h1 className="text-3xl font-semibold text-center text-white mb-6">
            Get Loan
          </h1>

          {/* Form */}
          <form action="#">
            <label
              for="countries"
              className="block mb-5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select type of Loan
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </select>

            <label
              for="number-input"
              className="block mb-5 mt-5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Amount:
            </label>
            <input
              type="number"
              id="number-input"
              aria-describedby="helper-text-explanation"
              min={10000}
              max={100000}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="90210"
              required
            />

            <label
              for="message"
              className="block mb-5 mt-5 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="10"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
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
  );
}

export default Loan;
