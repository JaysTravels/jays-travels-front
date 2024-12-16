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
        <UncontrolledDropdown
          nav
          inNavbar
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          isOpen={dropdownOpen}
          toggle={toggle}
        >
          <DropdownToggle nav caret>
           Packages
          </DropdownToggle>
          <DropdownMenu left={true}>
            <Row>
              <Col lg={6}>
                <DropdownItem href="/types/delay-compensation">
                  Delay compensation
                </DropdownItem>
                <DropdownItem href="/types/cancellation-compensation">
                  Cancellation compensation
                </DropdownItem>
                <DropdownItem href="/types/denied-boarding-compensation">
                  Denied boarding compensation
                </DropdownItem>
                <DropdownItem href="/types/overbooked-compensation">
                  Overbooked compensation
                </DropdownItem>
              </Col>
              <Col lg={6}>
                <DropdownItem href="/types/missed-connection-compensation">
                  Missed connection compensation
                </DropdownItem>
                <DropdownItem href="/types/diversion-compensation">
                  Diversion compensation
                </DropdownItem>
                <DropdownItem href="/types/refunds">Refunds</DropdownItem>
                <DropdownItem href="/types/eu-reg-261-compensation">
                  EU Reg 261 compensation
                </DropdownItem>
              </Col>
            </Row>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem>
          <NavLink href="#">FAQ</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Visa</NavLink>
          </NavItem>
        <NavItem>
          <NavLink href="#">Insurance</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
          About
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default FrontNavOnly;
