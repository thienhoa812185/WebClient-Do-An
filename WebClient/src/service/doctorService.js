import axios from "axios";
import { BASE_URL } from "../config";

class DoctorService {

    getAllDoctor() {
        return axios.get(BASE_URL + "/api/doctor")
    }

    getDoctorById(id) {
        return axios.get(BASE_URL + "/api/doctor/getById/" + id)
    }

    getTop4Doctors(specialityId) {
        console.log(specialityId)
        return axios.get(BASE_URL + "/api/doctor/getTheFiveBestDoctor/" + specialityId)
    }

}


const doctorService = new DoctorService();

export default doctorService;