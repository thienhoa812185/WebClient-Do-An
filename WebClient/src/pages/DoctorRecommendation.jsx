import recommendationService from '@/service/recommendationService';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { symptoms, specialties } from '@/assets/data/doctors';

const DoctorRecommendation = () => {

    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [disease, setDisease] = useState();
    const [specialty, setSpecialty] = useState();

    const handleChange = (event, value) => {
        setSelectedSymptoms(value);
        //console.log('Selected symptoms:', value);
    };

    const handleSubmit = () => {
        const listSymptoms = getEnNames(selectedSymptoms)
        console.log(getEnNames(selectedSymptoms))
        recommendationService.predict(listSymptoms)
            .then(res => {
                console.log(res.data);
                setDisease(res.data.diseases)
                setSpecialty(findSpecialtyWithDisease(res.data.diseases))
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getEnNames = (array) => {
        return array.map(item => item.en);
    }

    const findSpecialtyWithDisease = (disease) => {
        for (let specialty in specialties) {
            if (specialties[specialty].includes(disease)) {
                return specialty;
            }
        }
        return null;
    }

    console.log(selectedSymptoms)

    // const [symptoms, setSymptoms] = useState([])

    // useEffect(() => {
    //     recommendationService.getAllSymptoms()
    //         .then(res => {
    //             setSymptoms(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [])

    // console.log(symptoms)

    return (
        <>
            <section className="bg-[#fff9ea]">
                <div className="container text-center">
                    <h2 className="heading">Doctor Recommendation</h2>

                    <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={symptoms}
                            getOptionLabel={(option) => `${option.vi} (${option.en})`}
                            //defaultValue={[top100Films[13]]}
                            filterSelectedOptions
                            fullWidth
                            onChange={handleChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Enter the symptoms"
                                    placeholder="Symptoms"
                                />
                            )}
                        />
                        <button className="btn mt-0 rounded-[0px] rounded-r-md">Predict</button>
                    </div>
                </div>
            </section>
            <div className='max-w-[700px] px-5 mx-auto'>
                <div className="mt-12">
                    <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Information</h3>
                    <ul className="pt-4 md:p-5">
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Disease</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">{disease}</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Description</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">PHD in Surgeon</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Precaution</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">PHD in Surgeon</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>
                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Medication</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">PHD in Surgeon</p>
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
                                <p className="text-[16px] leading-6 font-medium text-textColor">PHD in Surgeon</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>

                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Diets</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">PHD in Surgeon</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>

                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">Specialist</span>
                                <p className="text-[16px] leading-6 font-medium text-textColor">{specialty}</p>
                            </div>
                            <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                        </li>
                    </ul>
                    <button onClick={handleSubmit} className="btn w-full rounded-md">Suggest top 4 best doctors</button>
                </div>
            </div>

        </>
    )
}



export default DoctorRecommendation

