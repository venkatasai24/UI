import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl lg:text-6xl font-bold m-4">
          Tired of Searching for Interviews?
        </h1>
        <p className="text-lg lg:text-xl mb-8 p-4">
          Introducing UI Experience - Your Ultimate Interview Resource
        </p>
        <div className="flex flex-wrap justify-center mb-8">
          <Link
            to="/read-blogs"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-md m-1 mb-4 lg:mb-0 transition duration-300"
          >
            Read Experiences
          </Link>
          <Link
            to="/write-blog"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md m-1 mb-4 lg:mb-0 transition duration-300"
          >
            Write Experience
          </Link>
        </div>
        <p className="text-md lg:text-base p-2">
          Discover internship and placement interview experiences shared by
          students across all branches and industries.
        </p>
      </div>
    </div>
  );
};

export default Hero;
