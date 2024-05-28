import React from "react";
import Logo from "./Logo";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="relative flex items-center justify-center">
        <div className="absolute rounded-full border-4 border-l-yellow-500 border-t-purple-500 border-b-blue-500 border-r-green-500 animate-spin h-12 w-12"></div>
        <Logo />
      </div>
    </div>
  );
};

export default LoadingSpinner;
