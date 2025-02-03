import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image1 from "@/public/images/destination/1.jpg";
import Link from "next/link";
import { Col, Container, Row } from "reactstrap";
import Slider from "react-slick";


const FlightRoutesHome = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
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
      <div className="flightRoutesHome px-1">
         {/* pyLg100 py50 */}
        <Container>
          <div className="title-2">
            <h2>
              top holiday packages... <span>Round the Globe</span>
            </h2>
            <p>
            You'll find the latest selection of our worldwide holiday offers
            </p>
          </div>
          <Slider {...settings}>
            <Col lg={3}>
              <div className="frhBox" style={{margin:'0 10px'}}>
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/packages/dubai/dubai-front.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>£1,500 <sub>pp</sub></del>
                      </h6>
                      <h3>£1,300<sub>pp</sub></h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>Dubai</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>Dubai holiday offers</h5>
                    </Link>
                    <h6>all-inclusive</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>View all deals</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox" style={{margin:'0 10px'}}>
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/packages/thailand/thailand-front.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>£1,399 <sub>pp</sub></del>
                      </h6>
                      <h3>£1,129<sub>pp</sub></h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>Thailand</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>Thailand holiday offers</h5>
                    </Link>
                    <h6>all-inclusive</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>View all deals</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox" style={{margin:'0 10px'}}>
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/packages/mauritius/mauritius-front.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>£1,699 <sub>pp</sub></del>
                      </h6>
                      <h3>£1,549<sub>pp</sub></h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>Mauritius</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>Mauritius holiday offers</h5>
                    </Link>
                    <h6>all-inclusive</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>View all deals</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox" style={{margin:'0 10px'}}>
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/packages/africa/africa-front.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>£1,599 <sub>pp</sub></del>
                      </h6>
                      <h3>£1,549<sub>pp</sub></h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>Africa</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>Africa holiday offers</h5>
                    </Link>
                    <h6>all-inclusive</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>View all deals</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox" style={{margin:'0 10px'}}>
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/packages/usa/usa-front.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>£2,199 <sub>pp</sub></del>
                      </h6>
                      <h3>£1,999<sub>pp</sub></h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>USA</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>USA holiday offers</h5>
                    </Link>
                    <h6>all-inclusive</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>View all deals</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      {/* <FontAwesomeIcon icon={faStar} size="xs" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox" style={{margin:'0 10px'}}>
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/packages/far-east/far-east-front.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>£3,500 <sub>pp</sub></del>
                      </h6>
                      <h3>£2,229<sub>pp</sub></h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>Far East</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>Far East holiday offers</h5>
                    </Link>
                    <h6>all-inclusive</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>View all deals</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox" style={{margin:'0 10px'}}>
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/packages/mexico/mexico-front.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>£1,455 <sub>pp</sub></del>
                      </h6>
                      <h3>£1,405<sub>pp</sub></h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>Mexico</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>Mexico holiday offers</h5>
                    </Link>
                    <h6>all-inclusive</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>View all deals</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox" style={{margin:'0 10px'}}>
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/packages/canada/canada-front.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>£1,015 <sub>pp</sub></del>
                      </h6>
                      <h3>£9,98<sub>pp</sub></h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>Canada</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>Canada holiday offers</h5>
                    </Link>
                    <h6>all-inclusive</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>View all deals</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox" style={{margin:'0 10px'}}>
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/packages/barbados/barbados-front.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>£2,999 <sub>pp</sub></del>
                      </h6>
                      <h3>£2,889<sub>pp</sub></h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>Barbados</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>Barbados holiday offers</h5>
                    </Link>
                    <h6>all-inclusive</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>View all deals</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col> 
            </Slider>
        </Container>
      </div>
    </>
  );
};

export default FlightRoutesHome;
