import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import Image from "next/image";


const makePayment = () => {
  return (
    <>
      <div className="container">
       <section className="small-section">
       <div className="title-1">
        <h2>Welcome to the Jays Travel Payment Facility</h2>
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
     
        <div className="get-in-touch">
          <form>
            <div className="row">
            <div className="form-group col-md-6">
                <input type="text" className="form-control" id="name" placeholder="How much would you like to pay?" required />
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="last-name" placeholder="Your Booking Reference" required />
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="name" placeholder="first name" required />
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="last-name" placeholder="last name" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="review" placeholder="phone number" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="email" placeholder="email address" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="review" placeholder="Billing Address Line 1" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="review" placeholder="City" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="email" placeholder="Post Code / Zip Code" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="email" placeholder="Country" required />
              </div>
              <div className="form-group col-lg-12" required>
             <input type="checkbox" className="make-payment-checkbox" /><p>Check here to confirm that you have read and accept our Terms & Conditions</p>
              </div>
             
           
              <div className="col-md-12 submit-btn">
                <button className="btn btn-solid" type="submit">Continue</button>
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
                  <li> +44-80081-01600</li>
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

export default makePayment;