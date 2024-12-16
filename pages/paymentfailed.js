import Image from "next/image";
import logo from "@/public/images/logo.png";
import bookingSuccess from "@/public/images/booking-success.jpg";
import Link from "next/link";
import Meta from "@/components/common/Meta";
import {useDispatch, useSelector} from 'react-redux';
import { useRouter } from "next/router";
import { useState,useEffect  } from "react";

const Confirmation = () => {
  debugger;
  const currSign = '£';
  const router = useRouter();
  const dispatch = useDispatch();
  const flightResults = useSelector((state) => state.flights.response);
  //const flightRequest = useSelector((state) => state.flights.flights);
  const airsellResults = useSelector((state) => state.airsell.response);
  const airsellRequest = useSelector((state) => state.airsell.airSellRequest);
  const pnrResponse = useSelector((state) => state.generatePnr.CommitPnrResponse); 
  const Commit_Pnr_Error = useSelector((state)=> state.generatePnr.CommitPnrError); 
``
  const [BookingRefNo, setBookingRefNo] = useState("");
  const [selectedFlight , setselectedFlight] = useState(null);
  const [PassengerDetails , setPassengerDetails] = useState(null);
  const [PNR_Number, setPNR_Number] = useState(null);
  const [flightRequest, setflightRequest] = useState(null);
  useEffect(() => {
  
    const savedBookingRefNo = localStorage.getItem("BookingRefNo");
    setBookingRefNo(savedBookingRefNo || null);

    const savedselectedFlight = localStorage.getItem("selectedFlight");
    if(savedselectedFlight){
      const jsonObjectSelectedFlight = JSON.parse(savedselectedFlight);
      setselectedFlight(jsonObjectSelectedFlight || null);
    }  
    const savedPassengerDetails = localStorage.getItem("PassengerDetails");
    if(savedPassengerDetails != null){
      const jsonObjectPassenger = JSON.parse(savedPassengerDetails);
      setPassengerDetails(jsonObjectPassenger || null);
    }   
    const savedPNR_Number = localStorage.getItem("PNR_Number");
    setPNR_Number(savedPNR_Number || null);

    const savedFlightRequeest = localStorage.getItem("flightRequest");
    if(savedFlightRequeest != null){
      const jsonObjectFlightReq = JSON.parse(savedFlightRequeest);
      setflightRequest(jsonObjectFlightReq || null);
    }
    }, []);
 console.log("passengerDetails: " + PassengerDetails);
  const formatDate = (dateString) => {
    try{
      const date = new Date(dateString); 
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
    }catch(error) {
      console.log('Error calling formatDate:', error.message);      
    }
  };

  function calculateDaysDifference(date1, date2) {
    try{
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      const timeDifference = d2 - d1;
      const dayDifference = timeDifference / (1000 * 60 * 60 * 24);    
      return dayDifference;
    }catch(error) {
      console.log('Error calling calculateDaysDifference:', error.message);      
    }
   
}


  return ( 
    <>
      <Meta title="Confirmation" />
      <div style={{ margin: "80px 0" }}>
        <table
          className="template-width"
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
                        <Link href="../index.html">
                          <Image
                            src={logo}
                            alt="..."
                            className="main-logo w100px h-auto"
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
                Payment Declined By Bank.
                {PNR_Number != null ? "Booking Success Full , Your Booking Reference = " + BookingRefNo : "Unable to book Fare"}
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
                 Please contact us at...
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
                      <td
                        className="booking-td"
                        style={{
                          borderRight: "1px solid #dddddd",
                          width: "50%",
                        }}
                      >
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
                                <span>{BookingRefNo}</span> <span hidden={true}>{PNR_Number}</span> {/*pnrResponse.data?.data?.pnrHeader?.reservation?.pnr*/}
                              </td>
                            </tr>
                            <tr>
                              <td>Booking Status:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                             {PNR_Number != null ? "Booking Success Full , With Payment Failed " : " Failed"}
              
                             
                              </td>
                            </tr>
                            <tr>
                              <td>Group/Person:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                              { flightRequest?.adults} Adults,
                              { flightRequest?.children > 0 ? flightRequest?.children + " Children" : ""}                             
                              { flightRequest?.infant > 0 ? flightRequest?.infant + " Infant" : ""}
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
                              {flightRequest?.origin}  To {flightRequest?.destination}                         
                             {selectedFlight?.itineraries?.[0]?.airport_city && selectedFlight?.itineraries?.[1]?.airport_city ? (
                              <>
                                {selectedFlight.itineraries[0].airport_city} To {selectedFlight.itineraries[1].airport_city}
                              </>
                            ) : null}
                              </td>
                            </tr>
                            <tr>
                              <td>Travel Date:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                            {formatDate(flightRequest?.departureDate)} - {formatDate(flightRequest?.returnDate)}
                              </td>
                            </tr>
                            <tr>
                              <td>Total Days:</td>
                              <td
                                style={{ fontWeight: "600", color: "#3c3c3c" }}
                              >
                               {calculateDaysDifference(flightRequest?.departureDate,flightRequest?.returnDate)} Days.
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
                    <span style={{ fontWeight: "500" }}>{passenger.firstName} {passenger.lastName}</span>
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
                    <span style={{ fontWeight: "500" }}>{passenger.phone}</span>
                  </h6>
                </td>
              </tr>
            ))
           ) : (
      <tr>
        <td colSpan="3"></td>
      </tr>
    )}
            {
             /*
             PassengerDetails && Array.isArray(PassengerDetails) & PassengerDetails.forEach((passenger,index) => {
                if (passenger.type === "ADT") {
                  if(index == 0){
                    (
                     <tr style={{ color: "#616161" }}>
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
                         <span style={{ fontWeight: "500" }}>{passenger.firstName} {passenger.lastName}</span>
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
                         <span style={{ fontWeight: "500" }}>{passenger.phone}</span>
                       </h6>
                     </td>
                   </tr>
                    )
                   }
                   else{
                    <tr style={{ color: "#616161" }}>
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
                        <span style={{ fontWeight: "500" }}>{passenger.firstName} {passenger.lastName}</span>
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
                      </h6>
                     
                      </td>
                  </tr>
                   }                 
                }
                     
              })
            */
            }
           
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Confirmation;
