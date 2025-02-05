import Image from "next/image";
import { Button, Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import { submitairSellRequest,setAirSell } from "@/store/AirSellSlice";
import { setSelectedFlights } from "@/store/AvailabilitySlice";
import {getPaymentPage} from "@/store/PaymentSlice";
//const ImgUrl = "https://mainimageservice.azureedge.net/00-tup-web/images/airline/bigimages/";


function formatDateTime(dateString) {
  if(dateString != null){
    const [date, time] = dateString.split('T'); 
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = time.slice(0, 5);   
    return `${formattedDate} ${formattedTime}`;
  }
}

  function formatDate(dateString) {
    if(dateString != null){
      const [date, time] = dateString.split('T'); 
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      const formattedTime = time.slice(0, 5);   
      return `${formattedDate}`;
    }}

    function formatTime(dateString) {
      if(dateString != null){
        const [date, time] = dateString.split('T'); 
        const [year, month, day] = date.split('-');
        const formattedDate = `${day}-${month}-${year}`;
        const formattedTime = time.slice(0, 5);   
        return `${formattedTime}`;
      }
}

const FlightResultsSr = () => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const flightResults = useSelector((state) => state?.flights?.response);
  const flightRequest = useSelector((state) => state?.flights?.flights);
  const flightError = useSelector((state) => state?.flights?.error);
  const filteredFlights  = useSelector((state) => state?.flights?.filteredFlights);
  const [loadingId, setLoadingId] = useState(null); 

  function convertToDateFormat(dateString) {
    if(dateString != null){
      const date = new Date(dateString); 
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);     
      return `${day}${month}${year}`;
    }
    
  }
  function getAirSellRequest(flight){
    
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

  const travelProductInformationInBound = flight.itineraries[1].segments.map((segment, index) => ({
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

    const flightData = {
      flightId : flight.id,
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
      
     dispatch(getPaymentPage(paymentRequest)).unwrap().then(()=>{
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
    
    dispatch(submitairSellRequest(AirSellRequset)).unwrap().then(()=>{
     router.push("/flight-confirmation");
   
    })
    
   } catch (error) {
     console.error('Error api call data:', error.message);
     alert(error);
   }
  }
  if(flightResults != null){
    //const logoPath = "@/public/images//airline-logo/";
    return (
      <div className="flight-detail-sec">
      <div className="title-bar">
       
      </div>
      <div className="detail-bar">
        {
           filteredFlights?.length > 0 ? (
            filteredFlights.map((item, index) => {   
          return (
            
            <div className="detail-wrap border rounded-3 wow fadeInUp" key={item.id}>
              <div className="border-bottom  p-3">
                <Row className="align-items-center">
                  <Col md={9}>
                    <h5 className="mb-0">
                   {item?.itineraries[0]?.airport_city != null ? item?.itineraries[0]?.airport_city : flightRequest.origin }
                  <i className="fas fa-arrow-right fa-1x textC3" style={{padding:'0 5px'}}></i>
                  {" "}
                  {item?.itineraries[1]?.airport_city != null ? item?.itineraries[1]?.airport_city :flightRequest.destination}
<span style={{ color: "transparent" }}> {item?.markupId != null ? "  markup applied with ID " + item?.markupId + " , Amount AdtMarkup" + item?.price?.adulMarkup : "  markup not applied"}</span> 
    </h5>
                  </Col>
                  <Col md={3}>
                  {/* <h5 className="mb-0">Return Flight</h5> */}
                  </Col>
                </Row>
              </div>
              <Row className="align-items-center">
                <Col md={9}>
                  <div className="results border-end">
                    <div className="outbound border-bottom pb15">
                      <div className="title-3">
                        <h5>
                          <i className="fas fa-plane-departure fs16"></i>{" "}
                          Outbound
                        </h5>
                      </div>
                      <div className="peLg30 mb-lg-0 mb15">
                        <Row>
                          <Col md={3}>
                          <div className="logo-sec">   
                          <Image src={`/images/airline-logo/${item?.itineraries[0]?.segments[0]?.marketingCarrierCode}.png`} alt={item?.itineraries[0]?.segments[0]?.marketingCarrierName} width={340} height={240} className="img-fluid"/>  
                          <span hidden={true} className="title">{item?.itineraries[0]?.segments[0]?.marketingCarrierName}</span>
                        </div>
                          </Col>
                          <Col md={9}>
                          <div className="airport-part">
                            <div className="airport-name">
                              <h4>{formatTime(item?.itineraries[0]?.segments[0]?.departure?.at)}</h4>
                             <h6 className="pb5">{formatDate(item?.itineraries[0]?.segments[0]?.departure?.at)}</h6>
                              <h4 >{item?.itineraries[0]?.segments[0]?.departure?.iataCode  }</h4>
                            </div>
                            <div className="airport-progress">
                              <i className="fas fa-plane-departure float-start"></i>
                              <i className="fas fa-plane-arrival float-end"></i>
                              <div className="stop">
                             
                                {                            
                             (item?.itineraries[0]?.segments[0]?.numberOfStops === 0
                             ? "Direct"
                             : item?.itineraries[0]?.segments[0]?.numberOfStops === 1
                             ? item?.itineraries[0]?.segments[0]?.numberOfStops + " stop"
                             : item?.itineraries[0]?.segments[0]?.numberOfStops + " stops")
                              }</div>
                            </div>
                            <div className="airport-name arrival">
                              <h4>{formatTime(item?.itineraries[0]?.segments[item?.itineraries[1]?.segments?.length -1]?.arrival?.at)}</h4>
                              <h6 className="pb5">{formatDate(item?.itineraries[0]?.segments[item?.itineraries[1]?.segments?.length -1]?.arrival?.at)}</h6>
                              <h4>{item?.itineraries[0]?.segments[item?.itineraries[0]?.segments?.length-1]?.arrival?.iataCode}</h4>
                            </div>
                          </div>
                          </Col>
                          <Col md={3}></Col>
                        </Row>                       
             
                      </div>
                    </div>
                    <div className="inbound">
                      <div className="title-3">
                        <h5>
                          Inbound <i className="fas fa-plane-arrival fs16"></i>
                        </h5>
                      </div>
                      <div className="peLg30">
                        <Row>
                          <Col md={3}>
                          <div className="logo-sec">
                                {/* <Image src={img4} className="img-fluid" alt="" /> */}
                                <Image src={`/images/airline-logo/${item?.itineraries[1]?.segments[0]?.marketingCarrierCode}.png`} alt={item?.itineraries[1]?.segments[0]?.marketingCarrierName} width={340} height={240} className="img-fluid" />  
                                <span hidden={true} className="title">{item?.itineraries[1]?.segments[0]?.marketingCarrierName}</span>
                          </div>
                          </Col>
                          <Col md={9}>
                              <div className="airport-part">
                                <div className="airport-name">
                                <h4>{formatTime(item?.itineraries[1]?.segments[0].departure.at)}</h4>
                               <h6 className="pb5">{formatDate(item?.itineraries[1]?.segments[0].departure.at)}</h6> 
                                <h4>{item?.itineraries[1]?.segments[0]?.departure?.iataCode}</h4>
                                </div>
                                <div className="airport-progress">
                                  <i className="fas fa-plane-departure float-start"></i>
                                  <i className="fas fa-plane-arrival float-end"></i>
                                  <div className="stop">
                                    {/*item?.itineraries[1]?.segments[0]?.numberOfStops*/}
                                   { (item?.itineraries[1]?.segments[0]?.numberOfStops === 0
                             ? "Direct"
                             : item?.itineraries[1]?.segments[0]?.numberOfStops === 1
                             ? item?.itineraries[1]?.segments[0]?.numberOfStops + " stop"
                             : item?.itineraries[1]?.segments[0]?.numberOfStops + " stops")
                              }
                                    
                                    </div>
                                </div>
                                <div className="airport-name arrival">
                                <h4>{formatTime(item?.itineraries[1]?.segments[item?.itineraries[1]?.segments.length -1]?.arrival?.at)}</h4>
                                <h6 className="pb5">{formatDate(item?.itineraries[1]?.segments[item?.itineraries[1]?.segments.length -1]?.arrival?.at)}</h6>
                                <h4>{item?.itineraries[1]?.segments[item?.itineraries[1]?.segments.length -1]?.arrival?.iataCode}</h4>
                                </div>
                              </div>
                            </Col>
                            <Col md={3}></Col>  
                        </Row>
                        {
                        /**
                         * */}
                       
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                    <div className="price mb10">
                      <div>
                        <h6>Total Price</h6>
                        <h2>{item.price.currency === "GBP" ? "£" : "$"} {item.price.total}</h2>
                        {/* <span>{"non refundable"}</span> */}
                      </div>
                    </div>
                    <div className="book-flight">
                      <Button onClick={() => handleClick(item.id)} color="c3"  disabled={loadingId === item.id}>
                        {loadingId === item.id ? "Please wait" : "Book Now"}
                      </Button>
                      
                    </div>
                  </Col>
                </Row>
              </div>
            );
        
         
        })) :"no flights found"
        
        }
      </div>
    </div>
  );
  }
  else{
    return(<div>No results found</div>)
  }

};

export default FlightResultsSr;
