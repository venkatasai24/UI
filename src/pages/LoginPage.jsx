import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import AuthForm from "../components/AuthForm";

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
    <AuthForm
      handleSubmit={handleSubmit}
      error={error}
      success={success}
      loading={loading}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
    />
  );
};

export default LoginPage;
