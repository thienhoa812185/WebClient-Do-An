import DoctorCard from './../../temp/components/Doctors/DoctorCard';
import { doctors } from './../../assets/data/doctors'
import { useEffect, useState } from 'react';
import doctorService from '@/service/doctorService';
const Doctor = () => {

    const [doctorList, setDoctorList] = useState([])

    useEffect(() => {
        doctorService.getAllDoctor()
            .then(res => {
                console.log(res.data)
                setDoctorList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return <>
        <section className="bg-[#fff9ea]">
            <div className="container text-center">
                <h2 className="heading">Find a Doctor</h2>

                <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                    <input type="search" className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor" placeholder="Search Doctor" />
                    <button className="btn mt-0 rounded-[0px] rounded-r-md">Search</button>
                </div>
            </div>

        </section>

        <section>
            <div className="container">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        doctorList.map(doctor => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))
                    }
                </div>


            </div>
        </section>
    </>

}

export default Doctor;