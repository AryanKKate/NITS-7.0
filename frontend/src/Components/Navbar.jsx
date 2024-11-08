import { Link } from "react-router-dom";
import { useWalletContract } from "../Context/WalletProvider";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const navigation = [];
  const context = useWalletContract();
  const { isConnected, connectWallet } = context;
  // console.log(context);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:px-[0px] bg-indigo-700 border-b-[1px] mb-10 border-white">
      <nav className="container relative flex flex-wrap items-center justify-between py-8 lg:justify-between xl:px-1">
        {/* Logo */}
        <Link
          to="/"
          className="ml-24 flex items-center justify-center space-x-2 text-2xl font-medium dark:text-gray-100"
        >
          <img
            src="/logo1.png" // Update this path to your logo image
            alt="Logo"
            className="logo-image w-12 h-auto"  // Initial size for the logo
          />

          <span className="text-indigo-300">Udaan</span>
        </Link>

        {/* Get Started button - only show on medium and larger screens */}
        <div className="hidden lg:flex gap-3 nav__item mr-2 lg:ml-auto lg:order-2">
          <Link
            to="/bidding"
            className="px-6 py-2 text-white rounded-md md:ml-5"
            onClick={() => {
              connectWallet;
            }}
          >
            Bidding
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-2 text-white rounded-md md:ml-5"
            // onClick={() => {
            //   connectWallet;
            // }}
          >
            Dashboard
          </Link>
          <Link
            to="/loan"
            className="px-6 py-2 text-white bg-gray-800 rounded-md md:ml-5"
            onClick={() => {
              connectWallet;
            }}
          >
            Get Loan
          </Link>
        </div>
      </nav>
    </div>
  );
};
