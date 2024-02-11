import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Body from "../../pages/MainBody";
import Cookies from "universal-cookie";
import useTokenStore from "../../store/token";
import { TokenService } from "../../services/authServices/TokenService";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userData";

const ProtectedRoute: React.FC = () => {
  const { setToken, token } = useTokenStore((state) => ({
    setToken: state.setToken,
    token: state.token,
  }));

  const { data, setData } = useUserStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "Token") {
        setToken(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const getTokenDetail = async () => {
    try {
      const response = await TokenService.getTokenDetail();
      if (response.status === 200) {
        console.log("User Detail", response.data.data);
        setData(response.data.data);
        // setList(response.data.data);
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getTokenDetail();
  }, [token]);

  return cookies.get("management-token") ? (
    <Body>
      <Outlet />
    </Body>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
