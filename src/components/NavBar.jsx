import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Logo from "./Logo";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    setIsOpen(false); // Close menu after logout
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 sticky top-0 z-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={closeMenu}>
              <Logo />
            </Link>
            <div className="hidden lg:flex space-x-4">
              <Link
                to="/read-blogs"
                className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300"
              >
                Read
              </Link>
              <Link
                to="/write-blog"
                className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300"
              >
                Write
              </Link>
              <Link
                to="/about"
                className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-md transition duration-300"
              >
                About
              </Link>
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
                    onClick={signOut}
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
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-white focus:outline-none focus:text-gray-300 transition-transform transform duration-300"
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
          {isOpen && (
            <div className="absolute top-14 left-0 w-full lg:hidden p-2 transition-all duration-300 transform bg-gradient-to-r from-purple-600 to-blue-600 z-10 shadow-lg">
              <div className="flex flex-col items-start">
                <Link
                  to="/read-blogs"
                  className="text-white hover:bg-purple-800 px-4 py-2 rounded-md text-md transition duration-300"
                  onClick={closeMenu}
                >
                  Read
                </Link>
                <Link
                  to="/write-blog"
                  className="text-white hover:bg-purple-800 px-4 py-2 rounded-md text-md transition duration-300"
                  onClick={closeMenu}
                >
                  Write
                </Link>
                <Link
                  to="/about"
                  className="text-white hover:bg-purple-800 px-4 py-2 rounded-md text-md transition duration-300"
                  onClick={closeMenu}
                >
                  About
                </Link>
                {auth?.email ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-white hover:bg-purple-800 px-4 py-2 rounded-md text-md transition duration-300"
                      onClick={closeMenu}
                    >
                      Profile
                    </Link>
                    <button
                      className="text-white hover:bg-purple-800 px-4 py-2 rounded-md text-md transition duration-300"
                      onClick={signOut}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="text-white hover:bg-purple-800 px-4 py-2 rounded-md text-md transition duration-300"
                      onClick={closeMenu}
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="text-white hover:bg-purple-800 px-4 py-2 rounded-md text-md transition duration-300"
                      onClick={closeMenu}
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
