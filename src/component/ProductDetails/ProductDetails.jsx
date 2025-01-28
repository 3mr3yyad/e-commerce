import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Slider from "react-slick"


export default function ProductDetails() {
    let [product, setProduct] = useState(null)
    let { id } = useParams()
    let [loading, setLoading] = useState(true)
    function getDetails() {
        setLoading(true)
        axios
            .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((req) => {
            setProduct(req.data.data)
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getDetails(id)
    }, [id])
    function changeImg(e) {
        let imgSrc = e.target.getAttribute("src")
        document.getElementById("mainImg").setAttribute("src", imgSrc)
     }
    return (
        <>{ loading ? <div className='flex justify-center items-center h-screen'><span className="loader"></span></div> :
            <div className="w-10/12 mx-auto my-16">
            <div className="flex justify-between items-center">
                <div className="w-3/12">
                    <img className="w-full rounded" id="mainImg" src={product?.imageCover} alt={product?.title} />
                    <div className="flex">
                        {product?.images.map((image, i) => {
                            return (
                                <div onClick={changeImg} key={i} className="mx-1 mt-1 cursor-pointer border rounded transition-all hover:border-main">
                                    <img src={image} className="w-full" alt="" />
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className="w-8/12 ">
                    <h2 className="font-semibold mb-2">{product?.title}</h2>
                    <p className="text-gray-500 mb-4">{product?.description}</p>
                    <span >{product?.category.name}</span>
                    <div className='flex justify-between my-3'>
                        <p>{product?.price} EGP</p>
                        <span className='text-gray-500'><i className='fa-solid fa-star text-yellow-300'></i>{product?.ratingsAverage}</span>
                    </div>
                    <button className='bg-main text-white p-2 rounded hover:bg-green-600 w-full '>add to cart <i className="fa-solid fa-circle-plus"></i></button>

                </div>
            </div>
        </div>
    }
        </>
    )
}
