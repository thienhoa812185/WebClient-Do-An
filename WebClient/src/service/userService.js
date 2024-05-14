import axios from "axios";
import { BASE_URL } from "../config";

class UserService {

    getPatientByUsername(username) {
        return axios.get(BASE_URL + "/api/patient/getPatientByUsername/" + username)
    }

    updateUser(patient) {
        return axios.put(BASE_URL + "/api/user/updateUser", patient);
    }


}


const userService = new UserService();

export default userService;