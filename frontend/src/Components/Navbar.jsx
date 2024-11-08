import { Link } from "react-router-dom";
import { useWalletContract } from "../Context/WalletProvider";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const navigation = [];
  const context = useWalletContract();
  const { isConnected, connectWallet } = context;
  console.log(context);
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
            src="/logo.png" // Update this path to your logo image
            width="32"
            alt="Logo"
            className="w-8"
          />
          <span className="text-white">Credify Pro</span>
        </Link>

        {/* Get Started button - only show on medium and larger screens */}
        <div className="hidden lg:flex gap-3 nav__item mr-2 lg:ml-auto lg:order-2">
          <Link
            to="/kyc"
            className="px-6 py-2 text-white rounded-md md:ml-5"
            onClick={() => {
              connectWallet;
            }}
          >
            Login/KYC
          </Link>
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

        {/* Hamburger Icon for Mobile - only show on small screens */}
        {/* <button
          className="text-white lg:hidden ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button> */}

        {/* Menu - Adjust visibility based on state */}
        {/* <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full lg:flex lg:w-auto lg:items-center text-center`}
        >
          <ul className="justify-end flex-1 list-none lg:flex lg:pt-0 pt-6">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <a
                  href="/kyc"
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {menu}
                </a>
              </li>
            ))}
          </ul>
        </div>  */}
      </nav>
    </div>
  );
};
