import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { submitInsuranceRequest,insuranceSlice } from "@/store/InsuranceSlice";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Button } from "reactstrap";


const Insurance = () => {

  const router = useRouter();
    const dispatch = useDispatch();
    const insuranceResults = useSelector((state) => state?.insurance?.response);
    const [whereto,setWhereto] = useState('');
    const [travellers,setTravellers] = useState('');
    const [deptDate,setDeptDate] = useState('');
    const [returnDate,setReturnDate] = useState('');
    const [email,setEmail] = useState('');
    const [contact, setContact] = useState(''); 
    const [wterror, setWtError] = useState(''); 
    const [terror, setTError] = useState(''); 
    const [depterror, setdeptError] = useState(''); 
    const [returnerror, setreturnError] = useState(''); 
    const [emailerror, setemailError] = useState(''); 
    const [contacterror, setcontactError] = useState('');    
    const [success, setSuccess] = useState(''); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleWTChange = (e) => {
      setWhereto(e.target.value);
      setWtError('')
      
    };
    const handleTravellerChange = (e) => {
      
      setTravellers(e.target.value);
      setTError('');
      
    };
    const handleDeptDateChange = (date) => {
      setDeptDate(date);
      setdeptError(""); // Clear error on selection
    };
    const handleReturnDateChange = (date) => {
      if (date && deptDate && date < deptDate) {
        setreturnError("Return date must be after departure date.");
      } else {
        setReturnDate(date);
        setreturnError(""); 
      }
    };
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      setemailError('');
    };

    const handleContactChange = (e) => {
      setContact(e.target.value);
      setcontactError('');
    };

    const verifydata = () => {
      if (!whereto.trim()) {
        setWtError('Where to is required'); 
        return false;
      }
      else{
        setWtError(''); 
      }
      if (!travellers.trim()) {
        setTError('Traveller is required'); 
        return false;
      }else{
        setTError(''); 
      }  
      if (!email.trim()) {
        setemailError('Email is required'); 
        return false;
      }else{
        setemailError(''); 
      }
      if (!contact.trim()) {
        setcontactError('Contact is required'); 
        return false;
      }else{
        setcontactError(''); 
      }  
      
      return true;
    }
  
     const DispatchData2=()=>{
      debugger;
        if(verifydata() === false){
          return;
        } 
        let insuranceRequest = {
          "WhereTo": whereto,
          "NumnerOfTravellers" : travellers,
          "DepartureDate": deptDate,
          "ReturnDate": returnDate,
          "Email": email,
          "Contact": contact
         }
         try{
            dispatch(submitInsuranceRequest(insuranceRequest)).unwrap().then(()=>{
             // setFnError('');  // Clear error
            setSuccess('Query submitted successfully! 🎉');   
            })
          } catch (error) {
          console.error("Error calling setPassengerDetails:", error.message);
          }
        } 

        const DispatchData = async () => {
          if (verifydata() === false) {
            return;
          }
      
          let insuranceRequest = {
            "WhereTo": whereto,
            "NumnerOfTravellers" : travellers,
            "DepartureDate": deptDate,
            "ReturnDate": returnDate,
            "Email": email,
            "Contact": contact
           }
      
          try {
            setIsSubmitting(true); // Disable button
            await dispatch(submitInsuranceRequest(insuranceRequest)).unwrap();
            setReturnDate(null);
            setDeptDate(null);
            setTravellers('');
            setEmail('');
            setContact('');
            setWhereto('');
            setSuccess("Query submitted successfully! 🎉");
          } catch (error) {
            console.error("Error calling setPassengerDetails:", error.message);
          } finally {
            setIsSubmitting(false); // Re-enable button after API call
          }
        };

  return (
    <>
      <Meta title="Insurance" />
      <FrontNavbar/>
      <div className="container">
      <div className="title-1">
        <h2> Travel Insurance</h2>
      </div>
 <section className="small-section">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="contact-map">
        <div class="card">
 <div class="card-header">
                                            <h5>
                                            Travel Insurance
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                        Accidents of any kind can kill the travel buzz like nothing else. The insurance sounds like something that would bother you only when you are far away from travelling but that is not true. It could be a loss of a luggage or sudden medical emergencies, travel insurance can cover base for most of them and it gives a different type of mental peace. We want to change the idea of insurance being the villain and giving you sleepless nights both before and after using it.
                                         The uncertainty of something going wrong and you being deserted in an unknown place with little or no help is as much of a nightmare for us as it is for you.
                                        </div>
                                        <div class="card-body">
                                       <b> Jays Travel team is now introducing travel insurance into the minds of travelers to change the way people perceive it while going on both business and pleasure trips. We offer one of the best travel insurances in the market which ensures that any loss that you have had and that is covered in the contracts will be reimbursed as immediately as possible.</b>
                                        </div>
                                    </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="get-in-touch">
          <h3>Get Customised Travel Cover</h3>
          <form>
            <div className="row">
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="whereto" required value={whereto} placeholder="Where to ?" required 
                 onChange={handleWTChange}
                />
                {wterror && <p style={{ color: 'red' }}>{wterror}</p>} {/* Show error if exists */}
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="nooftraveller" placeholder="No. of travellers" required
                value={travellers}  onChange={handleTravellerChange}
                />
                  {terror && <p style={{ color: 'red' }}>{terror}</p>} {/* Show error if exists */}
              </div>
              <div className="form-group col-lg-6">
              <DatePicker
                selected={deptDate}
                onChange={handleDeptDateChange}
                className="px12 form-control rounded-0"
                placeholderText="Departure Date"
                dateFormat="dd-MM-yyyy"
                minDate={new Date()} // Prevent selecting past dates
                required
        />
        {depterror && <p style={{ color: "red" }}>{depterror}</p>}
              </div>
              <div className="form-group col-lg-6">
              <DatePicker
              selected={returnDate}
              onChange={handleReturnDateChange}
              className="form-control"
              placeholderText="Return Date"
              dateFormat="dd-MM-yyyy"
              minDate={deptDate || new Date()} // Ensure return date is after departure
              required
        />
        {returnerror && <p style={{ color: "red" }}>{returnerror}</p>}
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="email" placeholder="Email" required 
                 value={email}  onChange={handleEmailChange} 
                />
                 {emailerror && <p style={{ color: 'red' }}>{emailerror}</p>} {/* Show error if exists */}
              </div>
             
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="contact" placeholder="Contact Number" required 
                 value={contact}  onChange={handleContactChange} 
                />
                {contacterror && <p style={{ color: 'red' }}>{contacterror}</p>} {/* Show error if exists */}
              </div>
              <div className="col-md-12 submit-btn">
                {/* <button className="btn btn-solid" type="submit">Enquire now</button> */}
                <Button  className="btn btn-solid" onClick={DispatchData}  disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Enquire now"}
                 </Button>
                 {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>} {/* Show success message */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
    
      <Footer/>

    </>
  );
};

export default Insurance;