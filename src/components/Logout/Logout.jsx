import React from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import LOGOUT_USER from "./LogoutMutation";
import '../Navbar/style.css'
import { toast } from "react-toastify";
const Logout = () => {
  const navigate = useNavigate();
  const [logoutUser] = useMutation(LOGOUT_USER);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.data.logoutUser.success) {
        localStorage.removeItem("token");
        navigate("/");
        toast.success("Log out successfully")
      } else {
        console.error("Logout failed:", response.data.logoutUser.message);
      }
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return <button className="logout-button" onClick={handleLogout}>Log out</button>;
};

export default Logout;
