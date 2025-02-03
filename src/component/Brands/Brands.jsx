import useApi from '../../Context/Hooks/useApi'

export default function Brands() {
  let {data, isLoading} = useApi('brands')
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
  })}</div>
  )
}