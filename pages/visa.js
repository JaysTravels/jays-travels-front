import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"


const visa = () => {
  return (
    <>
      <Meta title="visa" />
      <FrontNavbar/>
      <div className="container">
      <div className="title-1">
        <h2>Visas</h2>
      </div>
 <section className="small-section">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="contact-map">
        <div class="card">
 <div class="card-header">
                                            <h5>
                                            Visa Applications
                                            </h5>
                                        </div>
                                        <div class="card-body">
                                        Travelling far and wide is everyone’s dream while getting the visa is probably a major contributor to everyone’s nightmares. Getting a visa can sometimes get tedious and become the reason for the cancellation of impromptu plans. The procedure is tiring and can get even more complicated as people readily loot innocent travelers by luring them into devious ways of getting a visa. The right way of doing so is clearly mentioned by us and you will be getting the safe tips and tricks that are used 
                                        by professional travelers for a hassle free procedure.  Having an updated visa is an ideal situation and as the term ideal suggests it mostly does not exist.
                                        </div>
                                        <div class="card-body">
                                       <b> We aim to help you get your visa on time and with utmost convenience so that your trip and plans stay intact along with your mood and state of mind which is the best way to prepare it for a fun trip.</b>
                                        </div>
                                    </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="get-in-touch">
          <h3>Apply for a visa</h3>
          <form>
            <div className="row">
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="name" placeholder="I am a citizen of" required />
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" id="last-name" placeholder="Living in" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="review" placeholder="Traveling to" required />
              </div>
              <div className="form-group col-lg-6">
                <input type="text" className="form-control" id="email" placeholder="email address" required />
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

export default visa;