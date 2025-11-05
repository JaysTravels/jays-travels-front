import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import Image from "next/image";
import contactLogo from "@/public/images/top-logo.png";
import { submitEnquiryRequest,enquirySlice } from "@/store/enquirySlice";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Button } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha"; 
const ContactUs = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const enquiryResults = useSelector((state) => state?.enquiry?.response);
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [message,setMessage] = useState('');
  const [fnerror, setFnError] = useState(''); 
  const [lnerror, setLnError] = useState(''); 
  const [phoneerror, setphoneError] = useState(''); 
  const [emailerror, setemailError] = useState(''); 
  const [messageerror, setmessageError] = useState(''); 
  const [success, setSuccess] = useState(''); 
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaSiteKey = "6LdthQMsAAAAAN7XyLOt3bxBTO2CtfIXMcHfGM7j"; // replace with your actual site key

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };
  const handleFNChange = (e) => {
    setFirstname(e.target.value);
    setFnError('');
  };
const isGarbageText = (text) => {
  // Reject if too short or contains almost no vowels (likely random)
  if (text.length < 2) return true;
  const vowelCount = (text.match(/[aeiou]/gi) || []).length;
  if (vowelCount / text.length < 0.2) return true;

  // Reject if it has repeating patterns or looks like gibberish
  if (/([a-zA-Z])\1{2,}/.test(text)) return true; // e.g., aaa, xxx
  if (/^[a-zA-Z]+$/.test(text) && /[A-Z]/.test(text) && /[a-z]/.test(text) && !/\s/.test(text))
    return true; // random uppercase/lowercase mix with no space
  if (/\d{5,}/.test(text)) return true; // long numbers

  return false;
};
  const handleLNChange = (e) => {
    setLastname(e.target.value);
    setLnError('')
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setphoneError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setemailError('');
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setmessageError('');
  };
 const verifydata = () => {
  // First name
  if (!firstname.trim()) {
    setFnError('First name is required'); 
    return false;
  } else if (isGarbageText(firstname)) {
    setFnError('Please enter a valid first name'); 
    return false;
  } else {
    setFnError(''); 
  }

  // Last name
  if (!lastname.trim()) {
    setLnError('Last name is required'); 
    return false;
  } else if (isGarbageText(lastname)) {
    setLnError('Please enter a valid last name'); 
    return false;
  } else {
    setLnError(''); 
  }

  // Phone validation
  if (!phone.trim()) {
    setphoneError('Phone number is required'); 
    return false;
  } else if (!/^\+?\d{7,15}$/.test(phone)) {
    setphoneError('Invalid phone number'); 
    return false;
  } else {
    setphoneError(''); 
  }

  // Email validation
  if (!email.trim()) {
    setemailError('Email is required'); 
    return false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setemailError('Invalid email format'); 
    return false;
  } else {
    setemailError(''); 
  }

  // Message validation
  if (!message.trim()) {
    setmessageError('Message is required'); 
    return false;
  } else if (message.length < 10) {
    setmessageError('Message is too short'); 
    return false;
  } else if (isGarbageText(message)) {
    setmessageError('Please write a meaningful message'); 
    return false;
  } else {
    setmessageError(''); 
  }

  return true;
};
  const verifydataold = () => {
    if (!firstname.trim()) {
      setFnError('First name is required'); 
      return false;
    }
    else{
      setFnError(''); 
    }
    if (!lastname.trim()) {
      setLnError('Last name is required'); 
      return false;
    }else{
      setLnError(''); 
    }

    if (!phone.trim()) {
      setphoneError('Phone number is required'); 
      return false;
    }else{
      setphoneError(''); 
    }


    if (!email.trim()) {
      setemailError('Email is required'); 
      return false;
    }else{
      setemailError(''); 
    }


    if (!message.trim()) {
      setmessageError('Message is required'); 
      return false;
    }
    else{
      setmessageError(''); 
    }
    return true;
  }
  const DispatchData=()=>{

    if(verifydata() === false){
      return;
    } 
     if (!captchaToken) {
      alert("Please verify that you're not a robot.");
      return;
    }
    let enquiryRequest = {
      "FirstName": firstname,
      "LastName" : lastname,
      "PhoneNumber": phone,
      "EmailAddress": email,
      "Message": message,
      "Source": "Contact-Us"
     }
		 try{
			  dispatch(submitEnquiryRequest(enquiryRequest)).unwrap().then(()=>{
          setFnError('');  // Clear error
				setSuccess('Form submitted successfully! 🎉');   
			  })
		  } catch (error) {
			console.error("Error calling setPassengerDetails:", error.message);
		  }
    }  
  return (
    <>
      <Meta title="Contact Us" />
      <FrontNavbar/>
     <div classname="container">
  <div classname="row">
 <section className="breadcrumb-section pt-0">
  <div className="contact-map h-100 mt-0">
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.546280219547!2d-1.9656755230742287!3d52.48735033864602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bd6c2724291d%3A0xb505e6f60e2c0f5e!2s349%20High%20St%2C%20Smethwick%20B66%203PB!5e0!3m2!1sen!2suk!4v1735615621217!5m2!1sen!2suk" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</section>

 <section className="small-section">
  <div className="container">
    <div className="row">
      <div className="col-md-8">
        <div className="get-in-touch">
          <h3>get in touch</h3>
          <form>
            <div className="row">
              <div className="form-group col-md-6">
                <input type="text" className="form-control"
                 id="name" placeholder="first name" required value={firstname}
                  onChange={handleFNChange} />
                  {fnerror && <p style={{ color: 'red' }}>{fnerror}</p>} {/* Show error if exists */}
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="last-name" placeholder="last name" required value={lastname}
                  onChange={handleLNChange} />
                   {lnerror && <p style={{ color: 'red' }}>{lnerror}</p>} {/* Show error if exists */}
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="review" placeholder="phone number" required  value={phone}
                  onChange={handlePhoneChange} />
                   {phoneerror && <p style={{ color: 'red' }}>{phoneerror}</p>} 
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="email" placeholder="email address" required  value={email}
                  onChange={handleEmailChange} />
                   {emailerror && <p style={{ color: 'red' }}>{emailerror}</p>} 
                   </div>
              <div className="form-group col-md-12">
                <textarea className="form-control" placeholder="Write Your Message" id="exampleFormControlTextarea1" rows={6} defaultValue={""}  required  value={message}
                  onChange={handleMessageChange} />
                   {messageerror && <p style={{ color: 'red' }}>{messageerror}</p>}
              </div>
              <div className="col-md-12 submit-btn">
                {/* <button className="btn btn-solid" type="button" onClick={DispatchData}>Send Your Message</button> */}
               {/* <ReCAPTCHA
              sitekey={recaptchaSiteKey}
               onChange={handleCaptchaChange}
              /> */}
                <Button                 
                 className="btn btn-solid"
                  onClick={DispatchData}>
                 Send Your Message
                </Button>
                {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>} {/* Show success message */}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-4 contact_right contact_section">
        <div className="row">
        <div className="col-md-12 col-6">
            <div className="contact_wrap">
            <Image src={contactLogo} alt="" className="img-fluid logo" />
            </div>
          </div>
          <div className="col-md-12 col-6">
            <div className="contact_wrap">
              <div className="title_bar">
                <i className="fas fa-map-marker-alt" />
                <h4>Address</h4>
              </div>
              <div className="contact_content">
                <p>349 High Street, Smethwick, West Midlands <br />
                B66 3PB, United Kingdom</p>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-6">
            <div className="contact_wrap">
              <div className="title_bar">
                <i className="fas fa-envelope" />
                <h4>email address</h4>
              </div>
              <div className="contact_content">
                <ul>
                  <li>info@jaystravels.co.uk</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-6">
            <div className="contact_wrap">
              <div className="title_bar">
                <i className="fas fa-phone-alt" />
                <h4>phone</h4>
              </div>
              <div className="contact_content">
                <ul>
                  <li>+44 80081  01600</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
  </div>
 
  <Footer/>

</>
  );
};

export default ContactUs;
