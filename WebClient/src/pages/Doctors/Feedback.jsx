import { useState } from 'react';
import avatar from '../../assets/images/avatar-icon.png';
import { formateDate } from '../../utils/formateDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';
import { toast } from "react-toastify";


const Feedback = ({ comments, id }) => {

    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    const [commentList, setCommentList] = useState(comments)

    console.log(commentList);

    const handleShowFeedbackForm = () => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            setShowFeedbackForm(true)
        }
        else {
            toast.error("Ban chua dang nhap");
        }
    }

    return (
        <div>
            <div className="mb-[50px]">
                <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">All reviews ({commentList.length})</h4>
                {
                    commentList.map(comment => (
                        <div className="flex justify-between gap-10 mb-[30px]">
                            <div className="flex gap-3">
                                <figure className='w-10 h-10 rounded-full'><img className='w-full' src={avatar} alt="" /></figure>

                                <div>
                                    <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>{comment.patient.name}</h5>
                                    <p className='text-[14px] leading-6 text-textColor'>{formateDate(comment.date)}</p>
                                    <p className='text__para mt-3 font-medium text-[15px]'>{comment.description}</p>
                                </div>
                            </div>
                            <div className='flex gap-1'>
                                {[...Array(comment.pointEvaluation).keys()].map((_, index) => <AiFillStar key={index} color='#0067FF' />)}
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                !showFeedbackForm && <div className='text-center'><button className='btn' onClick={handleShowFeedbackForm}>Give Feedback</button></div>
            }
            {showFeedbackForm && <FeedbackForm id={id} />}
        </div>
    )

}

export default Feedback;