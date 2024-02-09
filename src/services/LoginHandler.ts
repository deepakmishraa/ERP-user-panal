// import instanceAxios from "../hooks/axiosConfig";
import { InstanceAxios } from "../hooks/axiosConfig";
const loginHandler = async (email: string, password: string): Promise<{}> => {
  const data = {
    email: email,
    password: password,
  };
  return await InstanceAxios().post("/user/signin", data);
};

export default loginHandler;
