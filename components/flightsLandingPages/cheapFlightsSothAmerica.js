
import Image from "next/image";
import Poland from "@/public/images/FlightOffers/Europe/Poland.jpg"
import SaoPaulo from "@/public/images/FlightOffers/south-america/Sao-Paulo.jpg"
import MexicoCity from "@/public/images/FlightOffers/south-america/Mexico-City.jpg"
import Lima from "@/public/images/FlightOffers/south-america/Lima.jpg"
import Bogota from "@/public/images/FlightOffers/south-america/Bogota.jpg"
import Salvador from "@/public/images/FlightOffers/south-america/Salvador.jpg"
import RioDeJaneiro from "@/public/images/FlightOffers/south-america/Rio-De-Janeiro.jpg"


const cheapFlightsSothAmerica = () => {
  return (
    <>
     <section className="portfolio-section bg-white small-section ratio2_3">
  <div className="container">
  <div className="title-1">
        <h2>Cheap Flights South America</h2>
      </div>
    <div className="row content grid zoom-gallery">
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={SaoPaulo} alt className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Sao Paulo</h3>
            <h6>London to Sao Paulo <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £623</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={MexicoCity} alt className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Mexico City</h3>
            <h6>London to Mexico City <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £672</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Lima} alt className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Lima</h3>
            <h6>London to Lima <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £593</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Bogota} alt className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Bogota</h3>
            <h6>London to Bogota <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £592</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={Salvador} alt className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Salvador</h3>
            <h6>London to Salvador <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £1,489</span> </h6>
          </div>
        </div>
      </div>
      <div className="popular grid-item wow fadeInUp col-lg-4 col-sm-6">
        <div className="overlay cheapflightoffers">
          <div className="portfolio-image">
            <a href="../assets/images/FlightOffers/Europe/Poland.jpg">
              <Image src={RioDeJaneiro} alt className="img-fluid lazyload bg-img" width={1280} height={720} />
            </a>
          </div>
          <div className="portfolio-text">
            <h3>Rio De Janeiro</h3>
            <h6>London to Rio De Janeiro <sup style={{fontFamily:'fangsong'}}>FR</sup><span style={{color:'#ff8103', fontSize:'x-large'} }> £50</span> </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default cheapFlightsSothAmerica;