import React from "react";
import Loading from "../assets/loading.svg";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="relative flex items-center justify-center">
        <img class="w-16 h-16 animate-spin" src={Loading} alt="Loading icon" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
