import { useContext, useEffect, useState } from "react"
import { cartContext } from "../../Context/CartContextProvider"
import { Link } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"

export default function Cart() {
  let { getUserCart, deleteProduct, setNumsCartItems, clearCart, updateCartItemCount } = useContext(cartContext)
  let [cartData, setCartData] = useState(null)
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    getCartData()
  }, [])


  function getCartData() {
    setLoading(true)
    getUserCart()
      .then((req) => {
        console.log(req.data.data)
        setCartData(req.data.data)
        setLoading(false)
      })
      .catch((err) => { console.log(err) })
    setLoading(false)
  }

  function removeProduct(id) {
    deleteProduct(id).then((req) => {
      setNumsCartItems(req.data.numOfCartItems)
      setCartData(req.data.data)
      toast.success('Removed from your cart')
    })
      .catch((err) => {
        toast.error(err.data.message)
      })
  }

  function updateCount(id, count) {
    updateCartItemCount(id, count).then((req) => {
      setCartData(req.data.data)
      setNumsCartItems(req.data.numOfCartItems)
      toast.success('items updated')
    })
  }

  function deleteAll() {
    clearCart().then((req) => {
      if (req.data.message == 'success') {
        setCartData(null)
        setNumsCartItems(null)
        toast.success('All Items has been removed')
      }
    })
  }

  if (loading) {
    return <div className='flex justify-center items-center h-screen'><span className="loader"></span></div>
  }

  return (
    <>
      <Toaster />
      {cartData?.products.length > 0 ?
        <>
        <div className="w-10/12 mx-auto bg-gray-100 my-5 rounded p-4">
          <div className="flex">
            <div className="w-10/12">
              <h2 className="font-semibold text-lg">Shop Cart:</h2>
              <p className="text-main">Total Cart Price: {cartData?.totalCartPrice} EGP</p>
            </div>
              
          </div>

          <div className="divide-y-2 my-3 divide-gray-300">
            {cartData?.products?.map((item) => {
              return <div key={item._id} className="flex items-center">
                <div className="w-10/12 my-5">
                  <div className="flex items-center">
                    <div className="w-1/12">
                      <img src={item.product.imageCover} alt={item.product.title} className="w-full" />
                    </div>
                    <div className="w-11/12 ms-5">
                      <h2 className="font-semibold">{item.product.title}</h2>
                      <p className="text-main">Price: {item.price} EGP</p>
                      <button onClick={() => { removeProduct(item.product._id) }} className="border mt-3 hover:border-red-600 hover:text-red-600 transition-all group px-2 py-1 rounded"><i className="fa-regular fa-trash-can text-main group-hover:text-red-600 transition-all"></i> Remove</button>
                    </div>
                  </div>
                </div>
                <div className="w-2/12">
                  <div>
                    <i onClick={()=>{updateCount(item.product._id, item.count + 1)}} className="cursor-pointer fa-solid fa-plus p-1 text-sm m-1 border border-main rounded hover:bg-main hover:text-white transition-all" />
                    <span className="mx-1">{item.count}</span>
                    <i onClick={()=>{updateCount(item.product._id, item.count - 1)}} className="cursor-pointer fa-solid fa-minus p-1 text-sm m-1 border border-main rounded hover:bg-red-600 hover:text-white transition-all hover:border-red-600" />
                  </div>
                </div>
              </div>
            })}

            </div>
            <div className="flex mt-5">
              <div className="w-9/12">
                <Link to={"/shiping-details/"+cartData._id}>
                <button className="text-white bg-main hover:bg-green-600 transition-all rounded py-1 w-full text-center ">CheckOut <i className="fa-solid fa-cash-register"></i></button>
                </Link>
              </div>
            <div className="w-2/12 ms-5">
                <button onClick={deleteAll} className="w-full border  text-red-600 hover:bg-red-600 hover:text-white transition-all group px-2 py-1 rounded"> Clear All <i className="fa-solid fa-sack-xmark"></i></button>
              </div>
          </div>
        </div>
        </>
        :
        <div className="w-10/12 mx-auto bg-gray-200 my-5 rounded p-4 text-center h-96">
          <h2 className="font-semibold text-4xl text-main mt-10 pb-14">Your Cart Is Empty</h2>
          <Link to="/" className="underline text-blue-500 hover:text-blue-700 transition-all"><i className="fa-solid fa-basket-shopping"></i> START SHOPING.. !</Link>
        </div>
      }
    </>
  )
}
