import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import userImg from "../../assets/images/doctor-img01.png"
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import patientService from "@/service/patientService";

const MyAccount = () => {

    const [patient, setPatient] = useState({});
    const [tab, setTab] = useState('bookings');
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("patientId");
        navigate("/")
        window.location.reload();
    }
    useEffect(() => {
        const username = localStorage.getItem("username")
        if (username != null) {
            patientService.getPatientByUsername(username)
                .then(res => {
                    console.log(res.data)
                    setPatient(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <section>
            <div className="max-w-[1170px] px-5 mx-auto">
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="pb-[50px] px-[30px] rounded-md">
                        <div className="flex items-center justify-center">
                            <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                                <img src={patient.image} alt="" className="w-full h-full rounded-full" />
                            </figure>
                        </div>
                        <div className="text-center mt-4">
                            <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{patient.name}</h3>
                            <p className="text-textColor text-[15px] leading-6 font-medium">{patient.email}</p>
                            <p className="text-textColor text-[15px] leading-6 font-medium">
                                Phone Number:
                                <span className="ml-2 text-headingColor text-[20px] leading-8">
                                    {patient.phone}
                                </span>
                            </p>
                        </div>
                        <div className="mt-[50px] md:mt-[100px]">
                            <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">Logout</button>
                            <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">Delete account</button>
                        </div>

                    </div>
                    <div className="md:col-span-2 md:px-[30px]">
                        <div>
                            <button onClick={() => setTab('bookings')} className={`${tab === 'bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>My Bookings</button>
                            <button onClick={() => setTab('settings')} className={`${tab === 'settings' && 'bg-primaryColor text-white font-normal'} py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>Profile Settings</button>

                        </div>
                        {
                            tab === "bookings" && <MyBookings />
                        }
                        {
                            tab === "settings" && <Profile patient={patient} />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyAccount;