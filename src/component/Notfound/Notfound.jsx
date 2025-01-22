import NotFoundImg from '../../assets/images/error.svg'

export default function Notfound() {
  return (
    <div className='flex justify-center'>
      <img className='w-1/2' src={NotFoundImg} alt="" />
    </div>
  )
}
