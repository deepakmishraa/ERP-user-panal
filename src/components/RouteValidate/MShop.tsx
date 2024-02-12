import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../../store/userData";
import { TokenService } from "../../services/authServices/TokenService";
import useTokenStore from "../../store/token";
import CircularLoader from "../../core/CircularLoader";
import { Box } from "@mui/material";
import CenterBox from "../../core/CenterBox";

const MShop: React.FC = () => {
  const navigate = useNavigate();
  const { data, setData } = useUserStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));
  const { setToken, token } = useTokenStore((state) => ({
    setToken: state.setToken,
    token: state.token,
  }));

  // Introducing a state to manage loading or uninitialized state
  const [isLoading, setIsLoading] = useState(true);

  const getTokenDetail = async () => {
    try {
      const response = await TokenService.getTokenDetail();
      if (response.status === 200) {
        console.log("User Detail", response.data.data);
        setData(response.data.data);
        setIsLoading(false); // Data fetched successfully
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to fetch token details", error);
      navigate("/login");
    }
  };

  // Additional useEffect to react to token changes
  useEffect(() => {
    if (token) {
      getTokenDetail();
    }
  }, [token]);

  useEffect(() => {
    getTokenDetail();
  }, []);

  if (isLoading) {
    return <CircularLoader />; // Show loading state while checking user role
  }

  return data && data.role === "shopManager" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default MShop;
