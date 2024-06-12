import { useEffect, useState } from "react";
import doctorImg from "../../assets/images/doctor-img02.png";
import startIcon from "../../assets/images/Star.png"
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { useParams } from "react-router-dom";
import doctorService from "@/service/doctorService";

const DoctorDetails = () => {

    const [doctor, setDoctor] = useState({
        name: "",
        image: "",
        position: "",
        description: "",
        speciality: {
            name: ""
        }
    });
    const [tab, setTab] = useState('about');
    const { id } = useParams();

    useEffect(() => {
        doctorService.getDoctorById(id)
            .then((res) => {
                console.log(res.data);
                setDoctor(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return <section>
        <div className="max-w-[1170px] px-5 mx-auto">
            <div className="grid md:grid-cols-3 gap-[50px]">

                <div className="md:col-span-2">
                    <div className="flex items-center gap-5">
                        <figure className="max-w-[200px] max-h-[200px]">
                            <img src={doctor.image} alt="" className="w-full" />
                        </figure>

                        <div>
                            <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">{doctor.speciality.name}</span>
                            <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">{doctor.name}</h3>
                            {/* <div className="flex items-center gap-[6px]">
                                <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                                    <img src={startIcon} alt="" /> 4.8
                                </span>
                                <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">(272)</span>
                            </div> */}
                            <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">{doctor.description}</p>
                        </div>
                    </div>

                    <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                        <button onClick={() => { setTab('about') }} className={`${tab === 'about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>About</button>
                        <button onClick={() => { setTab('feedback') }} className={`${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>Feedback</button>
                    </div>

                    <div className="mt-[50px]">
                        {tab === 'about' && <DoctorAbout doctor={doctor} />}
                        {tab === 'feedback' && <Feedback comments={doctor.comments} id={doctor.id} />}
                    </div>
                </div>
                <div>
                    <SidePanel doctor={doctor} />
                </div>
            </div>


        </div>
    </section>
}

export default DoctorDetails;