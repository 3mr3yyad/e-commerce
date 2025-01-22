import { useState } from 'react'
import * as Yup from 'Yup'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios';


export default function UpdatePasword() {
    let navg = useNavigate();
    let baseURL = 'https://ecommerce.routemisr.com'
    let [errMessage, setError] = useState(null);
    let initialValues = {
        email: '',
        newPassword: '',
    };
    let validationSchema = Yup.object({
        email: Yup.string().required("please enter your email").email("enter valid Email"),
        newPassword: Yup.string().required("please enter your new password")
    });

    let loginForm = useFormik({
        initialValues,
        onSubmit: updatePasswordApi,
        validationSchema
    });

    function updatePasswordApi(data) {
        axios.put(`${baseURL}/api/v1/auth/resetPassword`, data).then((req) => {
            if (req.data.token) {
                navg('/login')
            }
        }).catch((err) => { setError(err.response.data.message) });
    }



    return (
        <div>
            <form className="w-8/12 mx-auto mt-5" onSubmit={loginForm.handleSubmit}>
                <h2 className='text-2xl mb-5'>Update password :</h2>
                {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center" role="alert">
                    <span className="font-semibold ">Warning: {errMessage}</span>
                </div> : ""}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">E-mail :</label>
                    <input
                        value={loginForm.values.email}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        name='email'
                        type="email"
                        id="email"
                        className={loginForm.touched.email && loginForm.errors.email ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
                    {loginForm.touched.email && loginForm.errors.email ? <span className='text-red-700'>{loginForm.errors.email}</span> : ""}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">new password :</label>
                    <input
                        value={loginForm.values.newPassword}
                        onChange={loginForm.handleChange}
                        onBlur={loginForm.handleBlur}
                        name='newPassword'
                        type="password"
                        id="newPassword"
                        className={loginForm.touched.newPassword && loginForm.errors.newPassword ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
                    {loginForm.touched.newPassword && loginForm.errors.newPassword ? <span className='text-red-700'>{loginForm.errors.newPassword}</span> : ""}
                </div>

                <button disabled={!(loginForm.isValid && loginForm.dirty)}
                    type="submit" className="ml-auto text-white bg-main hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-ma disabled:opacity-50 disabled:hover:bg-main">Confirm</button>
                
            </form>
        </div>
    )
}
