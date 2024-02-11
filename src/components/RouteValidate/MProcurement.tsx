import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../store/userData";

const MProcurement: React.FC = () => {
  const { data } = useUserStore((state) => ({
    data: state.data,
  }));

  return data?.role === "procurementManager" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default MProcurement;
