import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader"
import loginService from "../service/loginService.js";

const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    console.log(loading);

    const submitHandler = event => {
        event.preventDefault();
        setLoading(true);
        loginService.login(formData)
            .then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken);
                localStorage.setItem('role', "patient");

                setLoading(false);
                navigate("/home");
                window.location.reload();
                toast.success("Dang nhap thanh cong");
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Dang nhap that bai");
            })

        // try {
        //     const res = await fetch(`${BASE_URL}/api/auth/login`, {
        //         method: "post",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(formData)
        //     })

        //     const result = await res.json();
        //     console.log(result);

        //     if (!res.ok) {
        //         console.log("Nguyen Viet Thanh Huyen")
        //         throw new Error("Loi");
        //     }
        //     console.log(result.accessToken);
        //     localStorage.setItem('accessToken', result.accessToken);
        //     localStorage.setItem('role', "patient");

        //     setLoading(false);
        //     //toast.success("Dang nhap thanh cong");
        //     navigate("/home");
        //     window.location.reload();

        // } catch (err) {
        //     toast.error(err.message);
        //     setLoading(false);
        // }
    }

    return <section className="px-5 lg:px-0">
        <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">Hello! <span className="text-primaryColor">Welcome</span> Back</h3>
            <form className="py-4 md:py-0" onSubmit={submitHandler}>
                <div className="mb-5">
                    <input type="text" placeholder="Enter Your Username" name="username" value={formData.username} onChange={handleInputChange} className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" required />
                </div>
                <div className="mb-5">
                    <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" required />
                </div>


                <div className="mt-7">
                    <button type="submit" className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">{loading ? <HashLoader size={25} color="#fff" /> : 'Login'}</button>
                </div>

                <p className="mt-5 text-textColor text-center">Don't have an account? <Link to='/register' className="text-primaryColor font-medium ml-1">Register</Link></p>
            </form>
        </div>
    </section>
}

export default Login;