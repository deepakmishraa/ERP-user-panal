import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Body from "../../pages/MainBody";
import Cookies from "universal-cookie";
import useTokenStore from "../../store/token";

const ProtectedRoute: React.FC = () => {
  const { setToken, token } = useTokenStore((state) => ({
    setToken: state.setToken,
    token: state.token,
  }));
  const cookies = new Cookies();

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

  return cookies.get("erp-token") ? (
    <Body>
      <Outlet />
    </Body>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
