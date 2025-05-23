import Image from "next/image";
import footerLogo from "@/public/images/footer-logo.png";
import tour1 from "@/public/images/tour/footer/1.jpg";
import tour2 from "@/public/images/tour/footer/2.jpg";
import tour3 from "@/public/images/tour/footer/3.jpg";
import tour4 from "@/public/images/tour/footer/4.jpg";
import tour5 from "@/public/images/tour/footer/5.jpg";
import tour6 from "@/public/images/tour/footer/6.jpg";
import footeriata from "@/public/images/footer-iata.png";
import trustPilot from "@/public/images/trust-pilot-4.5.png";
import visaCards from "@/public/images/visa-cards.png";
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
        <div className="footer section-t-space">
          <Container>
            <Row className="order-row">
              <div className="col-xl-2 col-md-6 order-cls">
                <div className="footer-title mobile-title">
                  <h5>contact us</h5>
                </div>
                <div className="footer-content">
                  <div className="contact-detail">
                    <div className="footer-logo" >
                    
                      < Image src={footerLogo} alt="" href="https://jaystravels.co.uk/en-gb" className="img-fluid"  />
                    
                    </div>
                    <ul className="contact-list">
                      <li>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        349 High Street, Smethwick, West Midlands, B66 3PB, United Kingdom
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faPhone} /> <a href="tel:+448008101600">0800-8101600</a> <br/>
                        <span>Mon - Sat 10am-6pm</span>
                        <br/>
                        <span>Sat - Sun 10am-6pm</span>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faEnvelope} />info@jaystravels.co.uk
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
                          <a href="about-us">about us</a>
                        </li>
                        <li>
                          <a href="contact-us">Contact</a>
                        </li>
                        <li>
                          <a href="cookie-policy">Cookie policy</a>
                        </li>
                        <li>
                          <a href="privacy-policy">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="general-conditions">General Conditions</a>
                        </li>
                        <li>
                          <a href="terms-conditions">Terms & co.</a>
                        </li>
                        <li>
                          <a href="cookie-policy">Cookie Policy</a>
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
                          <a href="https://jaystravels.co.uk/en-gb">home</a>
                        </li>
                        <li>
                          <a href="#">Flights</a>
                        </li>
                        <li>
                          <a href="hotels">Hotels</a>
                        </li>
                        <li>
                          <a href="holidays">Holidays</a>
                        </li>
                        {/* <li>
                          <a href="#">Tours</a>
                        </li> */}
                        {/* <li>
                          <a href="#">emergency call</a>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div> <Image src={footeriata} style={{paddingBottom:'10px'}} className="img-fluid" alt="" /></div>
                <div>
                <a href="https://uk.trustpilot.com/review/jaystravels.co.uk?utm_medium=trustbox&utm_source=Mini">
                <Image src={trustPilot} style={{padding:'10px 0'}} width={250} height={100} className="img-fluid" alt="" />
                </a>
                </div>
                <div className="footer-title">
                <Image src={visaCards} style={{padding:'10px 0'}} width={250} height={100} className="img-fluid" alt="" />
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
                      <Link href="https://www.facebook.com/jaysonline349">
                        {/* <FontAwesomeIcon icon={} /> */}
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.instagram.com/travelsjays/">
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://twitter.com/TRAVEL_JAYS">
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="copy-right">
                  <p>
                  Copyright © 2024 Jays Travels. All rights reserved. <i className="fas fa-heart"></i>{" "}
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
