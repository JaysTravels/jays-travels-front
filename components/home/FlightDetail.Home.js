import Image from "next/image";
import logo from "@/public/images/logo/logo.png";
import logo2 from "@/public/images/logo/logo2.png";
import { Button, Col, Row } from "reactstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";

const items = [
  {
    id : 1,
    country: "australia",
    price: 451,
    countity: 35,
  },
  {
    id  :2,
    country: "bahrain",
    price: 610,
    countity: 18,
  },
  {
    id  :3,
    country: "china",
    price: 621,
    countity: 21,
  },
  {
    id  :4,
    country: "egypt",
    price: 480,
    countity: 6,
  },
  {
    id  :5,
    country: "india",
    price: 320,
    countity: 31,
  },
  {
    id  :6,
    country: "australia",
    price: 451,
    countity: 35,
  },
];

const FlightDetailHome = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
      <div className="pt-0 flight-detail zigZagEffect">
        <div className="cloud section-b-space section-t-space">
          {/* <Image
            src="../assets/images/flights/cloud.png"
            alt=""
            className="bg-img"
          /> */}
          <div className="container">
            <div className="title-2">
              <h2>
                top destination... <span>around the world</span>
              </h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum
                has been standard.......
              </p>
            </div>
            <Row>
              <Col xs={12}>
                <div className="flight-box">
                  <div className="logo-section">
                    <Image src={logo} className="img-fluid" alt="" />
                  </div>
                  <div className="middle-section">
                    <div className="flight-5 no-arrow">
                      <Slider {...settings}>
                        {items.map((item, index) => {
                          return (
                            <div key={item.id}>
                              <Link href="#">
                                <div className="flight-info">
                                  <div>
                                    <h4>{item.country}</h4>
                                    <h5>from ${item.price}</h5>
                                    <i className="fas fa-plane"></i>
                                    <FontAwesomeIcon icon={faPlane} />
                                    <h6>{item.countity} airlines</h6>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </div>
                  <div className="name-section">
                    <div>
                      <h5>japan</h5>
                      <h6>flights</h6>
                      <Button color="c3" size="sm">
                        check all
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flight-box">
                  <div className="logo-section">
                    <Image src={logo2} className="img-fluid" alt="" />
                  </div>
                  <div className="middle-section">
                    <div className="flight-5 no-arrow">
                      <Slider {...settings}>
                        {items.map((item, index) => {
                          return (
                            <div key={item.id}>
                              <Link href="#">
                                <div className="flight-info">
                                  <div>
                                    <h4>{item.country}</h4>
                                    <h5>from ${item.price}</h5>
                                    <i className="fas fa-plane"></i>
                                    <FontAwesomeIcon icon={faPlane} />
                                    <h6>{item.countity} airlines</h6>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </div>
                  <div className="name-section">
                    <div>
                      <h5>emirates</h5>
                      <h6>flights</h6>
                      <Button color="c3" size="sm">
                        check all
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightDetailHome;
