import axios from "axios"
import { useEffect, useState } from "react"
import Slider from "react-slick"



export default function CategorySlider() {
    let [categoryList, setCategoryList] = useState(null)
    function getAllCategory() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((req) => {
                setCategoryList(req.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getAllCategory()
    }, [])
    return (
        <div className="mb-6">
            <Slider slidesToShow={6} infinite={true} autoplay={true} arrows={false} slidesToScroll={3} pauseOnHover>
            {categoryList?.map((el) => {
                    return (
                        <div key={el._id}>
                            <img src={el.image} className="h-48 mx-auto" alt={el.name} />
                            <h5 className="text-center text-lg">{el.name}</h5>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}
