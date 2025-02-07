
import Image from "next/image";
import Lanzarote from "@/public/images/FlightOffers/europe/Lanzarote.jpg"
import Zurich from "@/public/images/FlightOffers/europe/Zurich.jpg"
import Brussels from "@/public/images/FlightOffers/europe/Brussels.jpg"
import Munich from "@/public/images/FlightOffers/europe/Munich.jpg"


const cheapFlightsEurope = () => {
  return (
    <>
     <section className="portfolio-section bg-white small-section ratio2_3">
  <div className="container">

  <div className="title-1">
        <h2>Cheap Flights Europe</h2>
      </div>
    <div className="row content grid zoom-gallery">
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Zurich} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Zurich</h3>
            <h6>London to Zurich <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £101</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Lanzarote} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Lanzarote</h3>
            <h6>Birmingham to Lanzarote <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £232</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Brussels} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Brussels</h3>
            <h6>London to Brussels <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £105</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Munich} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Munich</h3>
            <h6>London to Munich <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £50</span> </h6>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

    </>
  );
};

export default cheapFlightsEurope;