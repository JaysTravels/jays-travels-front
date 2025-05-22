import Image from "next/image";
import { Button, Col, Row } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { submitairSellRequest, setAirSell } from "@/store/AirSellSlice";
import { setSelectedFlights } from "@/store/AvailabilitySlice";
import {getPaymentPage} from "@/store/PaymentSlice";
import { useResolvedPath } from "react-router-dom";
//const ImgUrl = "https://mainimageservice.azureedge.net/00-tup-web/images/airline/bigimages/";


function formatDateTime(dateString) {
  if (dateString != null) {
    const [date, time] = dateString.split('T');
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = time.slice(0, 5);
    return `${formattedDate} ${formattedTime}`;
  }
}
const formatDateToCustomFormat = (dateString) => {
  if (dateString != null) {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .toUpperCase()
      .replace(",", "");
  }
};
function formatDate(dateString) {
  if (dateString != null) {
    const [date, time] = dateString.split('T');
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = time.slice(0, 5);
    return `${formattedDate}`;
  }
}

function formatTime(dateString) {
  if (dateString != null) {
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
  const marketingCarriers = useSelector((state) => state?.flights?.marketingCarriers);
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
   debugger;
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
                        <Col md={9} sm={6}>
                          <p className="mb-0 origion-destination-heading">
                            {item?.itineraries[0]?.airport_city != null ? item?.itineraries[0]?.airport_city : flightRequest.origin}
                            <i className="fas fa-arrow-right fa-1x textC3" style={{ padding: '0 5px' }}></i>
                            {" "}
                            {item?.itineraries[1]?.airport_city != null ? item?.itineraries[1]?.airport_city : flightRequest.destination}
                            {/* <span style={{ color: "transparent" }}> {item?.markupId != null ? "  markup applied with ID " + item?.markupId + " , Amount AdtMarkup" + item?.price?.adulMarkup : "  markup not applied"}</span> */}
                            <span style={{ color: "transparent" }}>{item?.fareTypeCode != null ? "  " + item?.fareTypeCode : ""}</span>
                          </p>
                        </Col>
                        <Col md={3} sm={6}>
                          <p className="mb-0 title-3 origion-destination-heading">{flightRequest.oneWay === true ? "One Way Flight" : "Return Flight"}</p>
                        </Col>
                      </Row>
                    </div>
                    <Row className="align-items-center">
                      <Col md={9}>
                        <div className="results border-end">
                          <div className="outbound border-bottom pb15">
                            <div className="title-3">
                              <p className="outbound-indound-heading">
                                <i className="fas fa-plane-departure fs12"></i>{" "}
                                Outbound Flight
                              </p>
                            </div>
                            <div className="peLg30 mb-lg-0 mb15">
                              <Row>
                                <Col md={3}>
                                  <div className="logo-sec">
                                    <span className="flight_confirmation_box_image_name"> airline name {item?.itineraries[0]?.segments[0]?.marketingCarrierName}</span>
                                    <Image src={`/images/airline-logo/${item?.itineraries[0]?.segments[0]?.marketingCarrierCode}.png`} alt={item?.itineraries[0]?.segments[0]?.marketingCarrierName} width={340} height={240}
                                      className="img-fluid" title={item?.itineraries[0]?.segments[0]?.marketingCarrierName} />

                                    <span style={{ color: "transparent" }}>{item?.avlStatus != null ? " Seats available " + item?.avlStatus : ""}</span>
                                  </div>
                                  <div className="flight_confirmation_box_image_name">
                                    <span>{item?.itineraries[0]?.segments[0]?.marketingCarrierName}</span>
                                  </div>
                                </Col>
                                <Col md={9}>
                                  <div className="airport-part">
                                    <div className="airport-name">
                                      <h4 className="outbound-origion-h4" >{item?.itineraries[0]?.segments[0]?.departure?.iataCode}</h4>
<span className="outbound-origion-airport">{item?.itineraries[0]?.segments[0]?.departure?.iataName}</span>
                                      <h6 className="pb10 origion-date">{formatDateToCustomFormat(item?.itineraries[0]?.segments[0]?.departure?.at)}</h6>
                                      <h4 className="origion-date">{formatTime(item?.itineraries[0]?.segments[0]?.departure?.at)}</h4>
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
                                      <h4 className="outbound-destination-h4">{item?.itineraries[0]?.segments[item?.itineraries[0]?.segments?.length - 1]?.arrival?.iataCode}</h4>
<span className="outbound-destination-airport">{item?.itineraries[0]?.segments[item?.itineraries[0]?.segments?.length -1]?.arrival?.iataName}</span>
                                      <h6 className="pb5 destination-date">{formatDateToCustomFormat(item?.itineraries[0]?.segments[item?.itineraries[0]?.segments?.length - 1]?.arrival?.at)}</h6>
                                      <h4 className="destination-date">{formatTime(item?.itineraries[0]?.segments[item?.itineraries[0]?.segments?.length - 1]?.arrival?.at)}</h4>
                                    </div>
                                    
                                                  </div>
                                </Col>
                                <Col md={3}></Col>
                              </Row>

                            </div>
                          </div>
                          {flightRequest.oneWay === false && (
                             <div className="inbound">
                             <div className="title-3">
                               <p className="outbound-indound-heading">
                                 <i className="fas fa-plane-arrival fs12"></i> Inbound Flight
                               </p>
                             </div>
                             <div className="peLg30 mb-lg-0 mb15">
                               <Row>
                                 <Col md={3}>
                                   <div className="logo-sec">
                                     <span className="flight_confirmation_box_image_name"> airline name {item?.itineraries[1]?.segments[0]?.marketingCarrierName}</span>
                                     <Image src={`/images/airline-logo/${item?.itineraries[1]?.segments[0]?.marketingCarrierCode}.png`} alt={item?.itineraries[1]?.segments[0]?.marketingCarrierName}
                                       width={340} height={240} className="img-fluid" title={item?.itineraries[1]?.segments[0]?.marketingCarrierName} />
                                     <span className="avl-seats">{item?.avlStatus != null ? " Seats available " + item?.avlStatus : ""}</span>
                                     <span className="baggage" >
                                       baggage Free Allownce {item?.baggageDetails?.freeAllowance} {"  "}
                                       quantity code {item?.baggageDetails?.quantityCode}
                                     </span>
                                   </div>
                                   <div className="flight_confirmation_box_image_name">
                                     <span>{item?.itineraries[1]?.segments[0]?.marketingCarrierName}</span>
                                   </div>
                                 </Col>
                                 <Col md={9}>
                                   <div className="airport-part">
                                     <div className="airport-name">
                                       <h4 className="inbound-origion-h4">{item?.itineraries[1]?.segments[0]?.departure?.iataCode}</h4>
                                       <span className="inbound-origion-airport">{item?.itineraries[1]?.segments[0]?.departure?.iataName}</span>
 
                                       <h6 className="pb10 origion-date">{formatDateToCustomFormat(item?.itineraries[1]?.segments[0].departure.at)}</h6>
                                       <h4 className=" origion-date">{formatTime(item?.itineraries[1]?.segments[0].departure.at)}</h4>
                                       <span className="baggage" >
                                         baggage Free Allownce {item?.baggageDetails?.freeAllowance} {"  "}
                                         quantity code {item?.baggageDetails?.quantityCode}
                                       </span>
                                       <span className="avl-seats" >{item?.avlStatus != null ? " Seats available " + item?.avlStatus : ""}</span>
                                     </div>
                                     <div className="airport-progress">
                                       <i className="fas fa-plane-departure float-start"></i>
                                       <i className="fas fa-plane-arrival float-end"></i>
                                       <div className="stop">
                                         {(item?.itineraries[1]?.segments[0]?.numberOfStops === 0
                                           ? "Direct"
                                           : item?.itineraries[1]?.segments[0]?.numberOfStops === 1
                                             ? item?.itineraries[1]?.segments[0]?.numberOfStops + " stop"
                                             : item?.itineraries[1]?.segments[0]?.numberOfStops + " stops")
                                         }
 
                                       </div>
                                     </div>
                                     <div className="airport-name arrival">
                                       <h4 className="inbound-destination-h4">{item?.itineraries[1]?.segments[item?.itineraries[1]?.segments.length - 1]?.arrival?.iataCode}</h4>
 <span className="inbound-destination-airport">{item?.itineraries[1]?.segments[item?.itineraries[1]?.segments.length-1]?.arrival?.iataName}</span>
                                       <h6 className="pb5 destination-date">{formatDateToCustomFormat(item?.itineraries[1]?.segments[item?.itineraries[1]?.segments.length - 1]?.arrival?.at)}</h6>
                                       <h4 className="destination-date">{formatTime(item?.itineraries[1]?.segments[item?.itineraries[1]?.segments.length - 1]?.arrival?.at)}</h4>
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
                          )}
                         
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="price mb10" style={{ marginTop: '80px' }}>
                          <div>
                            <h6>Total Price</h6>
                           
                            <h2>{item.price.currency === "GBP" ? "£" : "$"} {item.price.total}</h2>
                            {/* <span>{"non refundable"}</span> */}
                          </div>
                        </div>
                        <div className="book-flight">
                          <Button onClick={() => handleClick(item.id)} style={{ marginRight: '15px' }} className="btn btn-curve btn-primary flight-select-now-btn" color="c3" disabled={loadingId === item.id}>
                            {loadingId === item.id ? "Please wait" : "Select Now"}
                          </Button>

                        </div>
                      </Col>
                    </Row>
                  </div>
                );


              })) : "no flights found"

          }
        </div>
      </div>
    );
  }
  else {
    return (<div>No results found</div>)
  }

};

export default FlightResultsSr;
