import { useRouter } from "next/router";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

const FrontNavOnly = (props) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onMouseEnter = () => setDropdownOpen(true);
  const onMouseLeave = () => setDropdownOpen(false);
  return (
    <>
      <Nav className="mx-auto" navbar>
      
      <NavItem>
          <NavLink href="#">Flights</NavLink>
        </NavItem><NavItem>
          <NavLink href="holidays">Holidays</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="hotels">Hotels</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="visa">Visa</NavLink>
          </NavItem>
        <NavItem>
          <NavLink href="insurance">Insurance</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="make-payment">
          Make Payment
          </NavLink>
        </NavItem>
        <NavItem>
  <NavLink href="https://wa.me/447912345678?text=Hi%20I%20need%20help%20with%20my%20booking"
    target="_blank" rel="noopener noreferrer">
    <FaWhatsapp className="me-1" />
    WhatsApp Chat
  </NavLink>
</NavItem>

      </Nav>
    </>
  );
};

export default FrontNavOnly;
