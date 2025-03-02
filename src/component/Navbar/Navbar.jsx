
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LogoImg from '../../assets/images/freshcart-logo.svg'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContextProvider'
import { cartContext } from '../../Context/CartContextProvider'

export default function Navbar() {
  let { token, userData, setToken } = useContext(AuthContext)
  let {numsCartItems} = useContext(cartContext)
  let navg = useNavigate()
  function logout() {
    localStorage.removeItem("token")
    setToken(null)
    navg("/login")
  }
  return (
    

<nav className="bg-white border-gray-200 shadow">
  <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={LogoImg} className="h-8" alt="Flowbite Logo" />
        
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-12 h-10 justify-center text-sm text-main ms-auto rounded-lg border border-main md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600 " aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      {token ? <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
        <li>
              <NavLink to="/" className={(x)=>x.isActive? "block py-2 px-3 text-main" : "block py-2 px-3  text-sec" } aria-current="page">Home</NavLink>
            </li>
        <li>
          <NavLink to="/product" className={(x)=>x.isActive? "block py-2 px-3 text-main" : "block py-2 px-3  text-sec" } aria-current="page">Products</NavLink>
        </li>
        
        <li>
          <NavLink to="/brands" className={(x)=>x.isActive? "block py-2 px-3 text-main" : "block py-2 px-3  text-sec" } aria-current="page">Brands</NavLink>
        </li>
        <li>
          <NavLink to="/category" className={(x)=>x.isActive? "block py-2 px-3 text-main" : "block py-2 px-3  text-sec" } aria-current="page">Category</NavLink>
            </li>
            <li className='relative'>
              <NavLink to="/cart" className={(x) => x.isActive ? "block py-2 px-3 text-main" : "block py-2 px-3  text-sec"} aria-current="page">Cart<i className='fa-solid fa-cart-shopping'></i></NavLink>
              <span className='absolute top-0 end-0 bg-red-500 rounded px-1 text-white text-xs'>{numsCartItems}</span>
        </li>
        
          </ul> :
            ""}
    </div>
    <div className="hidden w-full md:block md:w-auto ms-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row  rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
        <li>
              <Link href="#" className="block py-2 px-1 active text-sec" aria-current="page"><i className="fa-brands fa-instagram"></i></Link>
            </li>
        <li>
          <Link href="#" className="block py-2 px-1 active text-sec" aria-current="page"><i className="fa-brands fa-facebook"></i></Link>
        </li>
        <li>
          <Link href="#" className="block py-2 px-1 active text-sec" aria-current="page"><i className="fa-brands fa-tiktok"></i></Link>
        </li>
        <li>
          <Link href="#" className="block py-2 px-1 active text-sec" aria-current="page"><i className="fa-brands fa-twitter"></i></Link>
        </li>
        <li>
          <Link href="#" className="block py-2 px-1 active text-sec" aria-current="page"><i className="fa-brands fa-linkedin"></i></Link>
        </li>
        <li>
          <Link href="#" className="block py-2 px-1 active text-sec" aria-current="page"><i className="fa-brands fa-youtube"></i></Link>
            </li>
            {token ? <>
              <li>
                <span  className="block py-2 px-3 active text-sec font-semibold cursor-pointer transition hover:text-main"  aria-current="page" onClick={logout}>LogOut</span>
              </li>
              <li>
                <span className="block py-2 px-3 active text-sec" aria-current="page">Hello {userData?.name}</span>
              </li>
            </> : <> <li>
          <NavLink to="/register"  className={(x)=>x.isActive? "block py-2 px-3 text-main" : "block py-2 px-3 active text-sec" } aria-current="page" >SignUp</NavLink>
        </li>
        <li>
          <NavLink to="/login"  className={(x)=>x.isActive? "block py-2 px-3 text-main" : "block py-2 px-3 active text-sec" } aria-current="page">LogIn</NavLink>
        </li> </> }
      </ul>
    </div>
  </div>
</nav>

  )
}
