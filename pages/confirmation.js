import Image from "next/image";
import topLogo from "@/public/images/top-logo.png";
import bookingSuccess from "@/public/images/booking-success.jpg";
import Link from "next/link";
import Meta from "@/components/common/Meta";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UPDATE_PAYMENT_STATUS } from "@/store/CreatePnrSlice";
import { Col, Row } from "reactstrap";
const Confirmation = () => {
  debugger;
  const currSign = "£";
  const router = useRouter();
  const dispatch = useDispatch();
  const flightResults = useSelector((state) => state.flights.response);
  const airsellResults = useSelector((state) => state.airsell.response);
  const airsellRequest = useSelector((state) => state.airsell.airSellRequest);
  const pnrResponse = useSelector(
    (state) => state.generatePnr.CommitPnrResponse
  );
  const Commit_Pnr_Error = useSelector(
    (state) => state.generatePnr.CommitPnrError
  );
  ``;
  const [BookingRefNo, setBookingRefNo] = useState("");
  const [selectedFlight, setselectedFlight] = useState(null);
  const [PassengerDetails, setPassengerDetails] = useState(null);
  const [PNR_Number, setPNR_Number] = useState(null);
  const [flightRequest, setflightRequest] = useState(null);
  const [payment, setPaymentUpdate] = useState(false);
  useEffect(() => {
    debugger;
    const savedBookingRefNo = localStorage.getItem("BookingRefNo");
    setBookingRefNo(savedBookingRefNo || null);

    const savedselectedFlight = localStorage.getItem("selectedFlight");
    if (savedselectedFlight != null) {
      const jsonObjectSelectedFlight = JSON.parse(savedselectedFlight);
      setselectedFlight(jsonObjectSelectedFlight || null);
    }

    const savedPassengerDetails = localStorage.getItem("PassengerDetails");
    if (savedPassengerDetails != null) {
      const jsonObjectPassenger = JSON.parse(savedPassengerDetails);
      setPassengerDetails(jsonObjectPassenger || null);
    }
    const savedPNR_Number = localStorage.getItem("PNR_Number");
    setPNR_Number(savedPNR_Number || null);

    const savedFlightRequeest = localStorage.getItem("flightRequest");
    if (savedFlightRequeest != null) {
      const jsonObjectFlightReq = JSON.parse(savedFlightRequeest);
      setflightRequest(jsonObjectFlightReq || null);
    }

    let session = getSession();
    if (session != null && payment === false) {
      const UpdatePaymentStatusRequest = {
        SessionId: session.sessionId,
        PaymentStatus: "Success",
      };
      const result = dispatch(
        UPDATE_PAYMENT_STATUS(UpdatePaymentStatusRequest)
      ).unwrap();
      if (result?.isSuccessful === true) {
        setPaymentUpdate(true);
      }
    }
  }, []);
  //console.log("passengerDetails: " + PassengerDetails);

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
              <Link href="/">
                <Image
                  src={topLogo}
                  alt="..."
                  className="main-logo w140px h-auto"
                />
              </Link>
            </Col>
            <Col lg={6}>
              <div className="d-flex justify-content-lg-end justify-content-center links mt-lg-0 mt16">
                <Link href="/">Home</Link>
                <Link href="/">Tours</Link>
                <Link href="/">Hotels</Link>
                <Link href="/">Contact</Link>
              </div>
            </Col>
          </Row>
          <div className="text-center">
            <Image src={bookingSuccess} alt="..." />

            <div className="maxW500px mx-auto">
              <h2>
                {Commit_Pnr_Error == null
                  ? "Booking Successful ! Get Ready For Unforgettable Trip."
                  : "Unable to create booking there is some thing went wrong please contact us at ....."}
              </h2>

              <h3 className="mt5 mb30">
                Head to your Itinerary to check into your flight, make updates,
                and share your plans with friends &amp; family.
              </h3>
              <Link href="#" className="btn">
                view itinerary
              </Link>
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
                              {Commit_Pnr_Error == null
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
                              {selectedFlight?.itineraries?.[0]?.airport_city &&
                              selectedFlight?.itineraries?.[1]?.airport_city ? (
                                <>
                                  {selectedFlight.itineraries[0].airport_city}{" "}
                                  To{" "}
                                  {selectedFlight.itineraries[1].airport_city}
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
                              {formatDate(flightRequest?.returnDate)}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td width="40%">Total Days:</td>
                          <td>
                            <span>
                              {calculateDaysDifference(
                                flightRequest?.departureDate,
                                flightRequest?.returnDate
                              )}{" "}
                              Days.
                            </span>
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
                  {Commit_Pnr_Error == null
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
                                {Commit_Pnr_Error == null
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
