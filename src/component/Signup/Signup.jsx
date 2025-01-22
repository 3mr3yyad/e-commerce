import axios from 'axios';
import { useFormik } from 'formik'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'Yup'


export default function Signup() {
  let [errMessage, setError] = useState(null);
  let baseURL = 'https://ecommerce.routemisr.com'
  let navg = useNavigate()
  let initialValues = {
    name: "",
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }
  let validationSchema = Yup.object({

    name: Yup.string().required("please enter your name").min(3, "Name is too short").max(20, "name is too long"),
    email: Yup.string().required("please enter your email").email("enter valid Email"),
    password: Yup.string().required("please enter a password").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "enter a strong password"),
    rePassword: Yup.string().required("please re-enter your password").oneOf([Yup.ref('password'), "passwords doesn't match"]),
    phone: Yup.string().required("please enter your phone number").matches(/^(20)?01[1250][0-9]{8}/, "phone number is not valid")
  });
  let registerForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: signupApi
  });
  async function signupApi(data) {
    await axios.post(`${baseURL}/api/v1/auth/signup`, data)
      .then((req) => {
        if (req.data.message == 'success') {
          navg('login')
        }
      }).catch((err) => { setError(err.response.data.message) });
  }

  return (
    <div>

      <form className="w-7/12 mx-auto mt-5" onSubmit={registerForm.handleSubmit}>
        <h2 className='text-2xl mb-5'>Register now :</h2>
        {errMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center" role="alert">
          <span className="font-semibold ">Warning: {errMessage}</span>
        </div> : ""}

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">Name :</label>
          <input
            type="text"
            id="name"
            name='name'
            value={registerForm.values.name}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
            className={registerForm.touched.name && registerForm.errors.name ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
          {registerForm.touched.name && registerForm.errors.name ? <span className='text-red-700'>{registerForm.errors.name}</span> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">E-mail :</label>
          <input
            type="email"
            id="email"
            name='email'
            value={registerForm.values.email}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
            className={registerForm.touched.email && registerForm.errors.email ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
          {registerForm.touched.email && registerForm.errors.email ? <span className='text-red-700'>{registerForm.errors.email}</span> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password :</label>
          <input
            type="password"
            id="password"
            name='password'
            value={registerForm.values.password}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
            className={registerForm.touched.password && registerForm.errors.password ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
          {registerForm.touched.password && registerForm.errors.password ? <span className='text-red-700'>{registerForm.errors.password}</span> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password :</label>
          <input
            type="password"
            id="rePassword"
            name='rePassword'
            value={registerForm.values.rePassword}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
            className={registerForm.touched.rePassword && registerForm.errors.rePassword ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
          {registerForm.touched.rePassword && registerForm.errors.rePassword ? <span className='text-red-700'>{registerForm.errors.rePassword}</span> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Phone :</label>
          <input
            type="tel"
            id="phone"
            name='phone'
            value={registerForm.values.phone}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
            className={registerForm.touched.phone && registerForm.errors.phone ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
          {registerForm.touched.phone && registerForm.errors.phone ? <span className='text-red-700'>{registerForm.errors.phone}</span> : ""}
        </div>

        <button disabled={!(registerForm.isValid && registerForm.dirty)}
          type="submit" className="ml-auto text-white bg-main hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-ma disabled:opacity-50 disabled:hover:bg-main">Register</button>
      </form>
    </div>
  )
}
