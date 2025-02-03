import Slider from "react-slick";
import { Container } from "reactstrap";
import image9 from "@/public/images/destination/9.jpg";
import image10 from "@/public/images/destination/10.jpg";
import image8 from "@/public/images/destination/8.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CheapTicketsHome = () => {
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
        breakpoint: 1100,
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
      <div className="cheapTicketsHome pyLg100 py50 px-1">
        <Container fluid>
          <div className="title-2">
            <h2>
              cheap... <span>airline tickets</span>
            </h2>
            <p>
            Top selling agents for India, Asia, Canada and many more...
            </p>
          </div>

          <div className="slider-container">
            <Slider {...settings}>
              <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/8.jpg)",
                      }}
                    >
                      <Image
                        src={image8}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="#" tabindex="0">
                        <h3>Asia</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />
                        {/* <i className="fas fa-heart">
                          <span className="effect"></span>
                        </i> */}
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Manila</h6>
                      </a>
                      <h5>
                        <span>from</span>£365
                      </h5>
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Tokyo</h6>
                      </a>
                      <h5>
                        <span>from</span>£453
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="#" tabindex="0">
                        <h6>Bangkok</h6>
                      </a>
                      <h5>
                        <span>from</span>£3495
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href=""
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/8.jpg)",
                      }}
                    >
                      <Image
                        src={image8}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="cheap-flights-south-america" tabindex="0">
                        <h3>Soth America</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />
                        {/* <i className="fas fa-heart">
                          <span className="effect"></span>
                        </i> */}
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Lima</h6>
                      </a>
                      <h5>
                        <span>from</span>£565
                      </h5>
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Mexico City</h6>
                      </a>
                      <h5>
                        <span>from</span>£673
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="#" tabindex="0">
                        <h6>Bagota</h6>
                      </a>
                      <h5>
                        <span>from</span>£595
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/8.jpg)",
                      }}
                    >
                      <Image
                        src={image8}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="#" tabindex="0">
                        <h3>America</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />
                        {/* <i className="fas fa-heart">
                          <span className="effect"></span>
                        </i> */}
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>New York City</h6>
                      </a>
                      <h5>
                        <span>from</span>£365
                      </h5>
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Boston</h6>
                      </a>
                      <h5>
                        <span>from</span>£325
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="#" tabindex="0">
                        <h6>Orlando</h6>
                      </a>
                      <h5>
                        <span>from</span>£370
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/8.jpg)",
                      }}
                    >
                      <Image
                        src={image8}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="#" tabindex="0">
                        <h3>Europe</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />
                        {/* <i className="fas fa-heart">
                          <span className="effect"></span>
                        </i> */}
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Sweden</h6>
                      </a>
                      <h5>
                        <span>from</span>£45
                      </h5>
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Romania</h6>
                      </a>
                      <h5>
                        <span>from</span>£49
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="#" tabindex="0">
                        <h6>France</h6>
                      </a>
                      <h5>
                        <span>from</span>£51
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/9.jpg)",
                      }}
                    >
                      <Image
                        src={image9}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="#" tabindex="0">
                        <h3>South Asia</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />
                        {/* <i className="fas fa-heart">
                          <span className="effect"></span>
                        </i> */}
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Bombay</h6>
                      </a>
                      <h5>
                        <span>from</span>£375
                      </h5>
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Delhi</h6>
                      </a>
                      <h5>
                        <span>from</span>£380
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="#" tabindex="0">
                        <h6>Islamabad</h6>
                      </a>
                      <h5>
                        <span>from</span>£495
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/10.jpg)",
                      }}
                    >
                      <Image
                        src={image10}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="#" tabindex="0">
                        <h3>Africa</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />
                        {/* <i className="fas fa-heart">
                          <span className="effect"></span>
                        </i> */}
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Lagos</h6>
                      </a>
                      <h5>
                        <span>from</span>£445
                      </h5>
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>Nairobi</h6>
                      </a>
                      <h5>
                        <span>from</span>£410
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="#" tabindex="0">
                        <h6>Cape Town</h6>
                      </a>
                      <h5>
                        <span>from</span>£410
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CheapTicketsHome;
