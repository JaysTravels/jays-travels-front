import footerBg from "@/public/images/footer-bg.jpg";
import {
  faEnvelope,
  faEnvelopeOpenText,
  faHeadphones,
  faPercentage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Button, Input } from "reactstrap";

const SubscribeFooterHome = () => {
  return (
    <>
      <div className="subscribe-footer zigZagEffect">
        <Image src={footerBg} className="bg-img img-fluid d-none" alt="" />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="service-left">
                <ul>
                  <li>
                    <div className="service-box">
                      <div className="icon">
                        <FontAwesomeIcon icon={faHeadphones} />
                      </div>
                      <div className="detail">
                        <div>
                          <h5>call us</h5>
                          <p>+91 123-456-7890</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="service-box">
                      <div className="icon">
                        <FontAwesomeIcon icon={faPercentage} />
                      </div>
                      <div className="detail">
                        <div>
                          <h5>special discount</h5>
                          <p>first booking in 25% off</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="service-box">
                      <div className="icon">
                        <FontAwesomeIcon icon={faEnvelopeOpenText} />
                      </div>
                      <div className="detail">
                        <div>
                          <h5>newsletter</h5>
                          <p>scrambled it to make.</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="service-right">
                <div className="input-group">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email"
                    aria-label="Recipient's username"
                  />
                  <div className="input-group-append">
                    <Button
                      className="btn btn-subscribe"
                      type="button"
                      id="button-addon"
                    >
                      subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribeFooterHome;
