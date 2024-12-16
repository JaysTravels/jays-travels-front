import Image from "next/image";
import creditcards from "@/public/images/creditcards.png";
import cvv from "@/public/images/cvv.png";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Input,
  Label,
} from "reactstrap";
import { useState } from "react";

const ReviewSectionFp = () => {
  const [open, setOpen] = useState("1");
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
          <h5>payment option</h5>
        </div>
        <div className="flight_detail payment-gateway">
          <Accordion open={open} toggle={toggle}>
            <AccordionItem>
              <AccordionHeader targetId="1">debit card</AccordionHeader>
              <AccordionBody accordionId="1">
                <form>
                  <div className="form-group">
                    <Label for="name">name on card</Label>
                    <Input type="text" id="name" />
                  </div>
                  <div className="form-group">
                    <Label for="number">card number</Label>
                    <Input type="text" id="number" />
                    <Image src={creditcards} alt="" className="img-fluid" />
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <Label for="month">month</Label>
                      <Input type="select" id="month">
                        <option selected>Month...</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </Input>
                    </div>
                    <div className="form-group col-md-4">
                      <Label for="year">year</Label>
                      <Input type="select" id="year">
                        <option selected>Year...</option>
                        <option>...</option>
                      </Input>
                    </div>
                    <div className="form-group col-md-4">
                      <Label for="cvv">cvv</Label>
                      <Input type="password" maxlength="4" id="cvv" />
                      <Image
                        src={cvv}
                        width={37}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="payment-btn">
                    <Button
                      color="c6"
                      size="md"
                      type="submit"
                      className="text-uppercase rounded-0"
                    >
                      make payment
                    </Button>
                  </div>
                </form>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="2">credit card</AccordionHeader>
              <AccordionBody accordionId="2">
                <form>
                  <div className="form-group">
                    <Label for="c-name">name on card</Label>
                    <Input type="text" id="c-name" />
                  </div>
                  <div className="form-group">
                    <Label for="c-number">card number</Label>
                    <Input type="text" id="c-number" />
                    <Image src={creditcards} alt="" className="img-fluid" />
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <Label for="c-month">month</Label>
                      <Input type="select" id="c-month">
                        <option selected>Month...</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                      </Input>
                    </div>
                    <div className="form-group col-md-4">
                      <Label for="c-year">year</Label>
                      <Input type="select" id="c-year">
                        <option selected>Year...</option>
                        <option>...</option>
                      </Input>
                    </div>
                    <div className="form-group col-md-4">
                      <Label for="c-cvv">cvv</Label>
                      <Input type="password" maxlength="4" id="c-cvv" />
                      <Image
                        src={cvv}
                        width={37}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="payment-btn">
                    <Button
                      color="c6"
                      size="md"
                      type="submit"
                      className="text-uppercase rounded-0"
                    >
                      make payment
                    </Button>
                  </div>
                </form>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="3">net banking</AccordionHeader>
              <AccordionBody accordionId="3">
                <form className="wallet-section">
                  <h6>select popular banks</h6>
                  <div className="row">
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios1"
                        id="Radios1"
                        value="option1"
                        checked
                      />
                      <Label className="form-check-label" for="Radios1">
                        Industrial & Commercial Bank
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios1"
                        id="Radios2"
                        value="option2"
                      />
                      <Label className="form-check-label" for="Radios2">
                        Construction Bank Corp.
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios1"
                        id="Radios3"
                        value="option2"
                      />
                      <Label className="form-check-label" for="Radios3">
                        Agricultural Bank
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios1"
                        id="Radios4"
                        value="option2"
                      />
                      <Label className="form-check-label" for="Radios4">
                        HSBC Holdings
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios1"
                        id="Radios5"
                        value="option2"
                      />
                      <Label className="form-check-label" for="Radios5">
                        Bank of America
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios1"
                        id="Radios6"
                        value="option2"
                      />
                      <Label className="form-check-label" for="Radios6">
                        JPMorgan Chase & Co.
                      </Label>
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <Label for="net-b">select bank</Label>
                    <Input type="select" id="net-b">
                      <option selected>Choose Bank...</option>
                      <option>...</option>
                    </Input>
                  </div>
                  <div className="payment-btn">
                    <Button
                      color="c6"
                      size="md"
                      type="submit"
                      className="text-uppercase rounded-0"
                    >
                      make payment
                    </Button>
                  </div>
                </form>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader targetId="4">my wallet</AccordionHeader>
              <AccordionBody accordionId="4">
                <form className="wallet-section">
                  <h6>select your wallet</h6>
                  <div className="row">
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios2"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <Label className="form-check-label" for="exampleRadios1">
                        Adyen
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios2"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <Label className="form-check-label" for="exampleRadios2">
                        Airtel Money
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios2"
                        id="exampleRadios3"
                        value="option2"
                      />
                      <Label className="form-check-label" for="exampleRadios3">
                        AlliedWallet
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios2"
                        id="exampleRadios4"
                        value="option2"
                      />
                      <Label className="form-check-label" for="exampleRadios4">
                        Apple Pay
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios2"
                        id="exampleRadios5"
                        value="option2"
                      />
                      <Label className="form-check-label" for="exampleRadios5">
                        Brinks
                      </Label>
                    </div>
                    <div className="form-check col-md-6">
                      <Input
                        className="form-check-input radio_animated"
                        type="radio"
                        name="exampleRadios2"
                        id="exampleRadios6"
                        value="option2"
                      />
                      <Label className="form-check-label" for="exampleRadios6">
                        CardFree
                      </Label>
                    </div>
                  </div>
                  <div className="payment-btn">
                    <Button
                      color="c6"
                      size="md"
                      type="submit"
                      className="text-uppercase rounded-0"
                    >
                      make payment
                    </Button>
                  </div>
                </form>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ReviewSectionFp;
