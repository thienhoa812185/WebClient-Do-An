import axios from "axios";
import { BASE_URL } from "../config";

class BookingService {

    getAllBooking() {
        return axios.get(BASE_URL + "/api/booking")
    }

    addBooking(bookingData) {
        return axios.post(BASE_URL + "/api/booking/addBooking", bookingData)
    }

    getBookingByUsername(username) {
        return axios.get(BASE_URL + "/api/booking/getBookingByEmailUser/" + username)
    }

}


const bookingService = new BookingService();

export default bookingService;