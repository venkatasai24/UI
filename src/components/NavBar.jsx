import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center">
                <span className="text-white text-lg font-bold">UI</span>
              </div>
            </Link>
            <div className="hidden lg:flex justify-around">
              {auth?.email ? (
                <>
                  <Link
                    to="/profile"
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300"
                  >
                    Login
                  </Link>
                </>
              )}
              {/* Add more anchor tags for other buttons */}
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-white focus:outline-none focus:text-gray-300"
                aria-label="Toggle menu"
                onClick={toggleMenu}
              >
                {isOpen ? (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.293 7.293a1 1 0 011.414 0L12 11.586l4.293-4.293a1 1 0 111.414 1.414L13.414 13l4.293 4.293a1 1 0 01-1.414 1.414L12 14.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 13 6.293 8.707a1 1 0 010-1.414z"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 4H4v2h16v-2z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* Toggle menu for smaller screens */}
          {isOpen && (
            <div
              className={`flex flex-col lg:hidden mt-2 transition-all duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              } items-start`}
            >
              {auth?.email ? (
                <>
                  <Link
                    to="/profile"
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300 self-start"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300 self-start"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300 self-start"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
