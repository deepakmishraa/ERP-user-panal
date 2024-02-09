import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useRoleStore from "../../store/role";

const MPurchase: React.FC = () => {
  const { role } = useRoleStore((state) => ({
    role: state.role,
  }));

  return role === "purchaseManager" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default MPurchase;
