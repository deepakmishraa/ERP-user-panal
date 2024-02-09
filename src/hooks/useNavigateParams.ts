import { useNavigate } from "react-router-dom";

const useNavigateParams = () => {
  const navigate = useNavigate();

  return (url: string, params: Record<string, string>) => {
    const queryParams = new URLSearchParams(params).toString();
    const path = `/${url}${queryParams ? `?${queryParams}` : ""}`;
    navigate(path);
  };
};

export default useNavigateParams;
