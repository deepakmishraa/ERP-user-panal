import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Body from "../../pages/MainBody";
import useTokenStore from "../../store/token";
import { TokenService } from "../../services/authServices/TokenService";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userData";
import CircularLoader from "../../core/CircularLoader";
import useIsLoaderStore from "../../store/isLoader";

const ProtectedRoute: React.FC = () => {
  const { token } = useTokenStore((state) => ({
    token: state.token,
  }));

  const { data, setData } = useUserStore((state) => ({
    data: state.data,
    setData: state.setData,
  }));
  const navigate = useNavigate();

  const { loader, setLoader } = useIsLoaderStore((state) => ({
    loader: state.loader,
    setLoader: state.setLoader,
  }));

  const getTokenDetail = async () => {
    setLoader(true);
    try {
      const response = await TokenService.getTokenDetail();
      if (response.status === 200) {
        console.log("User Detail", response.data.data);
        setData(response.data.data);
        setLoader(false);
      } else {
        navigate("/login");
        setLoader(false);
      }
    } catch (error) {
      console.error("Failed to fetch token details", error);
      navigate("/login");
      setLoader(false);
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

  if (loader) {
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
