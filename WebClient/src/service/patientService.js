import axios from "axios";
import { BASE_URL } from "../config";

class PatientService {

    getPatientByUsername(username) {
        return axios.get(BASE_URL + "/api/patient/getPatientByUsername/" + username)
    }


}


const patientService = new PatientService();

export default patientService;