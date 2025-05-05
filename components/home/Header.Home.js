import SearchForm from "@/components/common/Search.Form";
import cloud from "@/public/images/cloud.png";
import Image from "next/image";
import { useEffect } from "react";
import Slider from "react-slick";
import { Col, Container } from "reactstrap";

const HeaderHome = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    slidesToShow: true,
  };
  const PriceBannersettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    slidesToShow: true,
    arrows: false,
  };

  return (
    <>
      <div className="headerHome cab-section flight-section p-0">
        <Slider {...settings}>
          <div>
            <div className="slides" style={{ backgroundImage: "url(/images/home-slides/slide1.jpg)" }}>
              <div className="cloud">
                <Image
                  src={cloud}
                  width="50"
                  height="50"
                  alt=""
                  className="bg-img d-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="slides" style={{ backgroundImage: "url(/images/home-slides/slide2.jpg)" }}>
           
              <div className="cloud">
                <Image
                  src={cloud}
                  width="50"
                  height="50"
                  alt=""
                  className="bg-img d-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="slides" style={{ backgroundImage: "url(/images/home-slides/slide3.jpg)" }}>
              <div className="cloud">
                <Image
                  src={cloud}
                  width="50"
                  height="50"
                  alt=""
                  className="bg-img d-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          
        </Slider>
       
        <div className="hSearch">
          <Container>
            <Col lg={6}>
              <div className="cab-content hContent">
                <div className="w-100">
                  <h2 className="text-uppercase fw400 mbLg10 wow fadeIn">
                    great journey begins
                  </h2>
                  <h3 className="text-uppercase fw800 mbLg30 mb20">
                    with a small step
                  </h3>

                  <SearchForm searchButtonText="Search"/>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="cab-content hContent" >
                <div className="" style={{top:'15%',position:'absolute',left:'60%'}}>
                <Slider {...PriceBannersettings}>
          {/* <div>
            <div className="slides" style={{ backgroundImage: "url(/images/price-banner/banner-price-1.jpg)", width:'360px', height:'350px'}}>
            </div>
          </div> */}
          <div>
            <div className="slides" style={{ backgroundImage: "url(/images/price-banner/banner-price-2.png)" , width:'360px', height:'350px'}}>
            </div>
          </div>
          {/* <div>
            <div className="slides" style={{ backgroundImage: "url(/images/price-banner/banner-price-3.png)" , width:'360px', height:'350px'}}>
            </div>
          </div> */}
         

         
          
        </Slider>
       
                 </div>
                
              </div>
            </Col>
          </Container>
        </div>
        {/* <div className="some_effect_container">
        <div className="smoke_effect"></div>
        </div> */}
      </div>
    </>
  );
};

export default HeaderHome;
