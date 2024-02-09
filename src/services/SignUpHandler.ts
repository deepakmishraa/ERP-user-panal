// import instanceAxios from "../hooks/axiosConfig";
import axios from "axios";
// type SignUpResponseInterface = {
//   status: number;
// };

export interface IResponse {
  status: number;
  message: string;
  token: string;
  time: string;
}

const signupService = async (
  name: string,
  email: string,
  mobileNo: string,
  password: string,
  imp: string
): Promise<IResponse> => {
  const data = {
    name: name,
    email: email,
    mobileNo: +mobileNo,
    password: password,
    imo: +imp,
  };

  try {
    const response = await axios.post<IResponse>("/user/signup", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default signupService;
