import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white text-lg">UI</span>
          </div>
          <div className="flex">
            <a
              href="/write"
              className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-md"
            >
              Write Your Experience
            </a>
            {/* Add more anchor tags for other buttons */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
