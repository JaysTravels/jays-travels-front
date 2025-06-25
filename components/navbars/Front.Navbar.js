import FrontNavOnly from "@/components/navbars/Front.NavOnly";
import Image from "next/image";
import topLogo from "@/public/images/top-logo.png";
import Link from 'next/link';
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
        <Link href={"https://jaystravels.co.uk/en-gb"}> <Image src={topLogo} alt="topLogo" className="img-fluid logo" /> </Link>

          <Collapse isOpen={isOpen} navbar>
            <div className="d-flex justify-content-end p-3">
              <NavbarToggler onClick={toggle}>
                <FontAwesomeIcon icon={faXmark} />
              </NavbarToggler>
            </div>

            <FrontNavOnly {...props} />
          </Collapse>
         
          <div className="actions-nav">
            <NavbarToggler onClick={toggle} />
            {/* <Button
              size="md"
              color="transparent d-lg-inline d-none"
              className="mx-lg-3"
              // onClick={() => router.push("/contact")}
            >
              Contact
            </Button>  */}
            <Input type="select" className="msLg15 ms5">
              <option value="GBP">GBP</option>
            </Input>
            {/* <Input type="select" className="msLg15 ms5">
              <option value="ENG">ENG</option>
            </Input> */}
            <Button
              size="md"
              color="transparent"
              className="msLg15 ms5"
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
