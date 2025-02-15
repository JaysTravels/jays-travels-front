import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import Image from "next/image";
import {getManualPaymentPage} from "@/store/ManualPayment";

import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';

const MakePayment = () => {
  console.log("Environment:", process.env.NODE_ENV);
   const dispatch = useDispatch();
   const paymentResponse = useSelector((state) => state.manualpayment.manual_payment_response);
   const [buttonText, setBttonText] = useState('Continue'); 
   const [confirmText, setconfirmText] = useState('Confirm Details');   
   const [loading , setLoading] = useState(false);
   const [showerror , setshowError] = useState(false);
   const [showLabel,setshowLabel] = useState(false);
   const [showcancel,setShowcancel] = useState(false);
   const [showconfirm,setShowconfirm] = useState(false);
   const [showsubmit,setShowsubmit] = useState(true);
   const [isInputDisabled, setIsInputDisabled] = useState(false);
   const [confirmDisabled , setconfirmDisabled] = useState(false);
   const [isConfirmed, setIsConfirmed] = useState(false);
   const [formData, setFormData] = useState({
    amount: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postal: '',
    country: '',
    bookingref: '',
  });
  const [errors, setErrors] = useState({
    amount: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postal: '',
    country: '',
    bookingref: '',
    chkconfirm: '',
  });

  const handleCheckboxChange = (e) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Running in development mode');
    } else if (process.env.NODE_ENV === 'production') {
      console.log('Running in production mode');
    } else {
      console.log('Running in an unknown mode');
    }
    setIsConfirmed(e.target.checked);
    setErrors((prevErrors) => ({
      ...prevErrors,
      chkconfirm: '',
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    setshowError(false);
  };
 

  const  handleConfirm = async(e)=>{
    
    e.preventDefault();
    setconfirmText("Please wait...")
    setconfirmDisabled(true);
    setShowcancel(false);
    setshowLabel(false);
    setLoading(true)
    let data ;
    const paymentRequest = {
      OrderId: formData.bookingref,
      Amount: formData.amount, 
      Currency: "GBP",
      Language: 'en_US'
      }    

     try { 
      const paymentPageData = await dispatch(getManualPaymentPage(paymentRequest)).unwrap();        
      console.log('Get payment successfully:', paymentPageData);
       //debugger;
       data = paymentPageData;
       if(paymentPageData == undefined){
        data = paymentResponse;
       }
       
       
       if (data && data.response == "Success" && data.data.url) {

        if (formData) {
          localStorage.setItem("ManualPaymentformData", JSON.stringify(formData));
        }
        data = data.data;
        debugger;
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.url;

        Object.keys(data.parameters)
          .sort()
          .forEach((key) => {          
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key.toUpperCase();
            input.value = data.parameters[key];
            form.appendChild(input);
          });
        document.body.appendChild(form);
        form.submit();
       }   
       else{
        setconfirmText("Continue")
        setconfirmDisabled(false);
        setshowError(true);
       }  
    } catch (err) {
      console.error('An error occurred:', err);     
    } finally {    
      setconfirmText("Continue")
      setconfirmDisabled(false);
    }
  }
    const handleSubmit = (e) => { 
      e.preventDefault();
      setshowError(false);
      const newErrors = {};
      for (const key in formData) {
        if (!formData[key].trim()) {
          newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        }
      }
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      
      if(!isConfirmed) { return;}
      setshowLabel(true);
      setShowconfirm(true);
      setShowcancel(true);
      setShowsubmit(false);
      setIsInputDisabled(true);
      
     }

     const handleCancel = (e) => { 
      e.preventDefault();
      setshowLabel(false);
      setShowconfirm(false);
      setShowcancel(false);
      setShowsubmit(true);
      setIsInputDisabled(false);
     }

  return (
    <>
      <div className="container">
       <section className="small-section">
       <div className="title-1">
        <h2>Welcome to Jays Travel Payment Facility</h2>
      </div>
      <div className="row">
      <div className="col-md-8">
      <h6>To pay for your booking, please complete the form below. The information entered will be passed onto our Barclaycard payment
         page where you can complete the payment process by entering your credit card details through the secure payment facility.</h6>
         <h6>Please check all details thoroughly.</h6>
         </div>
         </div>
    <div className="row">
    <h3><b>Make a Secure Payment (£)</b></h3>
   
      <div className="col-md-8">
      <br/>
        <div className="get-in-touch">
          <form>
            <div className="row">
            <div className="form-group col-md-6">
                <input type="text" className="form-control" id="amount"  disabled={isInputDisabled} 
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}  placeholder="How much would you like to pay?" required />
                   {errors.amount && <span style={{ color: 'red' }}>{errors.amount}</span>}
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="bookingref"  disabled={isInputDisabled} 
                  name="bookingref"
                  value={formData.bookingref}
                  onChange={handleChange}  placeholder="Your Booking Reference" required />
                   {errors.bookingref && <span style={{ color: 'red' }}>{errors.bookingref}</span>}
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control"  disabled={isInputDisabled} 
                  id="firsname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange} placeholder="first name" required />
                   {errors.firstname && <span style={{ color: 'red' }}>{errors.firstname}</span>}
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="lastname"  disabled={isInputDisabled} 
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}  placeholder="last name" required />
                   {errors.lastname && <span style={{ color: 'red' }}>{errors.lastname}</span>}
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="phone" name="phone"  disabled={isInputDisabled} 
                  value={formData.phone}
                  onChange={handleChange}  placeholder="phone number" required />
                   {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="email" name="email"  disabled={isInputDisabled} 
                  value={formData.email}
                  onChange={handleChange}  placeholder="email address" required />
                   {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="address" name="address"  disabled={isInputDisabled} 
                  value={formData.adress}
                  onChange={handleChange}  placeholder="Billing Address Line 1" required />
                   {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="city" name="city"  disabled={isInputDisabled} 
                  value={formData.city}
                  onChange={handleChange} placeholder="City" required />
                   {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="postal" name="postal"  disabled={isInputDisabled} 
                  value={formData.postal}
                  onChange={handleChange} placeholder="Post Code / Zip Code" required />
                   {errors.postal && <span style={{ color: 'red' }}>{errors.postal}</span>}
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="country" name="country"  disabled={isInputDisabled} 
                  value={formData.country}
                  onChange={handleChange} placeholder="Country" required />
                   {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
              </div>
              <div className="form-group col-lg-12" required>
             <input type="checkbox" id="chkconfirm"  checked={isConfirmed}
              onChange={handleCheckboxChange} className="make-payment-checkbox" /><p>Check here to confirm that you have read and accept our <a href="terms-conditions" style={{color:'#bcbcbc'}}>Terms & Conditions</a> *   {!isConfirmed && <span className="form-label" style={{ color: 'red' }}>  Required</span>}</p>
             
               {errors.chkconfirm && <span style={{ color: 'red' }}>{errors.chkconfirm}</span>}
              </div>
                      
              
              <div className="col-md-12 submit-btn">  
              {showcancel && (<button className="btn btn-solid" style={{marginRight: '15px'}} onClick={handleCancel}>Amend Details</button> )}
                {showsubmit && (<button className="btn btn-solid" onClick={handleSubmit}>{buttonText}</button>)}                
                {showconfirm && (<button className="btn btn-solid" disabled={confirmDisabled}  onClick={handleConfirm}>{confirmText}</button> )}
                {/* {showLabel && <span className="form-label">  Please verify all fields are ok</span>}   */}
                {showerror && <span className="form-label" style={{ color: 'red' }}>  Could not submit please try again... some thing went wrong</span>}      
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-4 contact_right contact_section">
        <div className="row">
          <div className="col-md-12 col-6">
            <div className="contact_wrap">
              <div className="title_bar">
                <h4>Prefer Bank Transfer?</h4>
              </div>
              <div className="title_bar">
                <h4><b>Jays Travel</b></h4>
              </div>
              <div className="title_bar">
                <h4>Bank Name:<b>Lloyds Bank</b></h4>
              </div>
              <div className="title_bar">
                <h4>Account number:<b>00130201</b></h4>
              </div>
              <div className="title_bar">
                <h4>Sort Code:<b>30-98-37</b></h4>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-6">
            <div className="contact_wrap">
              <div className="title_bar">
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
                <h4>phone</h4>
              </div>
              <div className="contact_content">
                <ul>
                  <li> 0800-8101600</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
      </div>
</>
  );

};
export default MakePayment;
