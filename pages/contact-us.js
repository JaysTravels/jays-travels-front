import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import Image from "next/image";
import contactLogo from "@/public/images/top-logo.png";


const contactUs = () => {
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
              <div className="form-group col-md-12">
                <textarea className="form-control" placeholder="Write Your Message" id="exampleFormControlTextarea1" rows={6} defaultValue={""} />
              </div>
              <div className="col-md-12 submit-btn">
                <button className="btn btn-solid" type="submit">Send Your Message</button>
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

export default contactUs;
