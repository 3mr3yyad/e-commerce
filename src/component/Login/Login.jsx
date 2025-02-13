import { useContext, useState } from 'react'
import * as Yup from 'Yup'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContextProvider';


export default function Login() {
  let {setToken, decodeData} = useContext(AuthContext)
  let navg = useNavigate();
  let baseURL = 'https://ecommerce.routemisr.com'
  let [errMessage, setError] = useState(null);
  let initialValues = {
    email: '',
    password: '',
  };
  let validationSchema = Yup.object({
    email: Yup.string().required("please enter your email").email("enter valid Email"),
    password: Yup.string().required("please enter your password")
  });

  let loginForm = useFormik({
    initialValues,
    onSubmit: loginApi,
    validationSchema
  });

  function loginApi(data) {
    axios.post(`${baseURL}/api/v1/auth/signin` ,data).then((req) => {
      
      if (req.data.message == 'success') {
        setToken(req.data.token)
        localStorage.setItem("token", req.data.token)
        decodeData(req.data.token)
        navg('/')
      }
    }).catch((err) => { setError(err.response.data.message) });
  }



  return (
      <div>
        <form className="w-8/12 mx-auto mt-5" onSubmit={loginForm.handleSubmit}>
        <h2 className='text-2xl mb-5'>Login now :</h2>
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password :</label>
            <input
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              name='password'
              type="password"
              id="password"
            className={loginForm.touched.password && loginForm.errors.password ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
          {loginForm.touched.password && loginForm.errors.password ? <span className='text-red-700'>{loginForm.errors.password}</span> : ""}
          </div>

          <button disabled={!(loginForm.isValid && loginForm.dirty)}
          type="submit" className="ml-auto text-white bg-main hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-50 disabled:hover:bg-main">Login</button>
        <Link to="/forget-password" className='ms-5 mt-3 text-sm text-blue-500 hover:text-blue-700 hover:underline'>Forgot your password..?</Link>
        </form>
      </div>
  )
}
