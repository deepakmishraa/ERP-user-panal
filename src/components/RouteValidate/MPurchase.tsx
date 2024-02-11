import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../store/userData";

const MPurchase: React.FC = () => {
  const { data } = useUserStore((state) => ({
    data: state.data,
  }));

  return data?.role === "purchaseManager" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default MPurchase;
