import Slider from "react-slick"
import useApi from "../../Context/Hooks/useApi"



export default function CategorySlider() {
    let { data } = useApi('categories')

    return (
        <div className="mb-6">
            <Slider slidesToShow={6} infinite={true} autoplay={true} arrows={false} slidesToScroll={3} pauseOnHover>
            {data?.data?.data?.map((el) => {
                    return (
                        <div key={el._id}>
                            <img src={el.image} className=" md:h-48 sm:h-24 max-sm:h-24 mx-auto" alt={el.name} />
                            <h5 className="text-center text-lg sm:text-sm max-sm:text-sm">{el.name}</h5>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}
