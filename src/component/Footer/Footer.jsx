import { Link } from 'react-router-dom'
import LogoImg from '../../assets/images/freshcart-logo.svg'
import Payments from '../../assets/images/png-clipart-powerd-by-stripe-payment-methods-credit-cards-tech-companies-payments.png'
import Stores from '../../assets/images/pngegg.png'
import Stores_2 from '../../assets/images/pngegg (1).png'

export default function Footer() {
  return (
    <>
      <footer className='bg-slate-100 p-5 border-gray-200 shadow divide-y-2  divide-gray-300'>
        <div className='m-5 md:ps-8 sm:mx-auto'>
          <Link to="/" className="flex items-center space-x-3">
            <img src={LogoImg} className="h-8" alt="Flowbite Logo" />
          </Link>
          <h3 className='text-gray-600 md:ms-10'>your seamless shopping experience.</h3>
        </div>
        <div className='p-5 flex items-center justify-evenly flex-wrap'>
          <div className='flex items-center'>
          <h3 className='font-semibold'>Payment Partenres</h3>
          <img src={Payments} className="h-16" alt="Payment methods" />
          </div>
          <div className='flex items-center'>
          <h3 className='font-semibold'>You can find us on</h3>
          <img src={Stores} className="h-14" alt="Payment methods" />
          <img src={Stores_2} className="h-14" alt="Payment methods" />
          </div>
        </div>
      </footer>
    </>
  )
}
