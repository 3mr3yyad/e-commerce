import { useContext } from "react"
import { useParams } from "react-router-dom"
import { cartContext } from "../../Context/CartContextProvider"
import toast, { Toaster } from "react-hot-toast"
import useApi from "../../Context/Hooks/useApi"

export default function ProductDetails() {
    let { id } = useParams()
    let {addUserCart, setNumsCartItems} = useContext(cartContext)
    let { isLoading, data } = useApi(`products/${id}`)
        
        
    let product = data?.data?.data;

    function changeImg(e) {
        let imgSrc = e.target.getAttribute("src")
        document.getElementById("mainImg").setAttribute("src", imgSrc)
    }
    function addToCart(id) {
        addUserCart(id)
            .then((req) => {
                setNumsCartItems(req.data.numOfCartItems)
                toast.success(req.data.message)
            })
            .catch((err) => {
                toast.error(err.response.data.message)
            })
    }
    return (
        <>
            <Toaster/>
            {isLoading ? <div className='flex justify-center items-center h-screen'><span className="loader"></span></div> :
            <div className="w-10/12 mx-auto my-16">
                <div className="flex justify-between items-center flex-wrap">
                    <div className="md:w-3/12 max-sm:w-full sm:w-full sm:mb-4 max-sm:mb-4">
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
                    <div className="md:w-8/12 max-sm:w-full sm:w-full">
                        <h2 className="font-semibold mb-2">{product?.title}</h2>
                        <p className="text-gray-500 mb-4">{product?.description}</p>
                        <span >{product?.category.name}</span>
                        <div className='flex justify-between my-3'>
                            <p>{product?.price} EGP</p>
                            <span className='text-gray-500'><i className='fa-solid fa-star text-yellow-300'></i>{product?.ratingsAverage}</span>
                        </div>
                        <button onClick={()=>{addToCart(id)}} className='bg-main text-white p-2 rounded hover:bg-green-600 w-full transition-all'>add to cart <i className="fa-solid fa-circle-plus"></i></button>

                    </div>
                </div>
            </div>
        }
        </>
    )
}
