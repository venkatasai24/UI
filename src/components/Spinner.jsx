import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="rounded-full border-8 border-l-orange-500 border-r-green-500 h-20 w-20 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
