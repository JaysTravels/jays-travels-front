import Image from "next/image";
import { Button, Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { submitairSellRequest, setAirSell } from "@/store/AirSellSlice";
import { selectedHotel} from "@/store/hotels/HotelAvailabilitySlice";
import {getPaymentPage} from "@/store/PaymentSlice";
import { useResolvedPath } from "react-router-dom";

const HotelResultsSr = () => {
 const router = useRouter();
  const dispatch = useDispatch();
  const hotelResults = useSelector((state) => state?.hotels?.response);
  const hotelRequest = useSelector((state) => state?.hotels?.hotels);
  const hotelError = useSelector((state) => state?.hotels?.error);
  const filteredHotels  = useSelector((state) => state?.hotels?.filteredHotels);
  //const marketingCarriers = useSelector((state) => state?.flights?.marketingCarriers);
  const [loadingId, setLoadingId] = useState(null); 
  const appurl = process.env.NEXT_PUBLIC_APP_URL;
  function convertToDateFormat(dateString) {
    if (dateString != null) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}${month}${year}`;
    }

  }
  function getAirSellRequest(flight){
   //debugger;
    let totPassenger = flightRequest.adults + flightRequest.children;
    const travelProductInformationOutBound = flight.itineraries[0].segments.map((segment, index) => ({
      departureDate: convertToDateFormat(segment.departure.at),
      fromAirport: segment.departure.iataCode,
      toAirport: segment.arrival.iataCode,
      marketingCompany: segment.marketingCarrierCode,
      flightNumber: segment.number,
      bookingClass: segment.bookingClass,
      relatedproductInformation: {
        quantity: totPassenger,
        statusCode: "NN",
      },
    }));
     let travelProductInformationInBound;
     let flightData;
    if(flightRequest.oneWay === false){

       travelProductInformationInBound = flight?.itineraries[1].segments.map((segment, index) => ({
        departureDate: convertToDateFormat(segment.departure.at),
        fromAirport: segment.departure.iataCode,
        toAirport: segment.arrival.iataCode,
        marketingCompany: segment.marketingCarrierCode,
        flightNumber: segment.number,
        bookingClass: segment.bookingClass,
        relatedproductInformation: {
          quantity: totPassenger,
          statusCode: "NN",
        },
      }));

      flightData = {
        flightId: flight.id,
        messageFunction: "183",
        additionalMessageFunction: "M1",
        Outbound: {
          origin: flightRequest.origin,
          destination: flightRequest.destination,
          segmentInformation: {
            travelProductInformation: travelProductInformationOutBound,
          },
        },
        inBound: {
          origin: flightRequest.destination,
          destination: flightRequest.origin,
          segmentInformation: {
            travelProductInformation: travelProductInformationInBound,
          },
        },
      };


    }
    else{

      flightData = {
        flightId: flight.id,
        messageFunction: "183",
        additionalMessageFunction: "M1",
        Outbound: {
          origin: flightRequest.origin,
          destination: flightRequest.destination,
          segmentInformation: {
            travelProductInformation: travelProductInformationOutBound,
          },
        },        
      };
    }
   
    return flightData;
  }

  const handleClick = (itemid) => {

    setLoadingId(itemid)
    const flight = flightResults.data.find(flight => flight.id === itemid.toString());
    try {
      dispatch(setSelectedFlights(flight));
    } catch (error) {
      console.error('Error calling setselectedFight:', error.message);
    }
    // New work for Set payment data
    const paymentRequest = {
      OrderId: flight.id + '' + flight.fareBasis,
      Amount: flight.price.total, // Amount in pounds
      Currency: flight.price.currency,
      Language: 'en_US'
    }

    try {

      dispatch(getPaymentPage(paymentRequest)).unwrap().then(() => {
        // debugger;
        console.log('Get payment successfully.');
      })

    } catch (err) {
      console.error('An error occurred:', err);
    } finally {
    }

    // console.log(flightData);
    const AirSellRequset = getAirSellRequest(flight);
    //console.log(AirSellRequset);

    try {

      dispatch(setAirSell(AirSellRequset));

    } catch (error) {
      console.error('Error calling setAirSell:', error.message);

    }
    try {

      dispatch(submitairSellRequest(AirSellRequset)).unwrap().then(() => {
        
       // router.push("/flight-confirmation");
        router.push(`${appurl}/flight-confirmation`);

      })

    } catch (error) {
      console.error('Error api call data:', error.message);
      alert(error);
    }
  }
const getRandomReviews = (base = 26412, variation = 200) => {
  const randomOffset = Math.floor(Math.random() * variation);
  return base + randomOffset;
};
 const getRandomBookingsToday = (min = 3, max = 20) => {
  debugger;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
  const renderStarRating = (categoryName) => {
  const match = categoryName?.match(/\d+/);
  const rating = match ? parseInt(match[0]) : 0;


  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star" />);
    } else {
      stars.push(<i key={i} className="far fa-star" />);
    }
  }

  return (
    <div className="rating">
      {stars}
      <span>{getRandomReviews} reviews</span>
    </div>
  );
};

  if(hotelResults != null){ 
return (
   <>
  <section className="pt-0 xs-section bg-inner">
  <div className="container">
    {
       filteredHotels?.length > 0 ? (
              filteredHotels.map((item, index) => {
                return ( 
<div className="row">
      <div className="col-lg-12 ratio3_2">
        <div className="container">
          <div className="list-view row content grid">
            <div className="list-box col-12 popular grid-item wow fadeInUp">
              <div className="list-img">
                 <a href="hotel-single-7.html">
                <img src={`https://photos.hotelbeds.com/giata/${item.details.images[0].path}`} className="img-fluid lazyload bg-img" alt />
                </a>
              </div>
              <div className="list-content">
                <div>
                  <a href="hotel-single-7.html">
                    <h5>                     
                       {item?.name}
                      </h5>
                  </a>
                  <p>{item?.details.address.content}</p>
                  <div className="rating">
                    {/* <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="far fa-star" /> */}
                    {renderStarRating(item?.categoryname)}                    
                  </div>
                  <div className="facility-icon">
                    <div className="facility-box">
                    <img src="../images/packages/holidays-main/dubai/atlantis-the-palm.jpg" className="img-fluid lazyload bg-img" alt />
                      <span>bar</span>
                    </div>
                    <div className="facility-box">
                      <img src="../assets/images/icon/hotel/wifi.png" className="img-fluid blur-up lazyload" alt />
                      <span>wifi</span>
                    </div>
                    <div className="facility-box">
                      <img src="../assets/images/icon/hotel/sunset.png" className="img-fluid blur-up lazyload" alt />
                      <span>beach</span>
                    </div>
                    <div className="facility-box">
                      <img src="../assets/images/icon/hotel/pool.png" className="img-fluid blur-up lazyload" alt />
                      <span>swimming</span>
                    </div>
                  </div>
                  <div className="price">
                    <del>${Number(item.rooms[0].rates[0].net) + 20}</del>
                    ${item.rooms[0].rates[0].net} <span>/ per night</span>
                    <p className="mb-0" hidden={true}>login &amp; unlock a secret deal</p>
                  </div>
                  <div className="offer-box">
                    <i className="fas fa-fire" /> {getRandomBookingsToday()} people booked this hotel today
                  </div>
                  <a href="hotel-booking.html" className="btn btn-solid color1 book-now">book now</a>
                </div>
              </div>
            </div>
            {/* commented code start here */}
            
            {/* commented code end here */}
          </div>
          {/* <nav aria-label="Page navigation example" className="pagination-section">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="javascript:void(0)" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item active"><a className="page-link" href="javascript:void(0)">1</a></li>
              <li className="page-item"><a className="page-link" href="javascript:void(0)">2</a></li>
              <li className="page-item"><a className="page-link" href="javascript:void(0)">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </div>

                 );

              })) : "no flights found"
    }
    
  </div>
</section>

    </>
    );
  }  else {
    return (<div>No Hotels found</div>)
  }
    
  }
export default HotelResultsSr;
