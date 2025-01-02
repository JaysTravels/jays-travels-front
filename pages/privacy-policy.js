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
        <h2>Privacy Policy</h2>
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
                  Who we are
                  </h5>
                </div>
                <div className="card-body">
               <h6> Our website address is: https://jaystravels.designfortravel.co.uk.</h6>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  Comments
                  </h5>
                </div>
                <div className="card-body">
                <h6>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s
                     IP address and browser user agent string to help spam detection.</h6>
                     <h6>An anonymised string created from your email address (also called a hash) may be provided to the Gravatar service 
                        to see if you are using it. The Gravatar service Privacy Policy is available here: https://automattic.com/privacy/. 
                        After approval of your comment, your profile picture is visible to the public in the context of your comment.</h6>
                </div>
                <br/>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  Media
                  </h5>
                </div>
                <div className="card-body">
                <h6>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) 
                    included. Visitors to the website can download and extract any location data from images on the website.</h6>
                </div>
                <br/>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  Cookies
                  </h5>
                </div>
                <div className="card-body">
                <h6>If you leave a comment on our site you may opt in to saving your name, email address and website in cookies. These are for your convenience so 
                    that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</h6>
                    <h6>If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal
                         data and is discarded when you close your browser.</h6>
                         <h6>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, 
                            and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</h6>
                            <h6>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</h6>
                </div>
                <br/>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  Embedded content from other websites
                  </h5>
                </div>
                <div className="card-body">
                <h6>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). 
                    Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</h6>
                    <h6>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content,
                     including tracking your interaction with the embedded content if you have an account and are logged in to that website.</h6>
                </div>
                <br/>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  Who we share your data with
                  </h5>
                </div>
                <div className="card-body">
                <h6>If you request a password reset, your IP address will be included in the reset email.</h6>
                </div>
                <br/>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  How long we retain your data
                  </h5>
                </div>
                <div className="card-body">
                <h6> If you leave a comment, the comment and its metadata are retained indefinitely. 
                    This is so we can recognise and approve any follow-up comments automatically instead of holding them in a moderation queue.</h6>
                    <h6>For users that register on our website (if any), we also store the personal information they provide in their user profile. 
                        All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website
                         administrators can also see and edit that information.</h6>
                </div>
                <br/>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  What rights you have over your data
                  </h5>
                </div>
                <div className="card-body">
                <h6> If you have an account on this site, or have left comments, you can request to receive an exported 
                    file of the personal data we hold about you, including any data you have provided to us. 
                    You can also request that we erase any personal data we hold about you. This does not include any data we are 
                    obliged to keep for administrative, legal, or security purposes.</h6>
                </div>
                <br/>
              </div>
              <div className="card">
                <div className="card-header">
                  <h5>
                  Where we send your data
                  </h5>
                </div>
                <div className="card-body">
                <h6> Visitor comments may be checked through an automated spam detection service.</h6>
                </div>
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
