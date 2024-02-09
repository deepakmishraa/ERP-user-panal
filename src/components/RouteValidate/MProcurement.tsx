import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useRoleStore from "../../store/role";

const MProcurement: React.FC = () => {
  const { role } = useRoleStore((state) => ({
    role: state.role,
  }));

  return role === "procurementManager" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default MProcurement;
