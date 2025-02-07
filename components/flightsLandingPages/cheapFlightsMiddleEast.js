
import Image from "next/image";
import Bahrain from "@/public/images/FlightOffers/middle-east/Bahrain.jpg"
import Riyadh from "@/public/images/FlightOffers/middle-east/Riyadh.jpg"
import Cairo from "@/public/images/FlightOffers/middle-east/Cairo.jpg"
import Dubai from "@/public/images/FlightOffers/middle-east/Dubai.jpg"
import Muscat from "@/public/images/FlightOffers/middle-east/Muscat.jpg"
import AbuDhabhi from "@/public/images/FlightOffers/middle-east/Abu-Dhabhi.jpg"
import DarEsSalaam from "@/public/images/FlightOffers/middle-east/Dar-Es-Salaam.jpg"
import Jeddah from "@/public/images/FlightOffers/middle-east/Jeddah.jpg"

const cheapFlightsMiddleEast = () => {
  return (
    <>
     <section className="portfolio-section bg-white small-section ratio2_3">
  <div className="container">
  <div className="title-1">
        <h2>Cheap Flights Middle East</h2>
      </div>
    <div className="row content grid zoom-gallery">
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Bahrain} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Bahrain</h3>
            <h6>London to Bahrain <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £567</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Riyadh} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Riyadh</h3>
            <h6>London to Riyadh <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £298</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Cairo} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Cairo</h3>
            <h6>London to Cairo <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £247</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Dubai} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Dubai</h3>
            <h6>London to Dubai <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £316</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Muscat} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Muscat</h3>
            <h6>London to Muscat <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £416</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={AbuDhabhi} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Abu Dhabhi</h3>
            <h6>London to Abu Dhabhi <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £389</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={DarEsSalaam} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Dar Es Salaam</h3>
            <h6>London to Dar Es Salaam <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £430</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Jeddah} alt="" className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Jeddah</h3>
            <h6>London to Jeddah <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £428</span> </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default cheapFlightsMiddleEast;