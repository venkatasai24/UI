import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthForm from "../components/AuthForm";
import { showToast } from "../components/Toast";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");
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
    let err = null;
    setLoading(true);
    if (password !== password1) {
      setLoading(false);
      err = "passwords doesn't match!!";
      showToast(err, "");
      return;
    }
    // Password Validation
    // if (!validatePassword(password)) {
    //   setLoading(false);
    //   err =
    //     "Password must be at least 8 characters long and contain a lowercase letter, uppercase letter, number, and symbol.";
    //   showToast(err, "");
    //   return;
    // }
    try {
      await axios.post("/users/register", {
        name,
        email,
        password,
      });
      setLoading(false);
      showToast(
        "",
        "Accounted created successfully..You will be redirected to the login page.."
      );
      // Delay navigation to ensure toast is displayed
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Adjust the delay as needed
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
      from="RegisterPage"
      handleSubmit={handleSubmit}
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
