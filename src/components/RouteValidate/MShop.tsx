import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../store/userData";
import CircularLoader from "../../core/CircularLoader";
import useIsLoaderStore from "../../store/isLoader";

const MShop: React.FC = () => {
  const { data } = useUserStore((state) => ({
    data: state.data,
  }));

  const { loader } = useIsLoaderStore((state) => ({
    loader: state.loader,
  }));

  if (loader) {
    return <CircularLoader />; // Show loading state while checking user role
  }

  return !loader && data && data.role === "shopManager" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default MShop;
