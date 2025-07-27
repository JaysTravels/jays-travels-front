import SearchForm from "@/components/common/Search.Form";
import HotelSearchForm from "@/components/common/HotelSearch.Form";
import cloud from "@/public/images/cloud.png";
import Image from "next/image";
import { useEffect } from "react";
import Slider from "react-slick";
import { Col, Container } from "reactstrap";
import { useState } from 'react';
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
  const HomePricer = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: true,
    slidesToShow: true,
  };
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [activeFlight, setactiveFlight] = useState('active');
  const [activeHotel, setactiveHotel] = useState('not-active');
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
                  <ul className="nav mix-pills nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="nav-item"  onClick={() => {setShowHotelForm(prev => !prev);setactiveHotel('not-active');setactiveFlight('active');}}> 
    <a  className={`nav-link ${activeFlight}`} id="pills-hotel-tab" data-bs-toggle="pill" href="#pills-hotel" role="tab" aria-controls="pills-hotel" aria-selected="true">Flight</a>
  </li>
  <li className="nav-item"  onClick={() => { setShowHotelForm(prev => !prev);setactiveFlight('not-active');setactiveHotel('active'); }}>
    <a  className={`nav-link ${activeHotel}`} id="pills-holiday-tab" data-bs-toggle="pill" href="#" role="tab" aria-controls="pills-holiday" aria-selected="false">Hotel</a>
  </li>
</ul> 
 {/* Conditionally render based on state */}
      {showHotelForm ? (
        <HotelSearchForm searchButtonText="Search" />
      ) : (
        <SearchForm searchButtonText="Search" />
      )}
                  {/* <SearchForm searchButtonText="Search"/> */}
                   {/* <HotelSearchForm searchButtonText="Search"/> */}
                </div>
              </div>
            </Col>
            {/* <Col lg={6}>
              <div className="cab-content hContent" >
                <div className="" style={{top:'15%',position:'absolute',left:'60%'}}>
                <Slider {...PriceBannersettings}>
         <div>
            <div className="slides" style={{ backgroundImage: "url(/images/price-banner/banner-price-1.jpg)", width:'360px', height:'350px'}}>
            </div>
          </div> 
          <div>
            <div className="slides" style={{ backgroundImage: "url(/images/price-banner/banner-price-2.png)" , width:'360px', height:'350px'}}>
            </div>
          </div>
           <div>
            <div className="slides" style={{ backgroundImage: "url(/images/price-banner/banner-price-3.png)" , width:'360px', height:'350px'}}>
            </div>
          </div>
         

         
          
        </Slider>
       
                 </div>
                
              </div>
            </Col> */}
          </Container>
        </div>
        {/* <div className="some_effect_container">
        <div className="smoke_effect"></div>
        </div> */}
        
   <section className="top-category margin-cls">
   
  <div className="category-4 no-arrow">
    <Slider {...HomePricer}>
    <div>
      <div className="top_box" style={{width:'520px'}}>
        <div className="img-part">
          <a href="#"><img src="../assets/images/mix/cat/1.jpg" className="img-fluid blur-up lazyload" alt  /></a>
        </div>
        <div className="right-content">
          <div>
            <h5>shrimp lo <i className="fas fa-heart" /></h5>
            <p>Lorem Ipsum is simply dummy</p>
            <h6><del>$240</del>$200</h6>
          </div>
        </div>
        <div className="new-label">
          <span>new</span>
        </div>
      </div>
    </div>
    <div>
      <div className="top_box" style={{width:'520px'}}>
        <div className="img-part">
          <a href="#"><img src="../assets/images/mix/cat/2.jpg" className="img-fluid blur-up lazyload" alt /></a>
        </div>
        <div className="right-content">
          <div>
            <h5>fast hot <i className="fas fa-heart" /></h5>
            <p>Lorem Ipsum is simply dummy</p>
            <h6><del>$240</del>$200</h6>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className="top_box" style={{width:'520px'}}>
        <div className="img-part">
          <a href="#"><img src="../assets/images/mix/cat/3.jpg" className="img-fluid blur-up lazyload" alt /></a>
        </div>
        <div className="right-content">
          <div>
            <h5>ching's dan<i className="fas fa-heart" /></h5>
            <p>Lorem Ipsum is simply dummy</p>
            <h6><del>$240</del>$200</h6>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className="top_box" style={{width:'520px'}}>
        <div className="img-part">
          <a href="#"><img src="../assets/images/mix/cat/4.jpg" className="img-fluid blur-up lazyload" alt /></a>
        </div>
        <div className="right-content">
          <div>
            <h5>dali fish <i className="fas fa-heart" /></h5>
            <p>Lorem Ipsum is simply dummy</p>
            <h6><del>$240</del>$200</h6>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className="top_box" style={{width:'520px'}}>
        <div className="img-part">
          <a href="#"><img src="../assets/images/mix/cat/2.jpg" className="img-fluid blur-up lazyload" alt /></a>
        </div>
        <div className="right-content">
          <div>
            <h5>fast hot <i className="fas fa-heart" /></h5>
            <p>Lorem Ipsum is simply dummy</p>
            <h6><del>$240</del>$200</h6>
          </div>
        </div>
      </div>
    </div>
    </Slider>
  </div>
  
</section>


      </div>
    </>
  );
};

export default HeaderHome;
