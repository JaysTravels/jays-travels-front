import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"


const insurance = () => {
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
                <input type="text" className="form-control" id="name" placeholder="Where to ?" required />
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="last-name" placeholder="No. of travellers" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="datepicker" data-type="datepicker" placeholder="Departure Date" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="email" placeholder="Return Date" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="datepicker" data-type="datepicker" placeholder="Email Address" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="email" placeholder="Contact Number" required />
              </div>
              <div className="col-md-12 submit-btn">
                <button className="btn btn-solid" type="submit">Apply for visa</button>
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

export default insurance;