import Image from "next/image";
import image4 from "@/public/images/destination/1.jpg";
import image2 from "@/public/images/destination/3.jpg";
import image3 from "@/public/images/destination/2.jpg";
import Slider from "react-slick";
import { Button, Col, Container, Row } from "reactstrap";


const items = [
  {
    id: 1,
    src: image4,
    // subTitle: "france country",
    title: "Flights",
    // peragaph:
    //   "Book Economy Class Return Until 29 Apr 19 Lorem Ipsum is simply dummy text of the printing industry.",
    // amount: 851,
  },
  {
    id: 2,
    src: image2,
    title: "Hotels",
  },
  {
    id: 3,
    src: image3,
    // subTitle: "switzerland",
    title: "Packages",
    // peragaph:
    //   "Book Economy Class Return Until 29 Apr 19 Lorem Ipsum is simply dummy text of the printing industry.",
    // amount: 256,
  },

];

const WhatWeDo = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 0,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 0,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 0,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="featuredDestinationHome ptLg100 px-1">
        <Container>
          <div className="title-2">
            <h2>
              WHAT WE... <span>DO BEST !</span>
            </h2>
            <p className="mbLg70">
             
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
                         <Button color="c1" size="sm" >
                          Visit {item.title}
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

export default WhatWeDo;
