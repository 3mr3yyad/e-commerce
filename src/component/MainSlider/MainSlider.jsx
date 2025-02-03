import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg"
import img2 from "../../assets/images/slider-image-2.jpeg"
import img3 from "../../assets/images/slider-image-3.jpeg"


export default function MainSlider() {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        arrows: false
    };
    return (
        <>
            <div className="flex">
                <div className="w-9/12">
                    <Slider {...settings}>
                        <div >
                            <img className="w-full lg:h-96 sm:h-48 max-sm:h-48 object-cover" src={img1} alt="" />
                        </div>
                        <div>
                            <img className="w-full lg:h-96 sm:h-48 max-sm:h-48 object-cover" src={img2} alt="" />
                        </div>
                        <div>
                            <img className="w-full lg:h-96 sm:h-48 max-sm:h-48 object-cover" src={img3} alt="" />
                        </div>
                    </Slider></div>
                <div className="w-3/12">
                    <div><img src={img2} className="w-full lg:h-48 sm:h-24 max-sm:h-24 object-cover" alt="" /></div>
                    <div><img src={img3} className="w-full lg:h-48 sm:h-24 max-sm:h-24 object-cover" alt="" /></div>
                </div>
            </div>
        </>
    );
}

