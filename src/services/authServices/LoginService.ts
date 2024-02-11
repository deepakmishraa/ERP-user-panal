import axios from "axios";
export class LoginService {
  public static loginHandler(email: string, password: string) {
    const data = {
      email,
      password,
    };
    return axios.post(`${process.env.REACT_APP_API_URL}/user/signin`, data);
  }
}
