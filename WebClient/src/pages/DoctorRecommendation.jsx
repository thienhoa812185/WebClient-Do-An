import recommendationService from '@/service/recommendationService';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { symptoms, specialties, diseases, specialtiesArray } from '@/assets/data/doctors';
import doctorService from '@/service/doctorService';
import DoctorCard from '@/temp/components/Doctors/DoctorCard';


const DoctorRecommendation = () => {

    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [doctorSuggestList, setDoctorSuggestList] = useState([]);
    const [disease, setDisease] = useState("Trống");
    const [specialty, setSpecialty] = useState("Trống");

    const handleChange = (event, value) => {
        setSelectedSymptoms(value);
        //console.log('Selected symptoms:', value);
    };

    const checkDisease = (diseaseName) => {
        const disease = diseases.find(d => d.en === diseaseName);
        if (disease) {
            return `${disease.en} - ${disease.vi}`
        } else {
            return `${diseaseName} not found in the list.`
        }
    }

    const checkSpecialties = (specialtieName) => {
        const specialtie = specialtiesArray.find(d => d.en === specialtieName);
        if (specialtie) {
            return `${specialtie.en} - ${specialtie.vi}`
        } else {
            return `${specialtie} not found in the list.`
        }
    }

    const handleSubmit = () => {
        if (selectedSymptoms.length == 0) {
            alert("Vui long nhap")
        }
        else {
            const listSymptoms = getEnNames(selectedSymptoms)
            console.log(getEnNames(selectedSymptoms))
            recommendationService.predict(listSymptoms)
                .then(res => {
                    console.log(res.data)
                    setDisease(checkDisease(res.data.diseases))
                    // setDisease(res.data.diseases)
                    setSpecialty(findSpecialtyWithDisease(res.data.diseases))
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const getEnNames = (array) => {
        return array.map(item => item.en);
    }

    const findSpecialtyWithDisease = (disease) => {
        for (let specialty in specialties) {
            if (specialties[specialty].includes(disease)) {
                return checkSpecialties(specialty);
            }
        }
        return null;
    }

    const handleSuggest = () => {
        console.log(specialty)
        const specialtie = specialtiesArray.find(d => `${d.en} - ${d.vi}` === specialty);
        if (specialtie) {
            const specialtieId = specialtie.id;
            doctorService.getTop4Doctors(specialtieId)
                .then(res => {
                    console.log(res.data)
                    setDoctorSuggestList(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            alert("Khong co gi het")
        }


    }




    return (
        <>
            <section className="bg-[#fff9ea]">
                <div className="container text-center">
                    <h2 className="heading">Hệ thống dự đoán bệnh tật</h2>

                    <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={symptoms}
                            getOptionLabel={(option) => `${option.vi} (${option.en})`}
                            filterSelectedOptions
                            fullWidth
                            onChange={handleChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nhập vào các triệu chứng"
                                    placeholder="Triệu chứng"
                                />
                            )}
                        />
                        <button className="btn mt-0 w-[200px] rounded-[0px] rounded-r-md" onClick={handleSubmit}>Dự đoán</button>
                    </div>
                </div>
            </section>
            <div className='bg-lime-200 rounded-md max-w-[600px] px-5 mx-auto'>
                <div className="mt-3">
                    <h3 className="text-[20px] pt-7 leading-[30px] text-headingColor font-semibold">Thông tin :</h3>
                    <ul className="pt-4 md:p-5">
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[20px] leading-6 font-semibold">Disease</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">Bệnh tật:</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">{disease}</p>
                        </li>
                        {/* <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Description</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">Mô tả</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Precaution</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">Cách phòng ngừa</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Medication</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">Thuốc điều trị</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Workouts</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">PHD in Surgeon</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Diets</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">Chế độ ăn kiêng</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li> */}

                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[20px] leading-6 font-semibold">Specialist</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">Chuyên khoa:</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">{specialty}</p>
                        </li>
                    </ul>
                    {
                        specialty!=="Trống" && <button onClick={handleSuggest} className="btn w-full rounded-md">Suggest top 4 best doctors</button>
                    }
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {
                            doctorSuggestList && doctorSuggestList.map(doctor => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}



export default DoctorRecommendation

