import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import AuthForm from "../components/AuthForm";
import { showToast } from "../components/Toast";
import { validatePassword } from "./RegisterPage";

const LoginPage = () => {
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForgot = () => {
    setForgot(!forgot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = null;
    setLoading(true);
    // Password Validation
    // if (forgot && !validatePassword(password)) {
    //   setLoading(false);
    //   err =
    //     "Password must be at least 8 characters long and contain a lowercase letter, uppercase letter, number, and symbol.";
    //   showToast(err, "");
    //   return;
    // }
    try {
      const response = !forgot
        ? await axios.post(
            "/users/login",
            { email, password },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
        : await axios.put(
            "/users/update-password",
            { email, password },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
      setLoading(false);
      if (!forgot) {
        const accessToken = response?.data?.accessToken;
        setAuth({ email, accessToken });
        showToast("", `Hi ${email}!`);
        // Delay navigation to ensure toast is displayed
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 2000); // Adjust the delay as needed
      } else {
        showToast("", `Your ${response.data.message}!`);
      }
    } catch (error) {
      if (error?.response?.data?.message) err = error.response.data.message;
      else err = error.message;
    } finally {
      setLoading(false);
      if (err) {
        showToast(err, "");
      }
    }
  };

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      loading={loading}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      forgot={forgot}
      toggleForgot={toggleForgot}
    />
  );
};

export default LoginPage;
