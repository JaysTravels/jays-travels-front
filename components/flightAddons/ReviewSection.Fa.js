import Image from "next/image";
import seat from "@/public/images/icon/seat.png";
import sandwich from "@/public/images/icon/sandwich.png";
import suitcase from "@/public/images/icon/suitcase.png";
import cockpit from "@/public/images/flights/cockpit.png";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Input,
  InputGroup,
  Row,
} from "reactstrap";
import { useState } from "react";

const ReviewSectionFa = () => {
  const [isOpen, setIsOpen] = useState();
  const [valueAdult, setValueAdult] = useState(1);
  const [open, setOpen] = useState("1");

  const handleIncrementAdult = () => {
    setValueAdult((prevValue) => prevValue + 1);
  };

  const handleDecrementAdult = () => {
    setValueAdult((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
  };

  const handleChangeAdult = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      setValueAdult(newValue);
    }
  };

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <div className="review-section">
      <div className="review_box">
        <div className="title-top">
          <h5>add more for your trip</h5>
        </div>
        <div className="flight_detail">
          <Row>
            <Col xs={12}>
              <Accordion
                open={open}
                toggle={toggle}
                className="addons-according"
              >
                <AccordionItem>
                  <AccordionHeader targetId="1">
                    <Image src={seat} alt="" className="img-fluid w24px me8" />{" "}
                    select seats
                  </AccordionHeader>
                  <AccordionBody accordionId="1">
                    <div className="seat-select">
                      <div className="seat-details">
                        <ul>
                          <li>
                            <div className="box taken"></div>
                            <h6>taken</h6>
                          </li>
                          <li>
                            <div className="box selected"></div>
                            <h6>selected</h6>
                          </li>
                          <li>
                            <div className="box available"></div>
                            <h6>available</h6>
                          </li>
                        </ul>
                      </div>
                      <div className="plane">
                        <div className="cockpit">
                          <div>
                            <Image src={cockpit} alt="" className="img-fluid" />
                          </div>
                        </div>
                        <div className="exit exit--front fuselage"></div>
                        <ol className="cabin fuselage">
                          <li className="row row--1">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="1A" />
                                <label for="1A">1A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="1B" />
                                <label for="1B">1B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="1C" />
                                <label for="1C">1C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" disabled id="1D" />
                                <label for="1D">Occupied</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="1E" />
                                <label for="1E">1E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="1F" />
                                <label for="1F">1F</label>
                              </li>
                            </ol>
                          </li>
                          <li className="row row--2">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="2A" />
                                <label for="2A">2A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="2B" />
                                <label for="2B">2B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="2C" />
                                <label for="2C">2C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="2D" />
                                <label for="2D">2D</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="2E" />
                                <label for="2E">2E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="2F" />
                                <label for="2F">2F</label>
                              </li>
                            </ol>
                          </li>
                          <li className="row row--3">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="3A" />
                                <label for="3A">3A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="3B" />
                                <label for="3B">3B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="3C" />
                                <label for="3C">3C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="3D" />
                                <label for="3D">3D</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="3E" />
                                <label for="3E">3E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="3F" />
                                <label for="3F">3F</label>
                              </li>
                            </ol>
                          </li>
                          <li className="row row--4">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="4A" />
                                <label for="4A">4A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="4B" />
                                <label for="4B">4B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="4C" />
                                <label for="4C">4C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="4D" />
                                <label for="4D">4D</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="4E" />
                                <label for="4E">4E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="4F" />
                                <label for="4F">4F</label>
                              </li>
                            </ol>
                          </li>
                          <li className="row row--5">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="5A" />
                                <label for="5A">5A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="5B" />
                                <label for="5B">5B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="5C" />
                                <label for="5C">5C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="5D" />
                                <label for="5D">5D</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="5E" />
                                <label for="5E">5E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="5F" />
                                <label for="5F">5F</label>
                              </li>
                            </ol>
                          </li>
                          <li className="row row--6">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="6A" />
                                <label for="6A">6A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="6B" />
                                <label for="6B">6B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="6C" />
                                <label for="6C">6C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="6D" />
                                <label for="6D">6D</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="6E" />
                                <label for="6E">6E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="6F" />
                                <label for="6F">6F</label>
                              </li>
                            </ol>
                          </li>
                          <li className="row row--7">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="7A" />
                                <label for="7A">7A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="7B" />
                                <label for="7B">7B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="7C" />
                                <label for="7C">7C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="7D" />
                                <label for="7D">7D</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="7E" />
                                <label for="7E">7E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="7F" />
                                <label for="7F">7F</label>
                              </li>
                            </ol>
                          </li>
                          <li className="row row--8">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="8A" />
                                <label for="8A">8A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="8B" />
                                <label for="8B">8B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="8C" />
                                <label for="8C">8C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="8D" />
                                <label for="8D">8D</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="8E" />
                                <label for="8E">8E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="8F" />
                                <label for="8F">8F</label>
                              </li>
                            </ol>
                          </li>
                          <li className="row row--9">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="9A" />
                                <label for="9A">9A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="9B" />
                                <label for="9B">9B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="9C" />
                                <label for="9C">9C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="9D" />
                                <label for="9D">9D</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="9E" />
                                <label for="9E">9E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="9F" />
                                <label for="9F">9F</label>
                              </li>
                            </ol>
                          </li>
                          <li className="row row--10">
                            <ol className="seats" type="A">
                              <li className="seat">
                                <input type="checkbox" id="10A" />
                                <label for="10A">10A</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="10B" />
                                <label for="10B">10B</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="10C" />
                                <label for="10C">10C</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="10D" />
                                <label for="10D">10D</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="10E" />
                                <label for="10E">10E</label>
                              </li>
                              <li className="seat">
                                <input type="checkbox" id="10F" />
                                <label for="10F">10F</label>
                              </li>
                            </ol>
                          </li>
                        </ol>
                        <div className="exit exit--back fuselage"></div>
                      </div>
                    </div>
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="2">
                    <Image
                      src={sandwich}
                      alt="..."
                      className="img-fluid w24px me8"
                    />{" "}
                    Add inflight Meals
                  </AccordionHeader>
                  <AccordionBody accordionId="2">
                    <div className="order-menu-section">
                      <div className="order-section">
                        <div className="order-items">
                          <div className="items non-veg">
                            <h6>Barbaresca Pasta</h6>
                            <p>
                              Spinach ravioli with combination sauce, broccoli,
                              zucchini.
                            </p>
                            <h5>$10.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                add
                              </button>
                              <div
                                className={`qty-box cart_qty ${
                                  isOpen ? "open" : ""
                                }`}
                              >
                                <InputGroup className="shadow-none">
                                  <Button
                                    color="transparent"
                                    className="text-c5 shadow-none"
                                    onClick={handleDecrementAdult}
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </Button>
                                  <Input
                                    type="text"
                                    value={valueAdult}
                                    onChange={handleChangeAdult}
                                    min="1"
                                    className="w30px p-0 text-center border-0 rounded-0"
                                  />
                                  <Button
                                    color="transparent"
                                    className="text-c5 shadow-none"
                                    onClick={handleIncrementAdult}
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </Button>
                                </InputGroup>
                              </div>
                            </div>
                          </div>
                          <div className="items non-veg">
                            <h6>Sprouts Salad</h6>
                            <p>
                              Tomato, cucumber, peppers, olives, onion, feta,
                              iceberg lettuce.
                            </p>
                            <h5>$10.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                add
                              </button>
                              <div
                                className={`qty-box cart_qty ${
                                  isOpen ? "open" : ""
                                }`}
                              >
                                <div className="input-group">
                                  <button
                                    type="button"
                                    className="btn qty-left-minus rounded-0"
                                    data-type="minus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                  <input
                                    type="text"
                                    name="quantity"
                                    className="form-control input-number qty-input"
                                    value="1"
                                    tabindex="0"
                                  />
                                  <button
                                    type="button"
                                    className="btn qty-right-plus rounded-0"
                                    data-type="plus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="items veg">
                            <h6>Barbaresca Pasta</h6>
                            <p>
                              Spinach ravioli with combination sauce, broccoli,
                              zucchini.
                            </p>
                            <h5>$10.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                add
                              </button>
                              <div
                                className={`qty-box cart_qty ${
                                  isOpen ? "open" : ""
                                }`}
                              >
                                <div className="input-group">
                                  <button
                                    type="button"
                                    className="btn qty-left-minus rounded-0"
                                    data-type="minus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                  <input
                                    type="text"
                                    name="quantity"
                                    className="form-control input-number qty-input"
                                    value="1"
                                    tabindex="0"
                                  />
                                  <button
                                    type="button"
                                    className="btn qty-right-plus rounded-0"
                                    data-type="plus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="items veg">
                            <h6>Sprouts Salad</h6>
                            <p>
                              Tomato, cucumber, peppers, olives, onion, feta,
                              iceberg lettuce.
                            </p>
                            <h5>$10.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                add
                              </button>
                              <div
                                className={`qty-box cart_qty ${
                                  isOpen ? "open" : ""
                                }`}
                              >
                                <div className="input-group">
                                  <button
                                    type="button"
                                    className="btn qty-left-minus rounded-0"
                                    data-type="minus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                  <input
                                    type="text"
                                    name="quantity"
                                    className="form-control input-number qty-input"
                                    value="1"
                                    tabindex="0"
                                  />
                                  <button
                                    type="button"
                                    className="btn qty-right-plus rounded-0"
                                    data-type="plus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="items veg">
                            <h6>Barbaresca Pasta</h6>
                            <p>
                              Spinach ravioli with combination sauce, broccoli,
                              zucchini.
                            </p>
                            <h5>$10.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                add
                              </button>
                              <div
                                className={`qty-box cart_qty ${
                                  isOpen ? "open" : ""
                                }`}
                              >
                                <div className="input-group">
                                  <button
                                    type="button"
                                    className="btn qty-left-minus rounded-0"
                                    data-type="minus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                  <input
                                    type="text"
                                    name="quantity"
                                    className="form-control input-number qty-input"
                                    value="1"
                                    tabindex="0"
                                  />
                                  <button
                                    type="button"
                                    className="btn qty-right-plus rounded-0"
                                    data-type="plus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="items veg">
                            <h6>Sprouts Salad</h6>
                            <p>
                              Tomato, cucumber, peppers, olives, onion, feta,
                              iceberg lettuce.
                            </p>
                            <h5>$10.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                                onClick={() => setIsOpen(!isOpen)}
                              >
                                add
                              </button>
                              <div
                                className={`qty-box cart_qty ${
                                  isOpen ? "open" : ""
                                }`}
                              >
                                <div className="input-group">
                                  <button
                                    type="button"
                                    className="btn qty-left-minus rounded-0"
                                    data-type="minus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-minus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                  <input
                                    type="text"
                                    name="quantity"
                                    className="form-control input-number qty-input"
                                    value="1"
                                    tabindex="0"
                                  />
                                  <button
                                    type="button"
                                    className="btn qty-right-plus rounded-0"
                                    data-type="plus"
                                    data-field=""
                                    tabindex="0"
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="3">
                    <Image
                      src={suitcase}
                      alt=""
                      className="img-fluid w24px me8"
                    />{" "}
                    additional baggage
                  </AccordionHeader>
                  <AccordionBody accordionId="3">
                    <div className="order-menu-section">
                      <div className="order-section">
                        <div className="order-items">
                          <div className="items">
                            <h6>additional 5 KG</h6>
                            <h5>$10.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                              >
                                add
                              </button>
                            </div>
                          </div>
                          <div className="items">
                            <h6>additional 7 KG</h6>
                            <h5>$15.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                              >
                                add
                              </button>
                            </div>
                          </div>
                          <div className="items">
                            <h6>additional 10 KG</h6>
                            <h5>$20.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                              >
                                add
                              </button>
                            </div>
                          </div>
                          <div className="items">
                            <h6>additional 15 KG</h6>
                            <h5>$25.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                              >
                                add
                              </button>
                            </div>
                          </div>
                          <div className="items">
                            <h6>additional 20 KG</h6>
                            <h5>$30.00</h5>
                            <div className="addtocart_btn">
                              <button
                                className="add-button add_cart"
                                title="Add to cart"
                                tabindex="0"
                              >
                                add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ReviewSectionFa;
