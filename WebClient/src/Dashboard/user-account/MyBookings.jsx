import { doctors } from "@/assets/data/doctors";
import BookingInformation from "@/pages/BookingInformation";
import bookingService from "@/service/bookingService";
import DoctorCard from "@/temp/components/Doctors/DoctorCard";
import { useEffect, useState } from "react";



const MyBookings = () => {
    const [bookingList, setBookingList] = useState([])

    useEffect(() => {
        const username = localStorage.getItem("username")
        bookingService.getBookingByUsername(username)
            .then(res => {
                console.log(res.data)
                setBookingList(res.data.reverse())
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {
                bookingList.map(booking => (
                    <BookingInformation booking={booking} />
                ))
            }
        </div>
    )
}

export default MyBookings;