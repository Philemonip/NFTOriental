// import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import avatars from "../../../asset/homecollections//avatars.png";
// import tradingcards from "../../../asset/homecollections/tradingcards.png";
// import sports from "../../../asset/homecollections/sports.png";
// import virtual from "../../../asset/homecollections/virtualworlds.png";
// import events from "../../../asset/homecollections/events.png";
import one from "../../../asset/carousel/1.png";
import two from "../../../asset/carousel/2.png";
import three from "../../../asset/carousel/3.jpg";
import four from "../../../asset/carousel/4.jpg";
import "./HomeCarousel.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const HomeCarousel = () => {
  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay
        autoPlaySpeed={6000}
        centerMode={false}
        className="mt-5 mb-5"
        containerClass="container-with-dots"
        dotListClass=""
        focusOnSelect={false}
        infinite
        itemClass="carouselitem"
        renderButtonGroupOutside={true}
        renderDotsOutside={true}
        responsive={responsive}
        showDots={true}
        sliderClass=""
      >
        <div>
          <img className="carouselimg" src={one} alt="banner" />
        </div>
        <div>
          <img className="carouselimg" src={two} alt="banner" />
        </div>
        <div>
          <img className="carouselimg" src={three} alt="banner" />
        </div>
        <div>
          <img className="carouselimg" src={four} alt="banner" />
        </div>
      </Carousel>
    </>
  );
};

export default HomeCarousel;
