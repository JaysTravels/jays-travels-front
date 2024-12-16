import Image from "next/image";
import footerLogo from "@/public/images/footer-logo.png";
import tour1 from "@/public/images/tour/footer/1.jpg";
import tour2 from "@/public/images/tour/footer/2.jpg";
import tour3 from "@/public/images/tour/footer/3.jpg";
import tour4 from "@/public/images/tour/footer/4.jpg";
import tour5 from "@/public/images/tour/footer/5.jpg";
import tour6 from "@/public/images/tour/footer/6.jpg";
import bf1 from "@/public/images/cab/blog-footer/1.jpg";
import bf2 from "@/public/images/cab/blog-footer/2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faEnvelope,
  faMapMarker,
  faMapMarkerAlt,
  faPhone,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row } from "reactstrap";
import Link from "next/link";
import { useEffect, useState } from "react";

const FrontFooter = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer>
        <div className="footer section-b-space section-t-space">
          <Container>
            <Row className="order-row">
              <div className="col-xl-2 col-md-6 order-cls">
                <div className="footer-title mobile-title">
                  <h5>contact us</h5>
                </div>
                <div className="footer-content">
                  <div className="contact-detail">
                    <div className="footer-logo">
                      <Image src={footerLogo} alt="" className="img-fluid" />
                    </div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries
                    </p>
                    <ul className="contact-list">
                      <li>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        A-32, Albany, Newyork.
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faPhone} /> 518 - 457 - 5181
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faEnvelope} /> contact@gmail.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-3">
                <div className="footer-space">
                  <div className="footer-title">
                    <h5>about</h5>
                  </div>
                  <div className="footer-content">
                    <div className="footer-links">
                      <ul>
                        <li>
                          <a href="#">about us</a>
                        </li>
                        <li>
                          <a href="#">FAQ</a>
                        </li>
                        <li>
                          <a href="#">login</a>
                        </li>
                        <li>
                          <a href="#">register</a>
                        </li>
                        <li>
                          <a href="#">terms & co.</a>
                        </li>
                        <li>
                          <a href="#">privacy</a>
                        </li>
                        <li>
                          <a href="#">support</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="footer-title">
                  <h5>top places</h5>
                </div>
                <div className="footer-content">
                  <div className="footer-place">
                    <div className="row">
                      <div className="col-4">
                        <div className="place rounded5">
                          <a href="#">
                            <Image src={tour1} className="img-fluid" alt="" />
                            <div className="overlay">
                              <h6>japan</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="place rounded5">
                          <a href="#">
                            <Image src={tour2} className="img-fluid" alt="" />
                            <div className="overlay">
                              <h6>beach</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="place rounded5">
                          <a href="#">
                            <Image src={tour3} className="img-fluid" alt="" />
                            <div className="overlay">
                              <h6>newyork</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="place rounded5">
                          <a href="#">
                            <Image src={tour4} className="img-fluid" alt="" />
                            <div className="overlay">
                              <h6>city</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="place rounded5">
                          <a href="#">
                            <Image src={tour5} className="img-fluid" alt="" />
                            <div className="overlay">
                              <h6>mountain</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="place rounded5">
                          <a href="#">
                            <Image src={tour6} className="img-fluid" alt="" />
                            <div className="overlay">
                              <h6>wild</h6>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-3 order-cls">
                <div className="footer-space">
                  <div className="footer-title">
                    <h5>useful links</h5>
                  </div>
                  <div className="footer-content">
                    <div className="footer-links">
                      <ul>
                        <li>
                          <a href="#">home</a>
                        </li>
                        <li>
                          <a href="#">our vehical</a>
                        </li>
                        <li>
                          <a href="#">latest video</a>
                        </li>
                        <li>
                          <a href="#">services</a>
                        </li>
                        <li>
                          <a href="#">booking deal</a>
                        </li>
                        <li>
                          <a href="#">emergency call</a>
                        </li>
                        <li>
                          <a href="#">mobile app</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="footer-title">
                  <h5>new topics</h5>
                </div>
                <div className="footer-content">
                  <div className="footer-blog">
                    <div className="media">
                      <div className="img-part rounded5">
                        <a href="#">
                          <img src={bf1} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="media-body">
                        <h5>recent news</h5>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries
                        </p>
                      </div>
                    </div>
                    <div className="media">
                      <div className="img-part rounded5">
                        <a href="">
                          <img src={bf2} className="img-fluid" alt="" />
                        </a>
                      </div>
                      <div className="media-body">
                        <h5>recent news</h5>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </div>
        <div className="sub-footer">
          <div className="container">
            <div className="row ">
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="footer-social">
                  <ul>
                    <li>
                      <Link href="#">
                        {/* <FontAwesomeIcon icon={} /> */}
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fab fa-google"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="copy-right">
                  <p>
                    copyright 2019 rica by <i className="fas fa-heart"></i>{" "}
                    pixelstrap
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* {showTopButton && ( */}
      <button
        className={`tap-top ${showTopButton && "top"}`}
        onClick={scrollToTop}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </button>
      {/* )} */}
    </>
  );
};

export default FrontFooter;
