import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const InstanceAxios = () => {
  const instanceAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      Authorization: `Bearer ${cookies.get("management-token")}`,
    },
  });

  return instanceAxios;
};
