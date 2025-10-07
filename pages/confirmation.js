import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import topLogo from "@/public/images/top-logo.png";
import bookingSuccess from "@/public/images/booking-success.jpg";
import Link from "next/link";
import Meta from "@/components/common/Meta";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UPDATE_PAYMENT_STATUS } from "@/store/CreatePnrSlice";
import { Col, Row } from "reactstrap";
import {
  setPassengerDetails,
  setPnrMulti,
  PNR_Multi,
  Create_Fop,
  Fare_Price_Pnr,
  Create_Tst,
  Commit_Pnr,
} from "@/store/CreatePnrSlice";
import { getPaymentPage } from "@/store/PaymentSlice";
const Confirmation = () => {
  
  const currSign = '£';
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pnrResponse = useSelector((state) => state.generatePnr.CommitPnrResponse);
  const Commit_Pnr_Error = useSelector((state) => state.generatePnr.CommitPnrError);
 // const BookingRefNo = useSelector((state) => state.payments?.payment_response?.bookingRefNo);
  const [selectedFlight, setselectedFlight] = useState(null);
  const [PassengerDetails, setPassengerDetails] = useState(null); 
  const [PNR_Number, setPNR_Number] = useState(null);
  const [BookingRefNo, setBookingRefNo] = useState(null);
  const [flightResults, setflightResults] = useState(null);
  const [flightRequest, setflightRequest] = useState(null);
  const [airsellRequest, setairsellRequest] = useState(null);
  const [airsellResults, setairsellResults] = useState(null);
  const [payment, setPaymentUpdate] = useState(false);
  const PNR_Multi_Error = useSelector((state) => state.generatePnr.PNR_Multi_Error);
  const Create_Fop_Error = useSelector((state) => state.generatePnr.Create_Fop_Error);
  const Fare_Price_Pnr_Error = useSelector((state) => state.generatePnr.Fare_Price_Pnr_Error);
  const Create_Tst_Error = useSelector((state) => state.generatePnr.Create_Tst_Error);   
  const paymentPageError = useSelector((state) => state.payments?.payment_Error);
  const paymentPageData = useSelector((state) => state.payments?.payment_response); 
  const [ApiResponse, setApiResponse] = useState("");
  const authorizationCode = searchParams.get('AUTHORIZATION');
  const orderID = searchParams.get('orderID');
  const currency = searchParams.get('currency');
  const amount = searchParams.get('amount');
  const PM = searchParams.get('PM');
  const ACCEPTANCE = searchParams.get('ACCEPTANCE');
  const STATUS = searchParams.get('STATUS');
  const CARDNO = searchParams.get('CARDNO');
  const ED = searchParams.get('ED');
  const CN = searchParams.get('CN');
  const TRXDATE = searchParams.get('TRXDATE');
  const PAYID = searchParams.get('PAYID');
  const NCERROR = searchParams.get('NCERROR');
  const BRAND = searchParams.get('BRAND');
  const IPCTY = searchParams.get('IPCTY');
  const IP = searchParams.get('IP');
  useEffect(() => {
   // debugger;
    const hasQueryParams = router.asPath.includes("?"); 
   const isSearchParamsEmpty = !searchParams || searchParams.toString() === "";  

   if (hasQueryParams && isSearchParamsEmpty) {
     console.log("Query params expected but not available yet. Returning...");
     return;
   }
   let airsellRequest ;
   airsellRequest = JSON.parse(localStorage.getItem("airsellRequest"));      
   setairsellRequest(airsellRequest);
   let airsellResults = JSON.parse(localStorage.getItem("airsellResults"));
   setairsellResults(airsellResults);
   let flightRequest = JSON.parse(localStorage.getItem("flightRequest"))
   setflightRequest(flightRequest);
   let flightResults = JSON.parse(localStorage.getItem("flightResults"));
   setflightResults(flightResults);
   let selectedFlight =JSON.parse(localStorage.getItem("selectedFlight"));
 
   setselectedFlight(selectedFlight);
   let passengerDetails = JSON.parse(localStorage.getItem("passengerDetails"));
   setPassengerDetails(passengerDetails);
   let BookingRefNo = localStorage.getItem("BookingRefNo");
   setBookingRefNo(BookingRefNo);

    const handleApiCalls = async () => {

      let flight;
      flight = JSON.parse(localStorage.getItem("selectedFlight"));
      setselectedFlight(flight);
    if(flight?.fareTypeCode != "ST"){
//debugger;
          let session =  getSession();
        if(session != undefined)
        {
          session.sequenceNumber = session?.sequenceNumber + 1;
        }
        const pnrMultirequest = JSON.parse(localStorage.getItem("pnrMultirequest"));
       try {
     dispatch(setPassengerDetails(pnrMultirequest.passengerDetails));
    } catch (error) {
      console.error("Error calling setPassengerDetails:", error.message);
    }
      const addPnrMultiRequset = {
      sessionDetails: pnrMultirequest.sessionDetails,
      passengerDetails: pnrMultirequest.passengerDetails,
      selectedFlightOffer: JSON.stringify(flight),
    }
    let session2 = getSession();
    session2.sequenceNumber = session2.sequenceNumber + 2;
    const fopRequest = CreateFopRequest(session2);
    const FopRequest = {
      sessionDetails: fopRequest.sessionDetails,
      transactionDetailsCode: fopRequest.transactionDetailsCode,
      fopCode: fopRequest.fopCode,
    };

    let session3 = getSession();
    session3.sequenceNumber = session3.sequenceNumber + 3;
    const carrierCode =
      airsellResults?.data?.airSellResponse[0]?.flightDetails[0]
        ?.marketingCompany;
    const farePriceRequest = CreateFarePricePnrRequest(carrierCode, session3);
    const pricePnrRequest = {
      sessionDetails: farePriceRequest.sessionDetails,
      pricingOptionKey: farePriceRequest.pricingOptionKey,
      carrierCode: carrierCode,
    };
    let session4 = getSession();
    session4.sequenceNumber = session4.sequenceNumber + 4;
    const tstRequest = CreateTstRequest(session4);
    const ticketTstRequest = {
      sessionDetails: tstRequest.sessionDetails,
      adults: tstRequest.adults,
      children: tstRequest.children,
      infants: tstRequest.infants,
    };
    let session5 = getSession();
    session5.sequenceNumber = session5.sequenceNumber + 5;
    const commitPnrRequest = CreateCommitPnrRequest(session5);
    let passenger = addPnrMultiRequset.passengerDetails?.find(
      (p) => p.isLeadPassenger === true
    );
     const pnrCommitRequest = {
      sessionDetails: commitPnrRequest.sessionDetails,
      optionCode1: commitPnrRequest.optionCode1,
      optionCode2: commitPnrRequest.optionCode2,
      TotalAmount: selectedFlight?.price?.total,
      FirstName: passenger.firstName,
      LastName: passenger.surName,
      BookingRef: BookingRefNo,
    };
   try{

        // Dispatch first API call
            //debugger;
            const pnrMulti = await dispatch(PNR_Multi(addPnrMultiRequset));
            //debugger;
            console.log('PNR_Multi dispatched successfully.');
            if (pnrMulti?.payload?.isSuccessful === false) {
              setApiResponse(pnrMulti?.data?.error);
              return;
            }
            // Dispatch second API call
            await dispatch(Create_Fop(FopRequest));
            console.log("Create_Fop dispatched successfully.");
            if (Create_Fop_Error != null) {
              setApiResponse(Create_Fop_Error);
            // return;
            }
            // Dispatch third API call
            await dispatch(Fare_Price_Pnr(pricePnrRequest));
            console.log("Fare_Price_Pnr dispatched successfully.");
            if (Fare_Price_Pnr_Error != null) {
              setApiResponse(Fare_Price_Pnr_Error);
            // return;
            }

            // Dispatch fourth API call
            await dispatch(Create_Tst(ticketTstRequest));
            console.log("Create_Tst dispatched successfully.");
            if (Create_Tst_Error != null) {
              setApiResponse(Create_Tst_Error);
              //return;
            }

            // Dispatch fifth API call
            const result2 = await dispatch(Commit_Pnr(pnrCommitRequest)).unwrap();
            if (result2?.isSuccessful === false) {
              setApiResponse(result2?.data?.error);
            }
            else{
              if (result2?.data != null) {
                localStorage.setItem("PNR_Number",result2?.data?.session?.reservation?.pnr);
                setPNR_Number(result2?.data?.session?.reservation?.pnr);
              }
            }

      } catch (err) { console.error("An error occurred:", err);} finally {}
    
    
       try {
         let passengerDetails = JSON.parse(localStorage.getItem("passengerDetails"));
          let BookingRefNo = localStorage.getItem("BookingRefNo");
          let selectedFlight =JSON.parse(localStorage.getItem("selectedFlight"));
          let selectedFlightoffer = localStorage.getItem("selectedFlight");
           let session =  getSession();
        const UpdatePaymentStatusRequest = {
        SessionId: session.sessionId,
        PaymentStatus: "Success",
        AuthorizationCode : authorizationCode,
        OrderID : orderID,
        PaymentMethod :PM ,
        Acceptance : ACCEPTANCE,
        Status : STATUS ,
        CardNo : CARDNO ,
        ExpiryDate : ED ,
        CardHolderName : CN,
        TrxDate : TRXDATE ,
        PayId : PAYID ,
        NcError : NCERROR ,
        Brand : BRAND  ,
        Currency : currency,
        IpCity : IPCTY,
        IP : IP,       
        }
        setPaymentUpdate(true);
        const result = dispatch(UPDATE_PAYMENT_STATUS(UpdatePaymentStatusRequest)).unwrap();      
        if(result?.isSuccessful === true){
        setPaymentUpdate(true);
        }    
      
      } catch (error) { console.error("Error fetching data:", error);}
    
    }   // for static flights
   else{
//    debugger;
     let passengerDetails = JSON.parse(localStorage.getItem("passengerDetails"));
    const addPnrMultiRequset = {
      sessionDetails: "",
      passengerDetails: passengerDetails,
      selectedFlightOffer: JSON.stringify(flight),
    }
    const pnrMulti = await dispatch(PNR_Multi(addPnrMultiRequset));
            //debugger;
            console.log('PNR_Multi dispatched successfully.');
            if (pnrMulti?.payload?.isSuccessful === false) {
              setApiResponse(pnrMulti?.data?.error);
              return;
            }

  try {
        let passengerDetails = JSON.parse(localStorage.getItem("passengerDetails"));
        let BookingRefNo = localStorage.getItem("BookingRefNo");
        let selectedFlight =localStorage.getItem("selectedFlight");
        let selectedFlightoffer = localStorage.getItem("selectedFlight");
        let flightRequest = localStorage.getItem("flightRequest");
        const UpdatePaymentStatusRequest = {
        SessionId: "ST-"+BookingRefNo,
        PaymentStatus: "Success",
        AuthorizationCode : authorizationCode,
        OrderID : orderID,
        PaymentMethod :PM ,
        Acceptance : ACCEPTANCE,
        Status : STATUS ,
        CardNo : CARDNO ,
        ExpiryDate : ED ,
        CardHolderName : CN,
        TrxDate : TRXDATE ,
        PayId : PAYID ,
        NcError : NCERROR ,
        Brand : BRAND  ,
        Currency : currency,
        IpCity : IPCTY,
        IP : IP,
        SelectedFlightOffer : selectedFlightoffer,
        PassengerInfo :passengerDetails,
        FlightRequest: flightRequest
        }
        setPaymentUpdate(true);
        const result = dispatch(UPDATE_PAYMENT_STATUS(UpdatePaymentStatusRequest)).unwrap();      
        if(result?.isSuccessful === true){
        setPaymentUpdate(true);
        }    
      
      } catch (error) { console.error("Error fetching data:", error);}
   }
     
   
   
      if (typeof window !== "undefined") {
        localStorage.clear();
       
      }
      const newUrl = window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    };

    function CreateFopRequest(session) {
      const foprequest = {
        sessionDetails: session,
        transactionDetailsCode: "FP",
        fopCode: "CASH",
      };
      return foprequest;
    }
  
    function CreateFarePricePnrRequest(_carrierCode, session) {
      const farepricerequest = {
        sessionDetails: session,
        pricingOptionKey: "RP,RU",
        carrierCode: _carrierCode,
      };
      return farepricerequest;
    }
  
    function CreateTstRequest(session) {
      let flightRequest = JSON.parse(localStorage.getItem("flightRequest"));
      const createtstrequest = {
        sessionDetails: session,
        adults: flightRequest.adults,
        children: flightRequest.children,
        infants: flightRequest.infant,
      };
      return createtstrequest;
    }
  
    function CreateCommitPnrRequest(session) {
      const createcommitpnr = {
        sessionDetails: session,
        optionCode1: "10",
        optionCode2: "30",
      };
      return createcommitpnr;
    }

    handleApiCalls();
  }, [dispatch, router.query]); 

  

  function getSession() {
    const storedSession = localStorage.getItem("session");
    if (storedSession) {
      const jsonObject = JSON.parse(storedSession);
      const session = {
        transactionStatusCode: jsonObject.transactionStatusCode,
        sessionId: jsonObject.sessionId,
        sequenceNumber: jsonObject.sequenceNumber,
        securityToken: jsonObject.securityToken,
      };
      return session;
    }
  }
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
    } catch (error) {
      console.log("Error calling formatDate:", error.message);
    }
  };

  function calculateDaysDifference(date1, date2) {
    try {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const timeDifference = d2 - d1;
      const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
      return dayDifference;
    } catch (error) {
      console.log("Error calling calculateDaysDifference:", error.message);
    }
  }

  return (
    <>
      <Meta title="Confirmation" />
      <div className="confirmationPage my80 ">
        <div className="box">
          <Row className="align-items-center">
            <Col lg={6} className="text-lg-start text-center">
              <Link href="https://jaystravels.co.uk/en-gb">
                <Image
                  src={topLogo}
                  alt="..."
                  className="main-logo w140px h-auto"
                />
              </Link>
            </Col>
            <Col lg={6}>
              <div className="d-flex justify-content-lg-end justify-content-center links mt-lg-0 mt16">
                <Link href="https://jaystravels.co.uk/en-gb">Home</Link>
                <Link href="/">Tours</Link>
                <Link href="hotels">Hotels</Link>
                <Link href="contact">Contact</Link>
              </div> 
            </Col>
          </Row>
          <div className="text-center">
            <Image src={bookingSuccess} alt="..." />

            <div className="maxW500px mx-auto">
              <h2>
                {Commit_Pnr_Error == null || selectedFlight?.fareTypeCode == "ST"
                  ? "Booking Successful ! Get Ready For Unforgettable Trip."
                  : "Unable to create booking there is some thing went wrong please contact us at ....."}
              </h2>

              <h3 className="mt5 mb30">
                
              </h3>
              {/* <Link href="#" className="btn">
                view itinerary
              </Link> */}
            </div>
          </div>

          <div className="mt40">
            <table
              className="main-table"
              border="0"
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr>
                  <td width="50%" className="mainTd">
                    <table
                      className="booking-table"
                      border="0"
                      cellPadding="0"
                      cellSpacing="0"
                    >
                      <tbody>
                        <tr>
                          <td colSpan="2" className="bb">
                            <h5>Booking Details</h5>
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">Booking No:</td>
                          <td>
                            <span>{BookingRefNo}</span>{" "}
                            <span hidden={true}>{PNR_Number}</span>{" "}
                            {/*pnrResponse.data?.data?.pnrHeader?.reservation?.pnr*/}
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">Booking Status:</td>
                          <td>
                            <span>
                              {Commit_Pnr_Error == null || selectedFlight?.fareTypeCode == "ST"
                                ? "Confirmed"
                                : "Failed"}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">Group/Person:</td>
                          <td>
                            <span>
                              {flightRequest?.adults} Adults,
                              {flightRequest?.children > 0
                                ? flightRequest?.children + " Children"
                                : ""}
                              {flightRequest?.infant > 0
                                ? flightRequest?.infant + " Infant"
                                : ""}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td width="50%" className="mainTd">
                    <table
                      className="booking-table"
                      border="0"
                      cellPadding="0"
                      cellSpacing="0"
                    >
                      <tbody>
                        <tr>
                          <td colSpan="2" className="bb">
                            <h5>Tour Details</h5>
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">Tour Details:</td>
                          <td>
                            <span>
                              {flightRequest?.oneWay !== true && selectedFlight?.itineraries?.[0]?.airport_city &&
                              selectedFlight?.itineraries?.[1]?.airport_city ? (
                                <>
                                  {selectedFlight.itineraries[0].airport_city}{" "}
                                  To{" "}
                                  {selectedFlight.itineraries[1].airport_city}
                                </>
                              ) : null}

                          {flightRequest?.oneWay === true && selectedFlight?.itineraries?.[0]?.airport_city  ? (
                                <>
                                  {selectedFlight.itineraries[0]?.segments[0]?.departure?.iataCode}{" "}
                                  To{" "}
                                  {selectedFlight.itineraries[0]?.segments[selectedFlight.itineraries[0]?.segments.length -1]?.arrival?.iataCode}
                                </>
                              ) : null}     


                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">Travel Date:</td>
                          <td>
                            <span>
                              {formatDate(flightRequest?.departureDate)} -{" "}
                              {flightRequest?.oneWay !== true && formatDate(flightRequest?.returnDate)}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">{flightRequest?.oneWay === false ? "Total Days:" : ""}</td>
                          <td>
                          {flightRequest?.oneWay === false && (
                             <span>
                             {calculateDaysDifference(
                               flightRequest?.departureDate,
                               flightRequest?.returnDate
                             )}{" "}
                             Days.
                           </span>
                          )}                           
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <table>
            <tbody>
              {PassengerDetails && Array.isArray(PassengerDetails) ? (
                PassengerDetails.map((passenger, index) => (
                  <tr style={{ color: "#616161" }} key={index}>
                    <td>
                      <h6
                        style={{
                          margin: "0",
                          fontSize: "16px",
                          fontWeight: "700",
                          lineHeight: "28px",
                          color: "#3c3c3c",
                        }}
                      >
                        Name:
                        <span style={{ fontWeight: "500" }}>
                          {passenger.firstName} {passenger.lastName}
                        </span>
                      </h6>
                      <h6
                        style={{
                          margin: "0",
                          fontSize: "16px",
                          fontWeight: "700",
                          lineHeight: "28px",
                          color: "#3c3c3c",
                        }}
                      ></h6>
                      <h6
                        style={{
                          margin: "0",
                          fontSize: "16px",
                          fontWeight: "700",
                          lineHeight: "28px",
                          color: "#3c3c3c",
                        }}
                      >
                        Email:
                        <Link href="#" style={{ fontWeight: "500" }}>
                          {passenger.email}
                        </Link>
                      </h6>
                      <h6
                        style={{
                          margin: "0",
                          fontSize: "16px",
                          fontWeight: "700",
                          lineHeight: "28px",
                          color: "#3c3c3c",
                        }}
                      >
                        Phone No:{" "}
                        <span style={{ fontWeight: "500" }}>
                          {passenger.phone}
                        </span>
                      </h6>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <table
          className="maxW724px d-none"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          style={{
            backgroundColor: "#fff",
            boxShadow: "0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353)",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "10px 20px" }}>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                >
                  <tbody>
                    <tr className="header">
                      <td align="left" valign="top">
                        <Link href="/">
                          <Image
                            src={topLogo}
                            alt="..."
                            className="main-logo w140px h-auto"
                          />
                        </Link>
                      </td>
                      <td className="menu" align="right">
                        <ul>
                          <li
                            style={{
                              display: "inline-block",
                              textDecoration: "unset",
                            }}
                          >
                            <Link
                              href="../index.html"
                              style={{
                                textTransform: "capitalize",
                                color: "#444",
                                fontSize: "16px",
                                marginRight: "15px",
                                textDecoration: "none",
                              }}
                            >
                              Home
                            </Link>
                          </li>
                          <li
                            style={{
                              display: "inline-block",
                              textDecoration: "unset",
                            }}
                          >
                            <Link
                              href="../html/tour-layout.html"
                              style={{
                                textTransform: "capitalize",
                                color: "#444",
                                fontSize: "16px",
                                marginRight: "15px",
                                textDecoration: "none",
                              }}
                            >
                              Tours
                            </Link>
                          </li>
                          <li
                            style={{
                              display: "inline-block",
                              textDecoration: "unset",
                            }}
                          >
                            <Link
                              href="../html/hotel-layout.html"
                              style={{
                                textTransform: "capitalize",
                                color: "#444",
                                fontSize: "16px",
                                marginRight: "15px",
                                textDecoration: "none",
                              }}
                            >
                              hotels
                            </Link>
                          </li>
                          <li
                            style={{
                              display: "inline-block",
                              textDecoration: "unset",
                            }}
                          >
                            <Link
                              href="../html/contact-1.html"
                              style={{
                                textTransform: "capitalize",
                                color: "#444",
                                fontSize: "16px",
                                marginRight: "15px",
                                textDecoration: "none",
                              }}
                            >
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td className="success-img" style={{ textAlign: "center" }}>
                <Image src={bookingSuccess} alt="..." />
                <h2
                  style={{
                    margin: "0 auto",
                    width: "90%",
                    fontSize:
                      "calc(18px + (22 - 18) * ((100vw - 320px) / (1920 - 320)))",
                  }}
                >
                  {Commit_Pnr_Error == null && selectedFlight?.fareTypeCode != "ST"
                    ? "Booking Successful ! Get Ready For Unforgettable Trip."
                    : "Unable to create booking there is some thing went wrong please contact us at ....."}
                </h2>
                <h3
                  style={{
                    width: "70%",
                    margin: "5px auto 28px",
                    lineHeight: "1.4",
                    color: "#9a9a9a",
                    fontWeight: "400",
                  }}
                >
                  Head to your Itinerary to check into your flight, make
                  updates, and share your plans with friends &amp; family.
                </h3>
                <Link href="#" className="btn">
                  view itinerary
                </Link>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "0 20px" }}>
                <table className="booking-table">
                  <tbody>
                    <tr>
                      <td className="booking-td">
                        <h5
                          style={{
                            margin: "0 0 6px 0",
                            fontSize: "18px",
                            borderBottom: "1px solid #dddddd",
                            padding: "10px",
                          }}
                        >
                          Booking Details
                        </h5>
                        <table
                          style={{
                            paddingLeft: "10px",
                            color: "#616161",
                            paddingBottom: "10px",
                            paddingTop: "5px",
                          }}
                        >
                          <tbody
                            style={{ fontSize: "16px", lineHeight: "1.5" }}
                          >
                            <tr>
                              <td>Booking No:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                <span>{BookingRefNo}</span>{" "}
                                <span hidden={true}>{PNR_Number}</span>{" "}
                                {/*pnrResponse.data?.data?.pnrHeader?.reservation?.pnr*/}
                              </td>
                            </tr>
                            <tr>
                              <td>Booking Status:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                {Commit_Pnr_Error == null || selectedFlight?.fareTypeCode == "ST"
                                  ? "Confirmed"
                                  : "Failed"}
                              </td>
                            </tr>
                            <tr>
                              <td>Group/Person:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                {flightRequest?.adults} Adults,
                                {flightRequest?.children > 0
                                  ? flightRequest?.children + " Children"
                                  : ""}
                                {flightRequest?.infant > 0
                                  ? flightRequest?.infant + " Infant"
                                  : ""}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td className="booking-td" style={{ width: "50%" }}>
                        <h5
                          style={{
                            margin: "0 0 6px 0",
                            fontSize: "18px",
                            borderBottom: "1px solid #dddddd",
                            padding: "10px",
                          }}
                        >
                          Tour Details
                        </h5>
                        <table
                          style={{
                            paddingLeft: "10px",
                            color: "#616161",
                            paddingBottom: "10px",
                            paddingTop: "5px",
                          }}
                        >
                          <tbody
                            style={{ fontSize: "16px", lineHeight: "1.5" }}
                          >
                            <tr>
                              <td>Tour Details:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                {selectedFlight?.itineraries?.[0]
                                  ?.airport_city &&
                                selectedFlight?.itineraries?.[1]
                                  ?.airport_city ? (
                                  <>
                                    {selectedFlight.itineraries[0].airport_city}{" "}
                                    To{" "}
                                    {selectedFlight.itineraries[1].airport_city}
                                  </>
                                ) : null}
                              </td>
                            </tr>
                            <tr>
                              <td>Travel Date:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                {formatDate(flightRequest?.departureDate)} -{" "}
                                {formatDate(flightRequest?.returnDate)}
                              </td>
                            </tr>
                            <tr>
                              <td>Total Days:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                                {calculateDaysDifference(
                                  flightRequest?.departureDate,
                                  flightRequest?.returnDate
                                )}{" "}
                                Days.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <h5
                  style={{
                    fontSize: "18px",
                    paddingLeft: "24px",
                    marginBottom: "10px",
                    marginTop: "30px",
                  }}
                  hidden={true}
                >
                  Your Details
                </h5>
              </td>
            </tr>
            {PassengerDetails && Array.isArray(PassengerDetails) ? (
              PassengerDetails.map((passenger, index) => (
                <tr style={{ color: "#616161" }} key={index}>
                  <td style={{ padding: "0 24px 50px" }}>
                    <h6
                      style={{
                        margin: "0",
                        fontSize: "16px",
                        fontWeight: "700",
                        lineHeight: "28px",
                        color: "#3c3c3c",
                      }}
                    >
                      Name:
                      <span style={{ fontWeight: "500" }}>
                        {passenger.firstName} {passenger.lastName}
                      </span>
                    </h6>
                    <h6
                      style={{
                        margin: "0",
                        fontSize: "16px",
                        fontWeight: "700",
                        lineHeight: "28px",
                        color: "#3c3c3c",
                      }}
                    ></h6>
                    <h6
                      style={{
                        margin: "0",
                        fontSize: "16px",
                        fontWeight: "700",
                        lineHeight: "28px",
                        color: "#3c3c3c",
                      }}
                    >
                      Email:
                      <Link href="#" style={{ fontWeight: "500" }}>
                        {passenger.email}
                      </Link>
                    </h6>
                    <h6
                      style={{
                        margin: "0",
                        fontSize: "16px",
                        fontWeight: "700",
                        lineHeight: "28px",
                        color: "#3c3c3c",
                      }}
                    >
                      Phone No:{" "}
                      <span style={{ fontWeight: "500" }}>
                        {passenger.phone}
                      </span>
                    </h6>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Confirmation;
