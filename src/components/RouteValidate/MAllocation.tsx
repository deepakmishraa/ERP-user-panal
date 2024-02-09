import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useRoleStore from "../../store/role";

const MAllocation: React.FC = () => {
  const { role } = useRoleStore((state) => ({
    role: state.role,
  }));

  return role === "allocationManager" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default MAllocation;
