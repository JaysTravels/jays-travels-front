import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import topLogo from "@/public/images/top-logo.png";
import bookingSuccess from "@/public/images/booking-success.jpg";
import Link from "next/link";
import Meta from "@/components/common/Meta";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Commit_Pnr_Static, UPDATE_PAYMENT_STATUS } from "@/store/CreatePnrSlice";
import { Col, Row } from "reactstrap";
import { decryptLocalData } from "@/utils/encrypt";
import {
  setPassengerDetails,
  setBookingNote,
  setPnrMulti,
  PNR_Multi,
  Create_Fop,
  Fare_Price_Pnr,
  Create_Tst,
  Commit_Pnr,
} from "@/store/CreatePnrSlice";
import { getPaymentPage } from "@/store/PaymentSlice";
const ConfirmationManual = () => {
  
  const currSign = '£';
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const pnrResponse = useSelector((state) => state.generatePnr.CommitPnrResponse);
  const Commit_Pnr_Error = useSelector((state) => state.generatePnr.CommitPnrError);
  const [selectedFlight, setselectedFlight] = useState(null);
  const [isRun, setIsRun] = useState(false);
  const [Passenger, setPassenger] = useState(null); 
 // const [BookingNote, setBookingNotes] = useState(null); 
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
    const [loginuser, setloginUser] = useState(null);
  
  useEffect(() => {
  const initData = () => {
    try {
      const airsellRequest = JSON.parse(localStorage.getItem("airsellRequest") || "null");
      setairsellRequest(airsellRequest);

      const airsellResults = JSON.parse(localStorage.getItem("airsellResults") || "null");
      setairsellResults(airsellResults);

      const flightRequest = JSON.parse(localStorage.getItem("flightRequest") || "null");
      setflightRequest(flightRequest);

      const flightResults = JSON.parse(localStorage.getItem("flightResults") || "null");
      setflightResults(flightResults);

      const selectedFlight = JSON.parse(localStorage.getItem("selectedFlight") || "null");
      setselectedFlight(selectedFlight);

      const passengerDetails = JSON.parse(localStorage.getItem("passengerDetails") || "null");
      setPassenger(passengerDetails);

      const BookingRefNo = localStorage.getItem("BookingRefNo");
      setBookingRefNo(BookingRefNo);

      
      //setBookingNotes(Booking_Notes);
      if(isRun == false){
        setIsRun(true);
        handleApiCalls(); 
      }
    
    } catch (err) {
      console.error("Error initializing data:", err);
    }
  };

    const handleApiCalls = async () => {
   debugger;
      let flight;
      flight = JSON.parse(localStorage.getItem("selectedFlight"));
       const encryptedUser = localStorage.getItem("userData");
       const Booking_Notes = localStorage.getItem("bookingNotes");
       const BookingRefNo = localStorage.getItem("BookingRefNo");
       let decryptedUser = "";
       if (encryptedUser) {
        debugger;
        decryptedUser = decryptLocalData(encryptedUser);
        setloginUser(decryptedUser);
          } 
      setselectedFlight(flight);
    if(flight?.fareTypeCode == "ST")
      {

          let session =  getSession();
        if(session != undefined)
        {
          session.sequenceNumber = session?.sequenceNumber + 1;
        }
        const pnrMultirequest = JSON.parse(localStorage.getItem("pnrMultirequest"));
   try 
   {
    
     dispatch(setPassengerDetails(pnrMultirequest.passengerDetails));
      dispatch(setBookingNote(Booking_Notes));
    } catch (error) {
      console.log("Error calling setPassengerDetails:", error.message);
    }
    debugger;
      const addPnrMultiRequset = {
      sessionDetails: pnrMultirequest.sessionDetails,
      passengerDetails: pnrMultirequest.passengerDetails,
      selectedFlightOffer: JSON.stringify(flight),
    }   
  
    let passenger = addPnrMultiRequset.passengerDetails?.find(
      (p) => p.isLeadPassenger === true
    );
      const selectedFlight = JSON.parse(localStorage.getItem("selectedFlight") || "null");
     const pnrCommitRequest = {
      sessionDetails: "",
      optionCode1: "",
      optionCode2:"",
      TotalAmount: selectedFlight?.price?.total,
      FirstName: passenger.firstName,
      LastName: passenger.surName,
      BookingRef: BookingRefNo,
      UserInfo: decryptedUser,
      BookingNote:Booking_Notes
    };
   try{  
       
        const pnrMulti = await dispatch(PNR_Multi(addPnrMultiRequset)).unwrap();
         console.log('PNR_Multi dispatched successfully.');
        if (pnrMulti?.payload?.isSuccessful === false)
        {
         setApiResponse(pnrMulti?.data?.error);
         return;
        }
         // Dispatch fifth API call
         debugger;
        const result2 = await dispatch(Commit_Pnr_Static(pnrCommitRequest)).unwrap();
        if (result2?.isSuccessful === false) {
              setApiResponse(result2?.data?.error);
            }
         else{
              if (result2?.data != null) {
                localStorage.setItem("PNR_Number",result2?.data?.session?.reservation?.pnr);
                setPNR_Number(result2?.data?.session?.reservation?.pnr);
              }
            }

      } catch (err)
       { console.error("An error occurred:", err);}
       finally {}
       try {
         let passengerDetails = JSON.parse(localStorage.getItem("passengerDetails"));
          let BookingRefNo = localStorage.getItem("BookingRefNo");
          let selectedFlight =JSON.parse(localStorage.getItem("selectedFlight"));
          let selectedFlightoffer = localStorage.getItem("selectedFlight");
           let session =  getSession();
           debugger;
        const UpdatePaymentStatusRequest = {
        SessionId: "",
        PaymentStatus: "Pending", 
         SelectedFlightOffer : selectedFlightoffer,
        PassengerInfo :passengerDetails,
        FlightRequest: flightRequest,
        UserName: decryptedUser.FirstName + " " + decryptedUser.LastName,
        BookingNotes:BookingNotes,
         passengerDetails: pnrMultirequest.passengerDetails,
        selectedFlightOffer: JSON.stringify(flight),
        }
        setPaymentUpdate(true);
        debugger;
        const result = dispatch(UPDATE_PAYMENT_STATUS(UpdatePaymentStatusRequest)).unwrap();      
        if(result?.isSuccessful === true){
        setPaymentUpdate(true);
        }  
      } 
      catch (error) { console.error("Error fetching data:", error);}
    if (typeof window !== "undefined") 
      {
      localStorage.clear(); 
      localStorage.setItem("userData", encryptedUser);
      }
      const newUrl = window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    }  
 

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
    }

  initData();
}, []);

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
              {Passenger && Array.isArray(Passenger) ? (
                Passenger.map((passenger, index) => (
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
            {Passenger && Array.isArray(Passenger) ? (
              Passenger.map((passenger, index) => (
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

export default ConfirmationManual;
