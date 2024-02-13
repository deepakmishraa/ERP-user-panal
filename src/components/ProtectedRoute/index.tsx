import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Body from "../../pages/MainBody";
import Cookies from "universal-cookie";
import useTokenStore from "../../store/token";
import { TokenService } from "../../services/authServices/TokenService";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userData";
import CircularLoader from "../../core/CircularLoader";

const ProtectedRoute: React.FC = () => {
  const { token } = useTokenStore((state) => ({
    token: state.token,
  }));

  const { data, setData } = useUserStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));
  const cookies = new Cookies();
  const navigate = useNavigate();
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

  return data?._id !== "" ? (
    <Body>
      <Outlet />
    </Body>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
