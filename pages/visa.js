import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import Script from 'next/script'
import { useEffect } from 'react';

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
 <div className="card-header">
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