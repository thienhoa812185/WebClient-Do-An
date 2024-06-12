import startIcon from '../assets/images/Star.png'
import { Link } from "react-router-dom";
import { BsArrowRight } from 'react-icons/bs';
import PaypalCheckoutButton from './PaypalCheckoutButton';

const BookingInformation = ({ booking }) => {

    const { id, appointmentTime, doctor, statusBooking, doctorSchedule, statusPayment } = booking;

    return (
        <div className="p-3 lg:p-5">
            <div>
                <img src={doctor.image} className="w-full" alt="" />
            </div>
            <h2 className="text-[18px] leading-[30px] lg:text-[20px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">{doctor.name}</h2>
            <div className="mt-2 lg:mt-4 flex items-center justify-between">
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[13px] lg:leading-7 font-semibold rounded'>{doctor.speciality.name}</span>
                <div className='flex items-center gap-[6px]'>
                    <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'><img src={startIcon} alt="" />{4.8}</span>
                    <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>({4.8})</span>
                </div>
            </div>

            <div className='mt-[18px] lg:mt-5'>
                <p className='text-[14px] leading-6 font-[400] text-textColor'><strong>Booking Time: </strong>{doctorSchedule.scheduleTime.time}, {appointmentTime}</p>
                <p className='text-[14px] leading-6 font-[400] text-textColor'><strong>Address:</strong> {doctor.examination_Address}</p>
            </div>

            <div className='my-[18px] lg:mt-5 flex items-center justify-between'>
                <div>
                    {
                        statusBooking === "CANCELLED" && <h3 className='bg-rose-200 text-rose-500 py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[13px] lg:leading-7 font-semibold rounded'>{statusBooking}</h3>
                    }
                    {
                        statusBooking === "COMPLETED" && <h3 className='bg-green-300 text-green-900 py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[13px] lg:leading-7 font-semibold rounded'>{statusBooking}</h3>
                    }
                    {
                        statusBooking === "CONFIRM" && <h3 className='bg-amber-300 text-rose-500 py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[13px] lg:leading-7 font-semibold rounded'>{statusBooking}</h3>
                    }
                    {
                        statusBooking === "PENDING" && <h3 className='bg-teal-500 text-green-900 py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[13px] lg:leading-7 font-semibold rounded'>{statusBooking}</h3>
                    }
                </div>
                <div>
                    {
                        statusPayment === "PAID" && <h3 className='bg-green-300 text-green-900 py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[13px] lg:leading-7 font-semibold rounded'>{statusPayment}</h3>
                    }
                    {
                        statusPayment === "UNPAID" && <h3 className='bg-rose-200 text-rose-500 py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[13px] lg:leading-7 font-semibold rounded'>{statusPayment}</h3>
                    }                </div>
                <Link to={`/doctors/${3}`} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
            </div>
            {
                statusBooking === "CONFIRM" && statusPayment === "UNPAID" && <PaypalCheckoutButton id={id} price={doctor.examination_Price} />
            }
            {
                statusBooking === "COMPLETED" && statusPayment === "UNPAID" && <PaypalCheckoutButton id={id} price={doctor.examination_Price} />
            }
        </div >
    )
}

export default BookingInformation;