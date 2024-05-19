import { useEffect, useState } from "react";
import { formateDate } from "../../utils/formateDate";

const DoctorAbout = ({ doctor }) => {

    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');

    useEffect(() => {
        if (typeof doctor.education === 'string') {
            setEducation(doctor.education);
        } else {
            console.error('Education must be a string');
        }

        if (typeof doctor.experience === 'string') {
            setExperience(doctor.experience);
        } else {
            console.error('Experience must be a string');
        }
    }, [doctor.education, doctor.experience]);

    function splitByComma(inputString) {
        if (typeof inputString !== 'string') {
            throw new Error('Input must be a string');
        }
        return inputString.split('|');
    }

    const educationList = splitByComma(education);
    const experienceList = splitByComma(experience);

    console.log(educationList)
    console.log(experienceList)

    return (
        <div>
            <div>
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
                    About of
                    <span className="text-irisBlueColor font-bold text-[24px] leading-9">{doctor.name}</span>
                </h3>
                <p className="text__para">
                    {doctor.description}
                </p>
            </div>
            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Education</h3>
                {/* <ul className="pt-4 md:p-5">
                    {educationList.map((element, index) => (
                        <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                            <div>
                                <p className="text-[16px] leading-6 font-medium text-textColor">{element.trim()}</p>
                            </div>
                        </li>
                    ))}

                    
                    <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                        <div>
                            <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">{formateDate("09-02-2010")}</span>
                            <p className="text-[16px] leading-6 font-medium text-textColor">PHD in Surgeon</p>
                        </div>
                        <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                    </li>
                </ul> */}
                <ul className="pt-4 md:p-5 list-disc list-inside">
                    {educationList.map((element, index) => (
                        <li key={index} className="mb-[30px]">
                            {element}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Experience</h3>
                <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                    {
                        experienceList.map((element, index) => (
                            <li key={index} className="p-4 rounded bg-[#fff9ea]">
                                <p className="text-[16px] leading-6 font-medium text-textColor">{element}</p>
                            </li>
                        ))

                    }
                    {/* <li className="p-4 rounded bg-[#fff9ea]">
                        <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                            {formateDate("07-04-2010")} - {formateDate("08-13-2014")}
                        </span>
                        <p className="text-[16px] leading-6 font-medium text-textColor">Sr. Surgeon</p>

                        <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                    </li>
                    <li className="p-4 rounded bg-[#fff9ea]">
                        <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                            {formateDate("07-04-2010")} - {formateDate("08-13-2014")}
                        </span>
                        <p className="text-[16px] leading-6 font-medium text-textColor">Sr. Surgeon</p>

                        <p className="text-[14px] leading-5 font-medium text-textColor">New Apollo Hospital, New York.</p>
                    </li> */}
                </ul>
            </div>
        </div>
    )

}

export default DoctorAbout;