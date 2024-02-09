import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useRoleStore from "../../store/role";

const MShop: React.FC = () => {
  const { role } = useRoleStore((state) => ({
    role: state.role,
  }));

  return role === "shopManager" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default MShop;
