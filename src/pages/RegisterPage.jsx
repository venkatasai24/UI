import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../api/axios";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (password !== password1) {
      setLoading(false);
      return setError("passwords doesn't match!!");
    }
    // Password Validation
    // if (!validatePassword(password)) {
    //   return setError(
    //     "Password must be at least 8 characters long and contain a lowercase letter, uppercase letter, number, and symbol."
    //   );
    // }
    try {
      const response = await axios.post("/users/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      setError(""); // Clear error message
      setSuccess(
        "Accounted created successfully..You will be redirected to the login page.."
      );
      // Display success message for a few seconds before redirecting
      const timeoutId = setTimeout(() => {
        navigate("/login");
      }, 5000); // Adjust timeout duration as needed (in milliseconds)

      // Cleanup function to clear timeout if component unmounts prematurely
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error?.response?.data?.message) setError(error.response.data.message);
      else setError(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 min-h-screen flex items-center justify-center py-8">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Create an Account
        </h1>
        <p className="text-lg mb-6 text-center">
          Please fill out the form below to register
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 bg-red-100 p-2 rounded-md mb-2 text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 bg-green-100 p-2 rounded-md mb-2 text-center">
              {success}
            </p>
          )}
          {loading && (
            <p className="text-blue-500 bg-blue-100 p-2 rounded-md mb-2 text-center">
              Loading ...
            </p>
          )}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Confirm Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
              onClick={togglePasswordVisibility1}
            >
              {showPassword1 ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>

      {/* Media Queries for Responsive Design */}
      <style jsx>{`
        @media only screen and (max-width: 768px) {
          .bg-white.shadow-md.rounded-lg.p-8 {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
