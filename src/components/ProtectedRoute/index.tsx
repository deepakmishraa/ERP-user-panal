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
    if (token) {
      getTokenDetail();
    }
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
