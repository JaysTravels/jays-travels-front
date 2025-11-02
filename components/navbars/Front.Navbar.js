"use client"; 
import FrontNavOnly from "@/components/navbars/Front.NavOnly";
import Image from "next/image";
import topLogo from "@/public/images/top-logo.png";
import Link from 'next/link';
import { decryptLocalData } from "@/utils/encrypt";
import {
  faCoffee,
  faUser,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
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
  const [loginuser, setloginUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef(null);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    try {

      const storedData = localStorage.getItem("userData");
      if (storedData) {
        debugger;
        const decryptedUser = decryptLocalData(storedData);
        setloginUser(decryptedUser);
      }
    } catch (err) {
      console.error("Failed to decrypt user:", err);
    }
  }, []);
useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 const handleLogout = () => {
    try {
      localStorage.removeItem("userData");
      setloginUser(null);
      setShowLogout(false);
      window.location.href = "/login"; // redirect user
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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
        <div className="actions-nav position-relative" ref={logoutRef}>
            <NavbarToggler onClick={toggle} />

            <Input type="select" className="msLg15 ms5">
              <option value="GBP">GBP</option>
            </Input>           
            <Button
              size="md"
              color="transparent"
              className="msLg15 ms5 d-flex align-items-center gap-2"
              onClick={() => setShowLogout((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faUser} />
              {loginuser ? (
                <span className="fw-semibold text-dark">
                  {loginuser.FirstName} {loginuser.LastName}
                </span>
              ) : (
                <span className="text-muted">Guest</span>
              )}
            </Button>     
            {showLogout && (
    <div
      className="position-absolute bg-white border rounded shadow-sm p-2"
      style={{
        top: "100%",
        right: "0",
        zIndex: 1000,
        minWidth: "120px",
      }}
    >
      {loginuser ? (
        <div
          className="text-danger fw-semibold text-center"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          Logout
        </div>
      ) : (
        <div
          className="text-primary fw-semibold text-center"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowLogout(false);
            window.location.href = "/login"; // redirect to login page
          }}
        >
          Login
        </div>
      )}
    </div>
  )}      
            {/* {loginuser && showLogout && (
              <div
                className="position-absolute bg-white border rounded shadow-sm p-2"
                style={{
                  top: "100%",
                  right: "0",
                  zIndex: 1000,
                  minWidth: "120px",
                }}
              >
                <div
                  className="text-danger fw-semibold text-center"
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )} */}
          </div>
         
       
          <div className="contact_custom txt-r">
  <div id="top1_div_destinationphone" style={{display: 'block'}}>
    <div className="desti_right_num_phone" style={{clear: 'both'}}>
    <i class="fa fa-phone-square" aria-hidden="true"></i>
    <a href="tel:+448008101600">0800-810-1600</a>
    </div>
  </div>
</div>
        
        </Navbar>
      </div>
    </>
  );
};

export default FrontNavbar;
