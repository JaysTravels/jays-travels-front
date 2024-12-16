import Image from "next/image";
import image1 from "@/public/images/destination/1.jpg";
import image2 from "@/public/images/destination/2.jpg";
import image3 from "@/public/images/destination/3.jpg";
import Slider from "react-slick";
import { Button, Col, Container, Row } from "reactstrap";
import "slick-carousel/slick/slick.css";

const items = [
  {
    id: 1,
    src: image1,
    subTitle: "france country",
    title: "paris",
    peragaph:
      "Book Economy Class Return Until 29 Apr 19 Lorem Ipsum is simply dummy text of the printing industry.",
    amount: 851,
  },
  {
    id: 2,
    src: image2,
    subTitle: "united kingdom",
    title: "london",
    peragaph:
      "Book Economy Class Return Until 29 Apr 19 Lorem Ipsum is simply dummy text of the printing industry.",
    amount: 581,
  },
  {
    id: 3,
    src: image3,
    subTitle: "switzerland",
    title: "zurich",
    peragaph:
      "Book Economy Class Return Until 29 Apr 19 Lorem Ipsum is simply dummy text of the printing industry.",
    amount: 256,
  },
];

const FeaturedDestinationHome = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="featuredDestinationHome ptLg100 pbLg70 px-1">
        <Container>
          <div className="title-2">
            <h2>
              featured... <span>destination</span>
            </h2>
            <p className="mbLg70">
              Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum
              has been standard.......
            </p>
          </div>

          <div className="slider-container">
            <Slider {...settings}>
              {items.map((item, index) => {
                return (
                  <div className="fdhBox" key={index}>
                    <div className="overflow-hidden position-relative">
                      <div className={`image image${item.id}`}>
                        <Image src={item.src} alt="..." className="d-none" />
                      </div>
                    </div>

                    <div className="destination-details">
                      <div>
                        <h5>{item.subTitle}</h5>
                        <h2>{item.title}</h2>
                        <h6>{item.peragaph}</h6>
                        <Button color="c1" size="sm">
                          from ${item.amount}*
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </Container>
      </div>
    </>
  );
};

export default FeaturedDestinationHome;
