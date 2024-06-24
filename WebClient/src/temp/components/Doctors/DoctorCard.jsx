import startIcon from '../../../assets/images/Star.png'
import { Link } from "react-router-dom";
import { BsArrowRight } from 'react-icons/bs';

const DoctorCard = ({ doctor }) => {
    //const { name, avgRating, totalRating, photo, specialty, totalPatients, hospital } = doctor
    const { id, name, image, examination_Address, speciality, examination_Price, position } = doctor


    const formatCurrencyVND = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    return (
        <div className="p-3 lg:p-5">
            <div>
                <img src={image} className="w-full h-64 object-cover" alt="" />
            </div>
            <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">{name}</h2>
            <div className="mt-2 lg:mt-4 flex items-center justify-between">
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[15px] leading-4 lg:text-[12px] lg:leading-7 font-semibold rounded'>{speciality.name}</span>
                <div className='flex items-center gap-[6px]'>
                    {/* <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'><img src={startIcon} alt="" />{4.8}</span> */}
                    {/* <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>({4.8})</span> */}
                    <span className='text-[12px] leading-6 lg:text-[14px] lg:leading-7 font-[400] text-textColor'><strong>Giá khám:</strong> {formatCurrencyVND(examination_Price)}</span>

                </div>
            </div>

            <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
                <div>
                    <h3 className='text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor'>Chức vụ: {position}</h3>
                </div>
                <Link to={`/doctors/${id}`} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>

            </div>
            {/* <h3 className='text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor'>{examination_Address}</h3> */}
            <p className='text-[14px] leading-6 font-[400] text-textColor'> <strong>Địa chỉ:</strong>{examination_Address}</p>


        </div >
    )

}

export default DoctorCard;