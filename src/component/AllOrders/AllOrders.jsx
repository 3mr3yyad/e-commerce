import { Link } from "react-router-dom";


export default function AllOrders() {
    return (
        <div className="w-10/12 mx-auto bg-gray-200 my-5 rounded p-4 text-center h-96">
            <h2 className="font-semibold text-4xl text-main mt-10 pb-14 ">Purchased Successfully! <i className="fa-regular fa-circle-check"></i></h2>
            <Link to="/e-commerce" className="underline text-blue-500 hover:text-blue-700 transition-all"><i className="fa-solid fa-basket-shopping"></i> Want More.. !</Link>
        </div>
    )
}
