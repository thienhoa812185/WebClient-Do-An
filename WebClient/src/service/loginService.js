import axios from "axios";
import { BASE_URL } from "../config";

class LoginService {
    login(loginData) {
        return axios.post("http://localhost:8080/api/auth/login", loginData);
    }

    register(registerData) {
        return axios.post(BASE_URL + "/api/auth/register", registerData);
    }
}


const loginService = new LoginService();

export default loginService;