import { Link, useNavigate } from "react-router-dom";
import { useWalletContract } from "../Context/WalletProvider";
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation
  const context = useWalletContract();
  const { isConnected, connectWallet } = context;
  const [isOpen, setIsOpen] = useState(false);

  const handleCommunityClick = async () => {
    // await connectWallet();  // Connect wallet first
    navigate('/community');  // Navigate to Community page
  };

  return (
    <div className="sm:px-[0px] bg-indigo-800 border-b-[2px] border-gray-800 mb-10">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="ml-6 flex items-center justify-center space-x-2 text-2xl font-semibold text-indigo-200 hover:text-white transition duration-200"
        >
          <img
            src="/logo1.png"
            alt="Logo"
            className="logo-image w-24 h-auto transition-transform duration-300 hover:scale-110 shadow-lg rounded-lg"
          />

        </Link>

        {/* Mobile Hamburger Icon */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`lg:flex gap-3 ml-auto items-center transition-all duration-300 ease-in-out space-x-4 lg:space-x-8 ${isOpen ? "block" : "hidden"} lg:block`}
        >
          <Link
            to="/kyc"
            className="px-6 py-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-500 transition duration-300"
            onClick={() => connectWallet()}
          >
            Login/KYC
          </Link>
          <Link
            to="/bidding"
            className="px-6 py-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-500 transition duration-300"
            onClick={() => connectWallet()}
          >
            Bidding
          </Link>
          <button
            onClick={handleCommunityClick}
            className="px-6 py-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-500 transition duration-300"
          >
            Community Hub
          </button>
          <Link
            to="/dashboard"
            className="px-6 py-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-500 transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/loan"
            className="px-6 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
            onClick={() => connectWallet()}
          >
            Get Loan
          </Link>
        </div>
      </nav>
    </div>
  );
};
