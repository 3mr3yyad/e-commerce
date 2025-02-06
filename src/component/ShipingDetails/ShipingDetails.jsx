import axios from "axios"
import { useFormik } from "formik"
import { useParams } from "react-router-dom"
import * as Yup from 'Yup'


export default function ShipingDetails() {
    let { id } = useParams()
    const headerOptions = {
        headers: {
            token: localStorage.getItem('token')
        }
    }

    let validationSchema = Yup.object({

        details: Yup.string().required("please enter your Address").min(3, "too short"),
        city: Yup.string().required("please enter your city"),
        phone: Yup.string().required("please enter your phone number").matches(/^(20)?01[1250][0-9]{8}/, "phone number is not valid")
    });

    let shipingFormik = useFormik({
        validationSchema,
        initialValues: {
            details: '',
            city: '',
            phone: ''

        },
        onSubmit: checkOutSession
    })
    function checkOutSession(values) {
        let data = {
            shippingAddress: values
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://3mr3yyad.github.io/e-commerce`, data, headerOptions).then((req) => {
            window.open(req.data.session.url, "_blank", "width=500px,height=700px")
        })
    }
    return (
        <>
            <form className="w-7/12 mx-auto mt-5" onSubmit={shipingFormik.handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 ">Address :</label>
                    <input
                        value={shipingFormik.values.details}
                        onChange={shipingFormik.handleChange}
                        onBlur={shipingFormik.handleBlur}
                        name='details'
                        type="text"
                        id="details"
                        className={shipingFormik.touched.details && shipingFormik.errors.details ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
                    {shipingFormik.touched.details && shipingFormik.errors.details ? <span className='text-red-700'>{shipingFormik.errors.email}</span> : ""}
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 ">Governorate / City :</label>



                    <select
                        value={shipingFormik.values.city}
                        onChange={shipingFormik.handleChange}
                        onBlur={shipingFormik.handleBlur}
                        name='city'
                        type="text"
                        id="city"
                        className={shipingFormik.dirty.city && shipingFormik.values.city != '--' ? " bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "}>
                        <option selected="selected">--</option>
                        <option >Cairo</option>
                        <option>Giza</option>
                        <option>Alexandria</option>
                        <option>Aswan</option>
                        <option>Asyut</option>
                        <option>Beheira</option>
                        <option>Beni Suef</option>
                        <option>Dakahlia</option>
                        <option>Damietta</option>
                        <option>Faiyum</option>
                        <option>Gharbia</option>
                        <option>Ismailia</option>
                        <option>Kafr El Sheikh</option>
                        <option>Luxor</option>
                        <option>Matrouh</option>
                        <option>Minya</option>
                        <option>Monufia</option>
                        <option>New Valley</option>
                        <option>North Sinai</option>
                        <option>Port Said</option>
                        <option>Qalyubia</option>
                        <option>Qena</option>
                        <option>Red Sea</option>
                        <option>Sharqia</option>
                        <option>Sohag</option>
                        <option>South Sinai</option>
                        <option>Suez</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 "> Phone Number :</label>
                    <input
                        value={shipingFormik.values.phone}
                        onChange={shipingFormik.handleChange}
                        onBlur={shipingFormik.handleBlur}
                        name='phone'
                        type="tel"
                        id="phone"
                        className={shipingFormik.touched.phone && shipingFormik.errors.phone ? "bg-gray-50 border border-red-600 text-gray-900 text-sm rounded-lg focus:red-600 focus:border-red-600 focus:outline-none block w-full p-2.5 " : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 focus:outline-none block w-full p-2.5 "} />
                    {shipingFormik.touched.phone && shipingFormik.errors.phone ? <span className='text-red-700'>{shipingFormik.errors.email}</span> : ""}
                </div>
                <button disabled={!(shipingFormik.isValid && shipingFormik.dirty)} className="text-white bg-main hover:bg-green-600 transition-all rounded py-1 w-full text-center disabled:opacity-50 disabled:hover:bg-main">Purchase <i className="fa-regular fa-credit-card"></i></button>
            </form>
        </>
    )
}
