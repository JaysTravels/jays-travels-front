import { useRouter } from "next/router";
import { useState } from "react";
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
          <NavLink href="https://jaystravels.co.uk/en-gb">Flights</NavLink>
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
          <NavLink href="/">
          <i class="fas fa-phone-alt" style={{marginRight:'7px',fontSize:'16px',color:'#ffff'}}></i>
           <a href="tel:00448008101600"><b id="top1_spnPhoneNumber_destination" className="rTapNumber166337 top-number1" style={{marginRight:'5px',fontSize:'20px',color:'#ffff',margin:'0', padding:'0'}}>0800-810-1600</b> </a> 
      
          </NavLink>
          
        </NavItem>
      </Nav>
    </>
  );
};

export default FrontNavOnly;
