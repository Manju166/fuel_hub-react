// LoginHandler.js
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LOGIN_MUTATION from "../graphql/LoginMutation";

export const useLoginHandler = () => {
  const [login, { loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [tenantError, setTenantError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (values) => {
    setEmailError("");
    setPasswordError("");
    setTenantError("");

    try {
      const response = await login({
        variables: {
          email: values.email,
          password: values.password,
          tenantId: parseInt(values.tenant, 10),
        },
      });

      if (response.data.loginUser) {
        localStorage.setItem("token", response.data.loginUser.token);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.message.includes("Invalid email")) {
        setEmailError(
          "Email does not match our records. Please check your email or register."
        );
      }
      if (err.message.includes("Invalid password")) {
        setPasswordError("Password is incorrect. Please check your password.");
      }
      if (err.message.includes("Invalid tenant")) {
        setTenantError(
          "Tenant ID is not registered. Please select a valid tenant."
        );
      }
    }
  };

  return {
    handleLogin,
    loginLoading,
    loginError,
    emailError,
    passwordError,
    tenantError,
  };
};
