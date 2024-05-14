import startIcon from '../assets/images/Star.png'
import { Link } from "react-router-dom";
import { BsArrowRight } from 'react-icons/bs';

const BookingInformation = ({ booking }) => {

    const { appointmentTime, doctor, statusBooking, doctorSchedule } = booking;

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
                <p className='text-[14px] leading-6 font-[400] text-textColor'>Booking Time: {doctorSchedule.scheduleTime.time}, {appointmentTime}</p>
                <p className='text-[14px] leading-6 font-[400] text-textColor'>Address: {doctor.examination_Address}</p>
            </div>

            <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
                <div>
                    <h3 className='text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor'>{statusBooking}</h3>
                </div>
                <Link to={`/doctors/${3}`} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
            </div>
        </div >
    )
}

export default BookingInformation;