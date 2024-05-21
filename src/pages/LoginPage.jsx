import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "/users/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLoading(false);
      setError("");
      const accessToken = response?.data?.accessToken;
      setAuth({ email, accessToken });
      setSuccess(`Hi ${email}! You will be redirected shortly...`);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 4000);
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
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h1>
        <p className="text-lg mb-6 text-center">
          Please sign in to your account
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 bg-red-100 p-2 rounded-md mb-2 text-center">
              {error}
            </p>
          )}
          {loading && (
            <p className="text-blue-500 bg-blue-100 p-2 rounded-md mb-2 text-center">
              Loading ...
            </p>
          )}
          {success && (
            <p className="text-green-500 bg-green-100 p-2 rounded-md mb-2 text-center">
              {success}
            </p>
          )}
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
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up here
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

export default LoginPage;
