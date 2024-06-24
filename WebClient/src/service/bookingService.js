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

    updateStatusMethod(idBooking, statusMethod) {
        return axios.post(BASE_URL + "/api/booking/updateStatusMethod/" + idBooking, statusMethod)
    }

    updateStatusBooking(idBooking, status) {
        return axios.post(BASE_URL + "/api/booking/updateStatusBooking/" + idBooking, status);
    }

    checkSlotAvailability(doctorSchedule, appointment) {
        const data = { doctorScheduleId: doctorSchedule, appointmentTime: appointment };
        console.log(data)
        return axios.post(BASE_URL + "/api/booking/checkSlotAvailability", data);
    }

}


const bookingService = new BookingService();

export default bookingService;