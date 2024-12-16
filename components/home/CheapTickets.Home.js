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
    autoplay: false,
    dragable: true,
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
      <div className="cheapTicketsHome pyLg100 py50 px-1">
        <Container fluid>
          <div className="title-2">
            <h2>
              cheap... <span>airline tickets</span>
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum
              has been standard.......
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
                        <h3>london</h3>
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
                        <h6>paris</h6>
                      </a>
                      <h5>
                        <span>from</span>$200
                      </h5>
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>rome</h6>
                      </a>
                      <h5>
                        <span>from</span>$453
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="#" tabindex="0">
                        <h6>berlin</h6>
                      </a>
                      <h5>
                        <span>from</span>$342
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
                        <h3>budva</h3>
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
                        <h6>atlanta</h6>
                      </a>
                      <h5>
                        <span>from</span>$200
                      </h5>
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>miami</h6>
                      </a>
                      <h5>
                        <span>from</span>$453
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="#" tabindex="0">
                        <h6>ottawa</h6>
                      </a>
                      <h5>
                        <span>from</span>$342
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
                        <h3>venice</h3>
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
                        <h6>vienna</h6>
                      </a>
                      <h5>
                        <span>from</span>$200
                      </h5>
                    </div>
                    <div className="price">
                      <a href="#" tabindex="0">
                        <h6>madrid</h6>
                      </a>
                      <h5>
                        <span>from</span>$453
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="#" tabindex="0">
                        <h6>dallas</h6>
                      </a>
                      <h5>
                        <span>from</span>$342
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
