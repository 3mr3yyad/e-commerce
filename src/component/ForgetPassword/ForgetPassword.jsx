import { useState } from 'react'
import * as Yup from 'Yup'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios';



export default function ForgetPassword() {
    let navg = useNavigate();
    let baseURL = 'https://ecommerce.routemisr.com'
    let [errMessage, setError] = useState(null);
    let [formDisplay, setformDisplay] = useState(true);
    let initialValues = {
        resetCode: '',
    };
    let validYup = Yup.object({
        email: Yup.string().required("please enter your email").email("enter valid Email"),
    });
    let valid2Yup = Yup.object({
        resetCode: Yup.string().required("please enter the reset code which sent to your email"),
    });

    let forgetPasswordForm = useFormik({
        initialValues,
        onSubmit: forgetPasswordApi,
        validationSchema: validYup
    });

    let verifyResetCodeForm = useFormik({
        initialValues: {
            resetCode: ''
        },
        onSubmit: verifyResetCodeApi,
        validationSchema: valid2Yup
    });
    function verifyResetCodeApi(data) {
        axios.post(`${baseURL}/api/v1/auth/verifyResetCode`, data)
            .then((req) => {
                if (req.data.status == 'Success') {
                    navg('/update-password')
                }
            }).catch((err) => {
                setError(err.response.data.message)
            })
    }

    function forgetPasswordApi(data) {
        axios
            .post(`${baseURL}/api/v1/auth/forgotPasswords`, data)
            .then((req) => {
                if (req.data.statusMsg == 'success') {
                    setformDisplay(false)
                }
            })
            .catch((err) => {
                setError(err.response.data.message)
            });
    }




    return (
        <>
            {formDisplay ? <div>
                <form className="w-8/12 mx-auto mt-5" onSubmit={forgetPasswordForm.handleSubmit}>
                    <h2 className='text-2xl mb-5'>Reset code :</h2>
                    {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center" role="alert">
                        <span className="font-semibold ">Warning: {errMessage}</span>
                    </div> : ""}
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Enter your email :</label>
                        <input
                            value={forgetPasswordForm.values.email}
                            onChange={forgetPasswordForm.handleChange}
                            onBlur={forgetPasswordForm.handleBlur}
                            name='email'
                            type="email"
                            id="email"
                            className={forgetPasswordForm.touched.email && forgetPasswordForm.errors.email ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
                        {forgetPasswordForm.touched.email && forgetPasswordForm.errors.email ? <span className='text-red-700'>{forgetPasswordForm.errors.email}</span> : ""}
                    </div>


                    <button disabled={!(forgetPasswordForm.isValid && forgetPasswordForm.dirty)}
                        type="submit" className="ml-auto text-white bg-main hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-ma disabled:opacity-50 disabled:hover:bg-main">Send</button>
                </form>
            </div>
                :
                <div>
                    <form className="w-8/12 mx-auto mt-5" onSubmit={verifyResetCodeForm.handleSubmit}>
                        <h2 className='text-2xl mb-5'>Password Reset :</h2>
                        
                        {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center" role="alert">
                            <span className="font-semibold ">Warning: {errMessage}</span>
                        </div> : <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 text-center" role="alert">
                            <span className="font-semibold">code has been set to {forgetPasswordForm.values.email}</span> 
                        </div>}
                        <div className="mb-5">
                            <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 ">Enter your reset code :</label>
                            <input
                                value={verifyResetCodeForm.values.resetCode}
                                onChange={verifyResetCodeForm.handleChange}
                                onBlur={verifyResetCodeForm.handleBlur}
                                name='resetCode'
                                type="string"
                                id="resetCode"
                                className={verifyResetCodeForm.touched.resetCode && verifyResetCodeForm.errors.resetCode ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
                            {verifyResetCodeForm.touched.resetCode && verifyResetCodeForm.errors.resetCode ? <span className='text-red-700'>{verifyResetCodeForm.errors.resetCode}</span> : ""}
                        </div>


                        <button disabled={!(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)}
                            type="submit" className="ml-auto text-white bg-main hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-ma disabled:opacity-50 disabled:hover:bg-main">Confirm</button>
                    </form>
                </div>}



        </>
    )
}
