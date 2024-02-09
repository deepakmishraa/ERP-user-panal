import axios from "axios";

export interface IResponse {
  status: number;
  message: string;
  token: string;
  time: string;
}

class AuthService {
  async signup(
    name: string,
    email: string,
    password: string
  ): Promise<IResponse> {
    const data = {
      businessname: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post<IResponse>(
        `${process.env.REACT_APP_API_URL}/company/signup`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
