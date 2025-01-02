import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"


const generalConditions = () => {
  return (
    <>
      <Meta title="General Conditions" />
      <FrontNavbar/>
      <div className="container">
      <div className="title-1">
        <h2>General Conditions</h2>
      </div>
      <div className="row">
      <div className="col-lg-12">
      <div className="product_img_scroll" data-sticky_column>
        <div className="tab-content" id="top-tabContent">
          <div className="tab-pane fade active show" id="contact">
            <div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  General
                  </h5>
                </div>
                <div className="card-body">
               <h6> The laws of England and Wales govern these terms and conditions. By accessing this website [and using our services/buying our products] 
                you consent to these terms and conditions and to the exclusive jurisdiction of the English courts in all disputes arising out of such access.
                 If any of these terms are deemed invalid or unenforceable for any reason (including, but not limited to the exclusions and limitations set out above),
                  then the invalid or unenforceable provision will be severed from these terms and the remaining terms will continue to apply. Failure of the Company to 
                  enforce any of the provisions set out in these Terms and Conditions and any Agreement, or failure to exercise any option to terminate, shall not be 
                  construed as waiver of such provisions and shall not affect the validity of these Terms and Conditions or of any Agreement or any part thereof, 
                  or the right thereafter to enforce each and every provision. These Terms and Conditions shall not be amended, modified, varied or supplemented 
                  except in writing and signed by duly authorised representatives of the Company.</h6>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  Notification of Changes
                  </h5>
                </div>
                <div className="card-body">
                <h6>The Company reserves the right to change these conditions from time to time as it sees fit and your continued use of the site 
                  will signify your acceptance of any adjustment to these terms. If there are any changes to our privacy policy, we will announce that
                   these changes have been made on our home page and on other key pages on our site. If there are any changes in how we use our site 
                   customers' Personally Identifiable Information, notification by e-mail or postal mail will be made to those affected by this change. 
                   Any changes to our privacy policy will be posted on our web site 30 days prior to these changes taking place. You are therefore advised
                    to re-read this statement on a regular basis</h6>
                </div>
                <br/>
                <br/>
              </div>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
        </div>
  <Footer/>

    </>
  );
};

export default generalConditions;
