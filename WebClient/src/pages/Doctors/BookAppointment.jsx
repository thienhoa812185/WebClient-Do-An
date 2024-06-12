import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"

import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react';
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import bookingService from "@/service/bookingService";
import { useNavigate, useParams } from "react-router-dom";
import doctorService from "@/service/doctorService";
import { toast } from "react-toastify";




const BookAppointment = ({ doctor }) => {

    const [date, setDate] = useState(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow;
    });
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [bookingList, setBookingList] = useState([]);
    const [listBookingFull, setListBookingFull] = useState([]);
    const [note, setNote] = useState("");

    console.log(note)

    const handleChange = e => {
        setNote(e.target.value);
    }

    const navigate = useNavigate();

    const { id } = useParams();

    function formatDateToString(date) {
        if (!date) return ""; // Kiểm tra nếu date là undefined thì trả về chuỗi rỗng

        const year = date.getFullYear(); // Lấy năm
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Lấy tháng và thêm số 0 vào trước nếu cần
        const day = ('0' + date.getDate()).slice(-2); // Lấy ngày và thêm số 0 vào trước nếu cần

        return `${year}-${month}-${day}`;
    }

    function getFirstIdByTime(array, timeToFind) {
        const element = array.find(item => item.scheduleTime.time === timeToFind); // Tìm phần tử đầu tiên có thời gian trùng khớp
        return element ? element.id : null; // Trả về id của phần tử đầu tiên, hoặc null nếu không tìm thấy
    }

    const mapToScheduleTime = (time) => {
        return time
            .filter(element => element.status === 0)
    };


    useEffect(() => {
        bookingService.getAllBooking()
            .then(res => {
                setBookingList(res.data);
            })
            .catch(err => {
                console.log("Lỗi khi tải danh sách lịch hẹn:", err);
                // Xử lý lỗi ở đây
            });

        doctorService.getDoctorById(id)
            .then((res) => {
                setListBookingFull(mapToScheduleTime(res.data.doctorSchedules));
                //console.log(mapToScheduleTime(res.data.doctorSchedules))
                setTimeSlot(mapToScheduleTime(res.data.doctorSchedules));
            })
            .catch(err => {
                console.log("Lỗi khi tải danh sách lịch trình của bác sĩ:", err);
                // Xử lý lỗi ở đây
            });
    }, [id]);

    useEffect(() => {
        const formattedDate = formatDateToString(date);

        const bookedTimeSlots = new Set(
            bookingList
                .filter(appointment => appointment.appointmentTime === formattedDate && appointment.statusBooking !== "CANCELLED")
                .map(appointment => appointment.doctorSchedule.id)
        );

        const availableTimeSlots = listBookingFull.filter(schedule => !bookedTimeSlots.has(schedule.id));
        setTimeSlot(availableTimeSlots);
    }, [date, bookingList, listBookingFull]);


    const isPastDay = (day) => {
        return day <= new Date();
    }

    const handleSubmit = () => {
        console.log("Booking");
        const patientId = localStorage.getItem("patientId");
        const doctorScheduleId = getFirstIdByTime(listBookingFull, selectedTimeSlot);

        const bookingData = {
            appointmentTime: formatDateToString(date),
            patientId: patientId,
            note: note,
            doctorScheduleId: doctorScheduleId
        };

        // Kiểm tra tính khả dụng của khung giờ trước khi đặt lịch
        bookingService.checkSlotAvailability(doctorScheduleId, bookingData.appointmentTime)
            .then(res => {
                if (res.data) {  // Giả sử API trả về một đối tượng có thuộc tính isAvailable
                    bookingService.addBooking(bookingData)
                        .then(res => {
                            toast.success("Bạn đã đặt lịch thành công");
                            navigate("/home");
                        })
                        .catch(err => {
                            toast.error("Bạn đã đặt lịch thất bại");
                            console.error(err);
                        });
                } else {
                    toast.error("Khung giờ này đã được đặt trước. Vui lòng chọn khung giờ khác.");
                }
            })
            .catch(err => {
                console.log(err);
                toast.error("Có lỗi xảy ra khi kiểm tra khung giờ.");

            });
    };


    // const handleSubmit = () => {
    //     console.log("Booking")
    //     const patientId = localStorage.getItem("patientId")
    //     const bookingData = {
    //         appointmentTime: formatDateToString(date),
    //         patientId: patientId,
    //         note: note,
    //         doctorScheduleId: getFirstIdByTime(listBookingFull, selectedTimeSlot)
    //     }

    //     bookingService.checkSlotAvailability(bookingData.doctorScheduleId, doctorScheduleId.appointmentTime)
    //         .then(res => {
    //             bookingService.addBooking(bookingData)
    //                 .then(res => {
    //                     toast.success("Ban da dat lich thanh cong");
    //                     navigate("/home")
    //                 })
    //                 .catch(err => {
    //                     toast.err("Ban da dat lich that bai");
    //                     console.log(err)
    //                 })
    //         })
    //         .catch(err => {

    //         })
    // }

    // const handleSubmit = async () => {
    //     const patientId = localStorage.getItem("patientId");
    //     const bookingData = {
    //         appointmentTime: formatDateToString(date),
    //         patientId,
    //         note,
    //         doctorScheduleId: getFirstIdByTime(listBookingFull, selectedTimeSlot)
    //     };

    //     try {
    //         const isAvailable = await bookingService.checkSlotAvailability(bookingData.doctorScheduleId, bookingData.appointmentTime);

    //         if (isAvailable) {
    //             await bookingService.addBooking(bookingData);
    //             toast.success("You have successfully booked an appointment");
    //             navigate("/home");
    //         } else {
    //             toast.error("The selected time slot is no longer available. Please choose another slot.");
    //         }
    //     } catch (err) {
    //         toast.error("Failed to book the appointment");
    //         console.error(err);
    //     }
    // };


    return (
        <Dialog>
            <DialogTrigger>
                <button className="btn px-2 w-full rounded-md">Book Appoitment</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book Appointment</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                                <div className="flex flex-col gap-3 items-baseline">
                                    <h2 className="flex gap-2 items-center">
                                        <CalendarDays className="text-irisBlueColor h-5 w-5" />
                                        Select Date
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={isPastDay}
                                        className="rounded-md border"
                                    />
                                </div>
                                <div className="mt-3 md:mt-0">
                                    <h2 className="flex gap-2 items-center mb-3">
                                        <Clock className="text-irisBlueColor h-5 w-5" />
                                        Select Time Slot
                                    </h2>
                                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                                        {
                                            timeSlot && timeSlot.map((item, index) => (
                                                <h2 onClick={() => setSelectedTimeSlot(item.scheduleTime.time)} className={`p-2 border cursor-pointer text-center hover:bg-irisBlueColor hover:text-white rounded-full ${item.scheduleTime.time === selectedTimeSlot && 'bg-irisBlueColor text-white'}`}>{item.scheduleTime.time}</h2>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <Textarea className="mt-3" placeholder="Note" name="note" onChange={handleChange} value={note} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <>
                            <Button type="button" className="text-red-500 border-red-500" variant="outline">
                                Close
                            </Button>
                            <Button type="button" disabled={!(date && selectedTimeSlot)} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default BookAppointment;