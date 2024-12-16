import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

const FlightRoutesHome = () => {
  return (
    <>
      <div className="flightRoutesHome pyLg100 py50 px-1">
        <Container>
          <div className="title-2">
            <h2>
              top flight routes... <span>within usa</span>
            </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and Lorem Ipsum
              has been standard.......
            </p>
          </div>
          <Row>
            <Col lg={3}>
              <div className="frhBox">
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/destination/4.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>$500</del>
                      </h6>
                      <h3>$420</h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>-30%</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>london to moscow</h5>
                    </Link>
                    <h6>arrival : 20:30</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>departure : 14:20</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox">
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/destination/5.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>$500</del>
                      </h6>
                      <h3>$420</h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>limited time</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>milan to stockholm</h5>
                    </Link>
                    <h6>arrival : 20:30</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>departure : 14:20</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox">
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/destination/6.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>$500</del>
                      </h6>
                      <h3>$420</h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>-30%</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>marid to prague</h5>
                    </Link>
                    <h6>arrival : 20:30</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>departure : 14:20</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="frhBox">
                <Link
                  href="#"
                  className="img d-block"
                  style={{
                    backgroundImage: "url(/images/destination/7.jpg)",
                  }}
                >
                  <div className="price-round">
                    <div>
                      <h6>
                        <del>$500</del>
                      </h6>
                      <h3>$420</h3>
                    </div>
                  </div>
                  <div className="discount">
                    <h6>sunday</h6>
                  </div>
                </Link>

                <div className="routes-content">
                  <div className="top-bar">
                    <Link href="#">
                      <h5>humburg to paris</h5>
                    </Link>
                    <h6>arrival : 20:30</h6>
                  </div>
                  <div className="bottom-bar">
                    <h6>departure : 14:20</h6>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FlightRoutesHome;
