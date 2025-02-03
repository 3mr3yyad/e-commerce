import { useState } from 'react';
import useApi from '../../Context/Hooks/useApi'

export default function Brands() {
  let [page, setPage] = useState(1)
  let { data, isLoading } = useApi('brands')
  let nums = [];
  for (let i = 1; i <= data?.data?.metadata?.numberOfPages; i++){
    nums.push(i)
  }

  function getPageNum(e) {
    let page = e.target.getAttribute("page")
    setPage(page)
  }
  if (isLoading) {
    return <><div className='flex justify-center items-center h-screen'><span className="loader"></span></div></>
  }
  return (
    <div className="flex flex-wrap my-5 justify-center w-11/12 mx-auto">
      {data?.data?.data?.map((el) => {
      return (
          <div className="lg:w-2/12 md:w-3/12 sm:w-5/12 max-sm:w-5/12  m-3 p-2 border hover:border-main transition-all rounded" key={el._id}>
              <img src={el.image} className="object-contain lg:h-48 md:h-48 sm:h-24 max-sm:h-24 mx-auto" alt={el.name} />
              <h5 className="text-center font-semibold text-lg sm:text-sm max-sm:text-sm">{el.name}</h5>
          </div>
      )
      })}
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
                    <a page={el} href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{el}</a>
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
    </div>
  )
}