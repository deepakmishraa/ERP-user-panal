import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../store/userData";

const MAllocation: React.FC = () => {
  const { data } = useUserStore((state) => ({
    data: state.data,
  }));

  return data?.role === "allocationManager" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default MAllocation;
