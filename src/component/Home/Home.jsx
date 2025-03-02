import {Link} from 'react-router-dom'
import axios from 'axios'
import { useContext, useState } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from './../CategorySlider/CategorySlider';
import { useQuery } from '@tanstack/react-query';
import { cartContext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {

  let [page, setPage] = useState(1)
  let {addUserCart, setNumsCartItems} = useContext(cartContext)
  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=24`)
  }
  
  let { data, isLoading } = useQuery({
    queryKey: ['product', page],
    queryFn: getAllProducts
  })
  let nums = [];
  for (let i = 1; i <= data?.data?.metadata?.numberOfPages; i++){
    nums.push(i)
  }

  function getPageNum(e) {
    let page = e.target.getAttribute("page")
    setPage(page)
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
        <div className='w-11/12 mx-auto my-6'>
          <MainSlider />
          <CategorySlider/>
          <div className='flex flex-wrap'>
            {data?.data?.data?.map((product) => {
              let { _id, title, imageCover, price, ratingsAverage, category } = product;
              let { name } = category;
              return (
                <div key={_id} className='lg:w-2/12 md:w-3/12 sm:w-6/12 max-sm:w-6/12 w-full p-2 mb-2 hover:border rounded hover:border-main duration-500 group overflow-hidden'>
                  <Link to={`/product-details/${_id}`}>
                  <img src={imageCover} className='w-full' alt={title} />
                  <h5 className='text-main text-sm'>{name}</h5>
                  <h2 className='text-lg font-semibold mb-3'>{title.split(" ").slice(0, 2).join(' ')}</h2>
                  <div className='flex justify-between'>
                    <p>{price} EGP</p>
                    <span className='text-gray-500'><i className='fa-solid fa-star text-yellow-300'></i>{ratingsAverage}</span>
                  </div>
                  </Link>
                  <button onClick={()=>addToCart(_id)} className='bg-main text-white p-2 rounded hover:bg-green-600 w-full mt-3 translate-y-28 group-hover:translate-y-0 transition-all'>add to cart <i className="fa-solid fa-circle-plus"></i></button>
                </div>
              )
            })}

          </div>
          <nav aria-label="Page navigation example">
            <ul className="flex justify-center items-center -space-x-px h-10 text-base mt-5">
              <li>
                <a className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700     ">
                  <span className="sr-only">Previous</span>
                  <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                  </svg>
                </a>
              </li>
              {nums?.map((el) => {
                return (
                  <li key={el} onClick={getPageNum}>
                    <a page={el}  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{el}</a>
                  </li>
                )
              })}

              <li>
                <a className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700     ">
                  <span className="sr-only">Next</span>
                  <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>}




    </>
  )
}
