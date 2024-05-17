import DoctorCard from './../../temp/components/Doctors/DoctorCard';
import { doctors } from './../../assets/data/doctors'
import { useEffect, useState } from 'react';
import doctorService from '@/service/doctorService';
const Doctor = () => {

    const [doctorListOriginal, setDoctorListOriginal] = useState([])
    const [doctorList, setDoctorList] = useState([])

    const [formData, setFormData] = useState({
        specialist: '',
        position: '',
        name: '',
        minPrice: '',
        maxPrice: ''
    });

    console.log(formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let filtered = doctorListOriginal.filter(doctor => {
            let matches = true;
            if (formData.specialist && doctor.speciality.name !== formData.specialist) {
                matches = false;
            }
            if (formData.position && doctor.position !== formData.position) {
                matches = false;
            }
            if (formData.name && !doctor.name.toLowerCase().includes(formData.name.toLowerCase())) {
                matches = false;
            }
            if (formData.minPrice && doctor.examination_Price < parseFloat(formData.minPrice)) {
                matches = false;
            }
            if (formData.maxPrice && doctor.examination_Price > parseFloat(formData.maxPrice)) {
                matches = false;
            }
            return matches;
        });
        setDoctorList(filtered);
    };

    useEffect(() => {
        doctorService.getAllDoctor()
            .then(res => {
                console.log(res.data)
                setDoctorList(res.data)
                setDoctorListOriginal(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return <>
        <section className="bg-[#fff9ea]">
            <div className="container text-center">
                <h2 className="heading">Find a Doctor</h2>

                {/* <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                    <input type="search" className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor" placeholder="Search Doctor" />
                    <button className="btn mt-0 rounded-[0px] rounded-r-md">Search</button>
                </div> */}

                <div class="container mx-auto px-4">
                    <form class="filter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onSubmit={handleSubmit}>
                        <div class="item">
                            <label class="block mb-1">Specialist</label>
                            <select name="specialist" class="w-full p-2 border border-gray-300 rounded-md" onChange={handleChange} value={formData.specialist}>
                                <option value="">---</option>
                                <option value="Cơ Xương Khớp">Cơ Xương Khớp</option>
                                <option value="Thần Kinh">Thần Kinh</option>
                                {/* <option value="Polo">Polo</option> */}
                            </select>
                        </div>
                        <div class="item">
                            <label class="block mb-1">Position</label>
                            <select name="position" class="w-full p-2 border border-gray-300 rounded-md" onChange={handleChange} value={formData.position}>
                                <option value="">---</option>
                                <option value="Bác sĩ">Bác sĩ</option>
                                <option value="Thạc sĩ">Thạc sĩ</option>
                                <option value="Tiến sĩ">Tiến sĩ</option>
                            </select>
                        </div>
                        <div class="item">
                            <label class="block mb-1">Name</label>
                            <input name="name" type="text" class="w-full p-2 border border-gray-300 rounded-md" onChange={handleChange} value={formData.name} />
                        </div>
                        <div class="item">
                            <label class="block mb-1">Min Price</label>
                            <input name="minPrice" type="number" class="w-full p-2 border border-gray-300 rounded-md" onChange={handleChange} value={formData.minPrice} />
                        </div>
                        <div class="item">
                            <label class="block mb-1">Max Price</label>
                            <input name="maxPrice" type="number" class="w-full p-2 border border-gray-300 rounded-md" onChange={handleChange} value={formData.maxPrice} />
                        </div>
                        <div class="item submit col-span-full">
                            <button class="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">Search</button>
                        </div>
                    </form>
                    <div class="countResults text-center font-bold text-2xl py-4">
                        Found <span id="count">{doctorList.length}</span> results
                    </div>

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