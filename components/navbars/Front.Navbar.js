import FrontNavOnly from "@/components/navbars/Front.NavOnly";
import {
  faCoffee,
  faUser,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  Button,
  Collapse,
  Input,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

const FrontNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div className="frontNavbar">
        <Navbar expand="lg" container {...props}>
          <NavbarBrand href="/">
            Reservation<span className="opacity-50">System</span>
          </NavbarBrand>

          <NavbarToggler onClick={toggle} />

          <Collapse isOpen={isOpen} navbar>
            <div className="d-flex justify-content-end p-3">
              <NavbarToggler onClick={toggle}>
                <FontAwesomeIcon icon={faXmark} />
              </NavbarToggler>
            </div>

            <FrontNavOnly {...props} />
          </Collapse>

          <div className="actions-nav">
            {/* <Button
              size="md"
              color="transparent d-lg-inline d-none"
              className="mx-lg-3"
              // onClick={() => router.push("/contact")}
            >
              Contact
            </Button> */}
            <Input type="select">
              <option value="volvo">GBP</option>
              {/* <option value="saab">EUR</option>
              <option value="opel">INR</option>
              <option value="audi">AUD</option> */}
            </Input>
            <Input type="select" className="ms15">
              <option value="volvo">ENG</option>
              {/* <option value="saab">FRE</option>
              <option value="opel">SPA</option>
              <option value="audi">DUT</option> */}
            </Input>
            <Button
              size="md"
              color="transparent"
              className="ms15"
              // onClick={() => router.push("/contact")}
            >
              <FontAwesomeIcon icon={faUser} />
            </Button>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default FrontNavbar;
