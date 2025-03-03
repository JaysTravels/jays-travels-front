import Slider from "react-slick";
import { Container } from "reactstrap";
import image9 from "@/public/images/destination/9.jpg";
import image10 from "@/public/images/destination/10.jpg";
import image8 from "@/public/images/destination/8.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getDeeplink } from "@/store/deeplinkSlice";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



const CheapTicketsHome = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const deeplinkData = useSelector((state) => state.deeplink.response); // Adjust according to your state structure
 
  const deeplinkLoading = useSelector((state) => state.deeplink.loading);
  const deeplinkError = useSelector((state) => state.deeplink.error);

  const [deeplink, setDeeplink] = useState(null);

  useEffect(() => {
  
    const fetchDeeplink = async () => {

      const deeplinkPayload = { 
        "id": 0
       };
   
      dispatch(getDeeplink(deeplinkPayload))
      .unwrap()
      .then((result) => {
       
        console.log("API Response:", result);
        if (result) {         
          setDeeplink(result);
        } else {
          console.warn("Received null/undefined result");
        }
      })
      .catch((error) => {
        console.error("Error fetching deeplink:", error);
      });
    };

    fetchDeeplink();
  }, [dispatch]);
 
  const generateDeeplink = ({
    origin,
    destination,
    datefrom,
    dateTo,
    adults,
    children = 0,  // Default to 0 if null/undefined
    infant = 0,    // Default to 0 if null/undefined
    cabin = "economy",  // Default to "economy" if null/undefined
    flightType = "",  // Default to empty string if null/undefined
  }) => {
    const baseUrl = "https://jaystravels.co.uk/waitlanding";
    //debugger;
    // Build query string dynamically, filtering out empty values
    const queryParams = Object.entries({
      origin,
      destination,
      datefrom,
      dateTo,
      adults,
      children,
      infant,
      cabin,
      flightType,
    })
      .filter(([_, value]) => value !== undefined && value !== "") // Remove undefined or empty values
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // Encode values for URL safety
      .join("&");
    return `${baseUrl}?${queryParams}`;
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>    
        <div className="cheapTicketsHome pyLg100 py50 px-1">
        <Container fluid>
          <div className="title-2">
            <h2>
              cheap... <span>airline tickets</span>
            </h2>
            <p>
            Top selling agents for India, Asia, Canada and many more...
            </p>
          </div>

          <div className="slider-container">
            <Slider {...settings}>
          {/* dynamic data2 start here */}
            {   
  Array.isArray(deeplinkData?.data?.deepLinkModels) && deeplinkData.data.deepLinkModels.length > 0  ? (
    deeplinkData.data.deepLinkModels.map((item) => (
      <div key={item.deeplinkId}>
<div key={item.deeplinkId} className="price-box">
        <div className="price-img">
          <Link href={generateDeeplink({
                origin: item.origin,
                destination: item.destination,
                datefrom: item.departureDate,
                dateTo: item.returnDate,
                adults: item.adults,
                children: item.children ? undefined : 0,
                infant: item.infant ? undefined : 0,
                cabin: item.cabinClass ? undefined : "economy",
                flightType: item.flightType ? undefined : "",
              })}>
            <div
              className="img"
              style={{
                backgroundImage: `url(${item.imageUrl})`                      
              }}
            >
              <Image
                src={item.imageUrl}
                alt={item.countryName}
                className="img-fluid blur-up lazyload bg-img d-none"
                width={230}
                height={230}                 
              />
            </div>
          </Link>
          <span className="label">New</span>
        </div>
        <div className="price-content">
          <div className="price-title">
            <a href={generateDeeplink({
                  origin: item.origin,
                  destination: item.destination,
                  datefrom: item.departureDate,
                  dateTo: item.returnDate,
                  adults: item.adults,
                  children: item.children ? undefined : 0,
                  infant: item.infant ? undefined : 0,
                  cabin: item.cabinClass ? undefined : "economy",
                  flightType: item.flightType ? undefined : "",
                })} tabIndex="0">
                  <h3>{item.countryName}</h3>
                </a>
            <div className="like-cls">
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <div className="rating">
            <FontAwesomeIcon icon={faStar} size="xs" />
            <FontAwesomeIcon icon={faStar} size="xs" />
            <FontAwesomeIcon icon={faStar} size="xs" />
            <FontAwesomeIcon icon={faStar} size="xs" />
            <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
          </div>
          <div className="price">
            <a href={generateDeeplink({
                  origin: item.origin,
                  destination: item.destination,
                  datefrom: item.departureDate,
                  dateTo: item.returnDate,
                  adults: item.adults,
                  children: item.children ? undefined : 0,
                  infant: item.infant ? undefined : 0,
                  cabin: item.cabinClass ? undefined : "economy",
                  flightType: item.flightType ? undefined : "",
                })} tabIndex="0">
                <h6>{item.cityName1}</h6>
              </a>                  
            <h5>
            <a href={generateDeeplink({
                  origin: item.origin,
                  destination: item.destination,
                  datefrom: item.departureDate,
                  dateTo: item.returnDate,
                  adults: item.adults,
                  children: item.children ? undefined : 0,
                  infant: item.infant ? undefined : 0,
                  cabin: item.cabinClass ? undefined : "economy",
                  flightType: item.flightType ? undefined : "",
                })} tabIndex="0">
                  <span>from</span> £{item.price1}
              </a>                  
            
            </h5>
          </div>
          <div className="price">
            <a href={generateDeeplink({
                  origin: item.origin2,
                  destination: item.destination2,
                  datefrom: item.departureDate2,
                  dateTo: item.returnDate2,
                  adults: item.adults2,
                  children: item.children2 ? undefined : 0,
                  infant: item.infant2 ? undefined : 0,
                  cabin: item.cabinClass2 ? undefined : "economy",
                  flightType: item.flightType2 ? undefined : "",
                })} tabIndex="0">
                <h6>{item.cityName2}</h6>
            </a>
            <h5>
            <a href={generateDeeplink({
                  origin: item.origin2,
                  destination: item.destination2,
                  datefrom: item.departureDate2,
                  dateTo: item.returnDate2,
                  adults: item.adults2,
                  children: item.children2 ? undefined : 0,
                  infant: item.infant2 ? undefined : 0,
                  cabin: item.cabinClass2 ? undefined : "economy",
                  flightType: item.flightType2 ? undefined : "",
                })} tabIndex="0">
              <span>from</span> £{item.price2}
            </a>
              
            </h5>
          </div>
          <div className="price mb-0">
            <a href={generateDeeplink({
                  origin: item.origin3,
                  destination: item.destination3,
                  datefrom: item.departureDate3,
                  dateTo: item.returnDate3,
                  adults: item.adults3,
                  children: item.children3 ? undefined : 0,
                  infant: item.infant3 ? undefined : 0,
                  cabin: item.cabinClass3 ? undefined : "economy",
                  flightType: item.flightType3 ? undefined : "",
               })} tabIndex="0">
               <h6>{item.cityName3}</h6>
             </a>                  
            <h5>
            <a href={generateDeeplink({
                  origin: item.origin3,
                  destination: item.destination3,
                  datefrom: item.departureDate3,
                  dateTo: item.returnDate3,
                  adults: item.adults3,
                  children: item.children3 ? undefined : 0,
                  infant: item.infant3 ? undefined : 0,
                  cabin: item.cabinClass3 ? undefined : "economy",
                  flightType: item.flightType3 ? undefined : "",
               })} tabIndex="0">
               <span>from</span> £{item.price3}
             </a>                  
             
            </h5>
          </div>
        </div>
      </div>
      </div>
      
    ))
  ) : (
    <p>No data available</p>
  )
}
            {/* dynamic data2 end here */}


 {/* Old Manual Divs Start here */}

              {/* <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/bangkok.jpg)",
                      }}
                    >
                      <Image
                        src={image8}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="cheap-flights-asia" tabindex="0">
                        <h3>Asia</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />                       
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="cheap-flights-asia" tabindex="0">
                        <h6>Manila</h6>
                      </a>
                      <h5>
                        <span>from</span>£365
                      </h5>
                    </div>
                    <div className="price">
                      <a href="cheap-flights-asia" tabindex="0">
                        <h6>Tokyo</h6>
                      </a>
                      <h5>
                        <span>from</span>£453
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="cheap-flights-asia" tabindex="0">
                        <h6>Bangkok</h6>
                      </a>
                      <h5>
                        <span>from</span>£3495
                      </h5>
                    </div>
                  </div>
                </div>
              </div> */}
             
              {/* <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href=""
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/south-america.jpg)",
                      }}
                    >
                      <Image
                        src={image8}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="cheap-flights-south-america" tabindex="0">
                        <h3>Soth America</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />                       
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="cheap-flights-south-america" tabindex="0">
                        <h6>Lima</h6>
                      </a>
                      <h5>
                        <span>from</span>£565
                      </h5>
                    </div>
                    <div className="price">
                      <a href="cheap-flights-south-america" tabindex="0">
                        <h6>Mexico City</h6>
                      </a>
                      <h5>
                        <span>from</span>£673
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="cheap-flights-south-america" tabindex="0">
                        <h6>Bagota</h6>
                      </a>
                      <h5>
                        <span>from</span>£595
                      </h5>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/america.jpg)",
                      }}
                    >
                      <Image
                        src={image8}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="cheap-flights-america" tabindex="0">
                        <h3>America</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />                        
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="cheap-flights-america" tabindex="0">
                        <h6>New York City</h6>
                      </a>
                      <h5>
                        <span>from</span>£365
                      </h5>
                    </div>
                    <div className="price">
                      <a href="cheap-flights-america" tabindex="0">
                        <h6>Boston</h6>
                      </a>
                      <h5>
                        <span>from</span>£325
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="cheap-flights-america" tabindex="0">
                        <h6>Orlando</h6>
                      </a>
                      <h5>
                        <span>from</span>£370
                      </h5>
                    </div>
                  </div>
                </div>
              </div> */}


              {/* <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/europe.jpg)",
                      }}
                    >
                      <Image
                        src={image8}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="cheap-flights-europe" tabindex="0">
                        <h3>Europe</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />                      
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="cheap-flights-europe" tabindex="0">
                        <h6>Sweden</h6>
                      </a>
                      <h5>
                        <span>from</span>£45
                      </h5>
                    </div>
                    <div className="price">
                      <a href="cheap-flights-europe" tabindex="0">
                        <h6>Romania</h6>
                      </a>
                      <h5>
                        <span>from</span>£49
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="cheap-flights-europe" tabindex="0">
                        <h6>France</h6>
                      </a>
                      <h5>
                        <span>from</span>£51
                      </h5>
                    </div>
                  </div>
                </div>
              </div> */}


              {/* <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/south-asia.jpg)",
                      }}
                    >
                      <Image
                        src={image9}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="cheap-flights-south-asia" tabindex="0">
                        <h3>South Asia</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />                    
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="cheap-flights-south-asia" tabindex="0">
                        <h6>Bombay</h6>
                      </a>
                      <h5>
                        <span>from</span>£375
                      </h5>
                    </div>
                    <div className="price">
                      <a href="cheap-flights-south-asia" tabindex="0">
                        <h6>Delhi</h6>
                      </a>
                      <h5>
                        <span>from</span>£380
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="cheap-flights-south-asia" tabindex="0">
                        <h6>Islamabad</h6>
                      </a>
                      <h5>
                        <span>from</span>£495
                      </h5>
                    </div>
                  </div>
                </div>
              </div> */}


              {/* <div>
                <div className="price-box ">
                  <div className="price-img">
                    <Link
                      href="#"
                      className="img"
                      style={{
                        backgroundImage: "url(/images/destination/africa.jpg)",
                        
                      }}
                    >
                      <Image
                        src={image10}
                        alt=""
                        className="img-fluid blur-up lazyload bg-img d-none"
                      />
                    </Link>
                    <span className="label">new</span>
                  </div>
                  <div className="price-content ">
                    <div className="price-title">
                      <a href="cheap-flights-africa" tabindex="0">
                        <h3>Africa</h3>
                      </a>
                      <div className="like-cls">
                        <FontAwesomeIcon icon={faHeart} />                       
                      </div>
                    </div>
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStar} size="xs" />
                      <FontAwesomeIcon icon={faStarHalfStroke} size="xs" />
                    </div>
                    <div className="price">
                      <a href="cheap-flights-africa" tabindex="0">
                        <h6>Lagos</h6>
                      </a>
                      <h5>
                        <span>from</span>£445
                      </h5>
                    </div>
                    <div className="price">
                      <a href="cheap-flights-africa" tabindex="0">
                        <h6>Nairobi</h6>
                      </a>
                      <h5>
                        <span>from</span>£410
                      </h5>
                    </div>
                    <div className="price mb-0">
                      <a href="cheap-flights-africa" tabindex="0">
                        <h6>Cape Town</h6>
                      </a>
                      <h5>
                        <span>from</span>£410
                      </h5>
                    </div>
                  </div>
                </div>
              </div> */}
  
 {/* Old Manual Divs End here */}


              
            </Slider>
          </div>
        </Container>
      </div>
    </>
  );
};

export default CheapTicketsHome;
