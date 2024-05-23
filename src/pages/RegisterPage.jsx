import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthForm from "../components/AuthForm";

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
      await axios.post("/users/register", {
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
    <AuthForm
      from="RegisterPage"
      handleSubmit={handleSubmit}
      error={error}
      success={success}
      loading={loading}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      password1={password1}
      setPassword1={setPassword1}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      showPassword1={showPassword1}
      togglePasswordVisibility1={togglePasswordVisibility1}
    />
  );
};

export default RegisterPage;
