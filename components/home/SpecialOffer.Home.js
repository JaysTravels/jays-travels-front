import Image from "next/image";
import placeImg from "@/public/images/place.png";
import b1 from "@/public/images/banner/1.png";
import b2 from "@/public/images/banner/2.png";
import b3 from "@/public/images/banner/3.png";
import b4 from "@/public/images/banner/4.png";
import { Button, Col, Container, Row } from "reactstrap";
// import { initWow } from "@/lib/initWow";
// import { useEffect } from "react";

const SpecialOfferHome = () => {
  // useEffect(() => {
  //   // Ensure wow.js is initialized only in the browser
  //   initWow();
  // }, []);

  return (
    <>
      <div className="specialOfferHome zigZagEffect">
        <div className="cloud pyLg100 py50 px-1">
          <Container>
            <Row>
              <Col lg={6}>
                <div className="placeImg">
                  <Image src={placeImg} className="wow zoomIn" alt="..." />

                  <div className="animation-place">
                    <div className=" plane-l">
                      <Image
                        src={b1}
                        alt=""
                        className="zoomIn wow img-fluid blur-up lazyloaded"
                      />
                    </div>
                    <div className="cloud-l">
                      <Image
                        src={b2}
                        alt=""
                        className="img-fluid blur-up wow zoomIn lazyloaded"
                      />
                    </div>
                    <div className="cloud-r">
                      <Image
                        src={b3}
                        alt=""
                        className="img-fluid blur-up wow zoomIn lazyloaded"
                      />
                    </div>
                    <div className=" plane-r">
                      <Image
                        src={b4}
                        alt=""
                        className="img-fluid blur-up zoomIn wow lazyloaded"
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={5} className="offset-lg-1">
                <div className="banner-content">
                  <div>
                    <h5>special nature tour offer</h5>
                    <h2>
                      discount <span>20-30%</span>
                    </h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and type
                      setti ng industry. Lorem Ipsum has been the of industry
                      standard dum my text ever since the 1500s,
                    </p>
                    <h2 className="price">$420</h2>
                    <div className="bottom-section">
                      <Button color="c3" size="sm" className="text-uppercase">
                        buy now
                      </Button>
                      <div className="info-btn">
                        <h6>7 days &nbsp; | &nbsp; 8 nights</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SpecialOfferHome;
