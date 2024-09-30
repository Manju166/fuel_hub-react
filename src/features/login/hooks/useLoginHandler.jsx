import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LOGIN_MUTATION from "../graphql/LoginMutation";
import { toast } from "react-toastify";

export const useLoginHandler = () => {
  const [login, { loading: loginLoading, error: loginError }] =
    useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const [tokenError, setTokenError] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const isValidToken = validateToken(token);

        if (isValidToken) {
          navigate("/dashboard");
        } else {
          setTokenError("Invalid token found. Please log in again.");
          localStorage.removeItem("token");
        }
      }
    } catch (err) {
      console.error("Token validation error:", err);
      setTokenError("Error reading authentication token. Please log in again.");
      localStorage.removeItem("token");
    }
  }, [navigate]);

  const validateToken = (token) => {
    return !!token;
  };

  const handleLogin = async (values) => {
    setTokenError("");

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
        toast.success("Logged in successfully!!");
      } else {
        console.log("Login failed:", response.data.loginUser.error);
      }
    } catch (err) {
      console.log(`Login failed: ${err.message}`);
    }
  };

  return {
    handleLogin,
    loginLoading,
    loginError,
    tokenError,
  };
};
