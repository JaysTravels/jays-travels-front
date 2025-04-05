import Meta from "@/components/common/Meta";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BreadcrumbSectionFc from "@/components/flightConfirmation/BreadcrumbSection.Fc";
import FrontLayout from "@/components/layouts/Front.Layout";
import Image from "next/image";
import img1 from "@/public/images/flights/airlines/1.png";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Col, Container, Input, Label, Row } from "reactstrap";
import { PASSENGER_SELECTED_FLIGHT_EMAIL } from "@/store/CreatePnrSlice";
import { AirLineClass } from "@/components/classes/airlineclass";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faCrosshairs,
  faLocationDot,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const formatDateToCustomFormat_old = (dateString) => {
  if (dateString != null) {
    const date = new Date(dateString);

    // Format date
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options)
      .format(date)
      .toUpperCase()
      .replace(",", "");

    // Format time
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return { date: formattedDate, time: formattedTime }; // Return both date and time
  }
  return null; // Return null if dateString is null
};

function formatTimeString(time) {
  if (!time) return ""; // Handle empty or undefined values

  let hours, minutes;

  if (time.includes(":")) {
    // Format: "08:55"
    [hours, minutes] = time.split(":");
  } else if (time.length === 4) {
    // Format: "0855"
    hours = time.slice(0, 2);
    minutes = time.slice(2, 4);
  } else {
    return ""; // Handle incorrect formats
  }

  return `${hours} hours , ${minutes} minutes`;
}
function formatTime(time) {
  if (!time) return ""; // Handle empty or undefined values

  const [hours, minutes] = time.split(":");
  return `${hours} h : ${minutes} m`;
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

function getBaggageDetails(freeAllowance, quantityCode, unitQualifier) {
  
  if (quantityCode === "0") {
      return "No baggage allowance"; 
  }

  // Check if quantityCode indicates weight-based allowance
  if (quantityCode === "W") {
      return `${freeAllowance} ${unitQualifier}`;
  }

  // Check if quantityCode indicates number-based allowance (e.g., pieces or hand carry)
  if (quantityCode === "N") {
      return `${freeAllowance} piece(s) or hand carry`;
  }

  // Default case for unknown quantityCode
  return "No Baggage";
}

function getdeptarrTimeDiffrence2(departureAt, arrivalAt) {
  //debugger;

  const departureDatetime = new Date(departureAt);
  const arrivalDatetime = new Date(arrivalAt);

  const totalMinutes = Math.floor((arrivalDatetime - departureDatetime) / (1000 * 60));

  return totalMinutes > 0 ? totalMinutes : 0; // Return 0 for invalid cases
}

function getTotalFlyingTime(itinerary) {

  try{
    let totalMinutes = 0;

    for (const segment of itinerary.segments) {
      const departureAt = segment.departure.at; // Full datetime string
      const arrivalAt = segment.arrival.at; // Full datetime string
  
      totalMinutes += getdeptarrTimeDiffrence2(departureAt, arrivalAt);
    }
  
 
    if (totalMinutes === 0) return "Invalid itinerary";
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours} hours ${minutes} minutes`;
  }catch{
   return '';
  }
  
}

function getdeptarrTimeDiffrence(departureDate, departureTime, arrivalDate, arrivalTime) {
 
  const departureDatetime = new Date(`${departureDate}T${departureTime}`);
  const arrivalDatetime = new Date(`${arrivalDate}T${arrivalTime}`);

  const totalMinutes = Math.floor((arrivalDatetime - departureDatetime) / (1000 * 60));

  if (totalMinutes <= 0) return "Invalid time difference";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hours ${minutes} minutes`;
}

function getFlyingTimeSingleItinerary(itinerary) {
 
  let totalMinutes = 0;
  
  itinerary.segments.forEach(segment => {
      const departureTime = new Date(segment.departure.at);
      const arrivalTime = new Date(segment.arrival.at);
      totalMinutes += Math.floor((arrivalTime - departureTime) / (1000 * 60));
  });
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hours ${minutes} minutes`;
}
function getFlyingTime(itineraries) {

  return itineraries.map(itinerary => {
      let totalMinutes = 0;
      
      itinerary.segments.forEach(segment => {
          const departureTime = new Date(segment.departure.at);
          const arrivalTime = new Date(segment.arrival.at);
          totalMinutes += Math.floor((arrivalTime - departureTime) / (1000 * 60));
      });
      
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours} hours ${minutes} minutes`;
  }).join(", ");
}
function getLayoverTime_old(itinerary) {
  debugger;
  if (itinerary.segments.length < 2) return "";

  const firstArrival = new Date(itinerary.segments[0].arrival.at);
  const lastDeparture = new Date(itinerary.segments[itinerary.segments.length - 1].departure.at);

  const layoverMinutes = Math.floor((lastDeparture - firstArrival) / (1000 * 60));
  
  if (layoverMinutes <= 0) return "No layover time";

  const hours = Math.floor(layoverMinutes / 60);
  const minutes = layoverMinutes % 60;
  
  return `${hours} h ${minutes} m`;
}
function getLayoverTime(itinerary) {
  
  if (itinerary.segments.length < 2) return "";

  let layoverTimes = [];

  for (let i = 0; i < itinerary.segments.length - 1; i++) {
    const arrivalTime = new Date(itinerary.segments[i].arrival.at);
    const nextDepartureTime = new Date(itinerary.segments[i + 1].departure.at);

    const layoverMinutes = Math.floor((nextDepartureTime - arrivalTime) / (1000 * 60));

    if (layoverMinutes > 0) {
      const hours = Math.floor(layoverMinutes / 60);
      const minutes = layoverMinutes % 60;
      layoverTimes.push(`${hours} h ${minutes} m`);
    } else {
      layoverTimes.push("");
    }
  }

  return layoverTimes.join(" | "); // Returns layover times for each stop
}
function getTotalJourneyTime(itinerary) {
 
  if (!itinerary?.segments || itinerary.segments.length === 0) return "0 hours 0 minutes";
  if (itinerary?.segments?.length < 2) return getFlyingTimeSingleItinerary(itinerary);

   let totalMinutes = 0;

  itinerary.segments.forEach(segment => {
    const departureTime = new Date(segment.departure.at);
    const arrivalTime = new Date(segment.arrival.at);
    totalMinutes += Math.floor((arrivalTime - departureTime) / (1000 * 60));
  });

  for (let i = 0; i < itinerary.segments.length - 1; i++) {
    const arrivalTime = new Date(itinerary.segments[i].arrival.at);
    const nextDepartureTime = new Date(itinerary.segments[i + 1].departure.at);
    totalMinutes += Math.floor((nextDepartureTime - arrivalTime) / (1000 * 60));
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hours ${minutes} minutes`;
}

const removeSeconds = (timeString) => {
  if (timeString != null) {
    const parts = timeString.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}`; // Return only hours and minutes
    }
    return timeString; // Return the original string if it doesn't contain seconds
  }
  return null; // Return null if timeString is null
};

const formatDate = (date) => {
  if (date != null) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date)
      .toLocaleDateString("en-GB", options)
      .replace(/\//g, "-");
  }
};

let flight;

function convertTimeFormat(timeString) {
  
  if (!timeString || !timeString.includes(":")) {
    return "";
  }
  const [hours, minutes] = timeString.split(":");
  if (isNaN(hours) || isNaN(minutes)) {
    return "";
  }

  return `${hours}h:${minutes}m`;
}
const FlightConfirmation = () => {
  const currSign = "£";
  const router = useRouter();
  const dispatch = useDispatch();
  const flightResults = useSelector((state) => state.flights.response);
  const flightRequest = useSelector((state) => state.flights.flights);
  const airsellResults = useSelector((state) => state.airsell.response);
  const airsellRequest = useSelector((state) => state.airsell.airSellRequest);
  const PNR_Multi_Error = useSelector(
    (state) => state.generatePnr.PNR_Multi_Error
  );
  const Create_Fop_Error = useSelector(
    (state) => state.generatePnr.Create_Fop_Error
  );
  const Fare_Price_Pnr_Error = useSelector(
    (state) => state.generatePnr.Fare_Price_Pnr_Error
  );
  const Create_Tst_Error = useSelector(
    (state) => state.generatePnr.Create_Tst_Error
  );
  const Commit_Pnr_Error = useSelector(
    (state) => state.generatePnr.CommitPnrError
  );
  const paymentPageError = useSelector(
    (state) => state.payments?.payment_Error
  );
  const paymentPageData = useSelector(
    (state) => state.payments?.payment_response
  );
  const BookingRefNo = useSelector(
    (state) => state.payments?.payment_response?.bookingRefNo
  );
  const PassengerDetails = useSelector(
    (state) => state.generatePnr.PassengerDetails
  );
  const selectedFlight = useSelector((state) => state.flights.selectedFlight);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ApiResponse, setApiResponse] = useState("");
  const [requiredFields, setRequiredFields] = useState([]);
  const [formData, setFormData] = useState({
    adults: Array.from({ length: flightRequest.adults }, () => ({
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phone: "",
      dob: "",
    })),
    children: Array.from({ length: flightRequest.children || 0 }, () => ({
      firstName: "",
      lastName: "",
      title: "",
      dob: "",
    })),
    infants: Array.from({ length: flightRequest.infant || 0 }, () => ({
      firstName: "",
      lastName: "",
      title: "",
      dob: "",
    })),
  });

  const [errors, setErrors] = useState({
    adults: Array.from({ length: flightRequest.adults }, () => ({
      title: false,
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      dob: false,
    })),
    children: Array.from({ length: flightRequest.children }, () => ({
      title: false,
      firstName: false,
      lastName: false,
      dob: false,
    })),
    infants: Array.from({ length: flightRequest.infants }, () => ({
      title: false,
      firstName: false,
      lastName: false,
      dob: false,
    })),
  });
  const [errorsChild, setErrorsChild] = useState({
    children: Array.from({ length: flightRequest.children }, () => ({
      title: false,
      firstName: false,
      lastName: false,
    })),
  });

  function getCabinClassName(cabinClassCode) {
    const cabinClassMap = {
        M: "Basic Economy",
        W: "Premium Economy",
        Y: "Economy",
        C: "Business",
        F: "First"
    };

    return cabinClassMap[cabinClassCode] || ""; // Default for invalid codes
}


  const [errorsInfant, setErrorsInfant] = useState({
    infants: Array.from({ length: flightRequest.infants }, () => ({
      title: false,
      firstName: false,
      lastName: false,
    })),
  });
  const [pnrerror, setpnrError] = useState(null);
  useEffect(() => {
    setpnrError(Commit_Pnr_Error);
  }, [Commit_Pnr_Error]);

  // Working For Min Date and Max Date
  const today = new Date();

  const getMinMaxDate = (ageFrom, ageTo) => {
    const minDate = new Date(
      today.getFullYear() - ageTo,
      today.getMonth(),
      today.getDate()
    );
    const maxDate = new Date(
      today.getFullYear() - ageFrom,
      today.getMonth(),
      today.getDate()
    );
    return { minDate, maxDate };
  };
  // Adult: 18 years and older
  const adultDateRange = getMinMaxDate(18, 100);

  // Child: 2 to 14 years
  const childDateRange = getMinMaxDate(2, 14);

  // Infant: 0 to 2 years
  const infantDateRange = getMinMaxDate(0, 2);
  // End region for working for min date and max date
  const handleChange = (type, index, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: prevData[type]?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));

    const updatedErrorsGroup = [...errors[type]];
    if (updatedErrorsGroup[index]?.[field]) {
      updatedErrorsGroup[index][field] = false;
      setErrors({ ...errors, [type]: updatedErrorsGroup });
    }
  };

  const initiatePayment = async () => {
   // debugger;
    //setIsLoading(true);
    const data = paymentPageData;
    if (data && data.url && data.parameters) {
    //  debugger;
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.url;

      Object.keys(data.parameters)
        .sort()
        .forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key.toUpperCase();
          input.value = data.parameters[key];
          form.appendChild(input);
        });
      document.body.appendChild(form);
      form.submit();
    }
  };

  const handleEmailChange = (e) => {
    if (!e || !e.target) {
      console.error("Event object is null or undefined!");
      return;
    }
    console.log("Event target value:", e.target.value); // Debugging line
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    if (!e || !e.target) {
      console.error("Event object is null or undefined!");
      return;
    }
    setPhone(e.target.value);
  };

  const checkValidation = () => {
    //debugger;
    let isValid = true;
    const updatedErrors = {
      adults: formData.adults.map((data, index) => {
        const fieldErrors = {};
        Object.keys(data).forEach((key) => {
          if (!data[key]) {
            if ((key == "email" || key == "phone") && index != 0) {
              fieldErrors[key] = false;
            } else {
              isValid = false;
              fieldErrors[key] = true;
            }
          } else {
            fieldErrors[key] = false;
          }
        });
        return fieldErrors;
      }),
      children: formData.children.map((data) => {
        const fieldErrors = {};
        Object.keys(data).forEach((key) => {
          if (!data[key]) {
            fieldErrors[key] = true;
            isValid = false;
          } else {
            fieldErrors[key] = false;
          }
        });
        return fieldErrors;
      }),
      infants: formData.infants.map((data) => {
        const fieldErrors = {};
        Object.keys(data).forEach((key) => {
          if (!data[key]) {
            fieldErrors[key] = true;
            isValid = false;
          } else {
            fieldErrors[key] = false;
          }
        });
        return fieldErrors;
      }),
    };
    setErrors(updatedErrors);
    return isValid;
  };

  const handleApiCalls = async () => {
    var isvalid = checkValidation();
    if (!isvalid) {
      return;
    }
debugger;
    // Set Local Storage varaibles before sending to bank page
    if (BookingRefNo) {
      localStorage.setItem("BookingRefNo", BookingRefNo);
    }

    let flight;
    if (airsellRequest != null) {
      flight = flightResults?.data?.find(
        (flight) => flight.id === airsellRequest.flightId
      );
    }
    localStorage.setItem("flightRequest", JSON.stringify(flightRequest));
    localStorage.setItem("flightResults", JSON.stringify(flightResults));
    localStorage.setItem("airsellRequest", JSON.stringify(airsellRequest));
    localStorage.setItem("airsellResults", JSON.stringify(airsellResults));
    localStorage.setItem("selectedFlight", JSON.stringify(flight));
    

    // End of Set Local Storage Variable before sending to bank page
    setLoading(true);

    let session = getSession();
    session.sequenceNumber = session.sequenceNumber + 1;
    const pnrMultirequest = CreatePnrMultiRequest(formData, session, flight);
    localStorage.setItem("pnrMultirequest", JSON.stringify(pnrMultirequest));
    localStorage.setItem("passengerDetails", JSON.stringify(pnrMultirequest.passengerDetails));
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
    localStorage.setItem("PassengerDetails", JSON.stringify(addPnrMultiRequset.passengerDetails));
    localStorage.setItem("flightRequest", JSON.stringify(flightRequest));


    //flightRequest
    // let session2 = getSession();
    // session2.sequenceNumber = session2.sequenceNumber + 2;
    // const fopRequest = CreateFopRequest(session2);
    // const FopRequest = {
    //   sessionDetails: fopRequest.sessionDetails,
    //   transactionDetailsCode: fopRequest.transactionDetailsCode,
    //   fopCode: fopRequest.fopCode,
    // };

    // let session3 = getSession();
    // session3.sequenceNumber = session3.sequenceNumber + 3;
    // const carrierCode =
    //   airsellResults?.data?.airSellResponse[0]?.flightDetails[0]
    //     ?.marketingCompany;
    // const farePriceRequest = CreateFarePricePnrRequest(carrierCode, session3);
    // const pricePnrRequest = {
    //   sessionDetails: farePriceRequest.sessionDetails,
    //   pricingOptionKey: farePriceRequest.pricingOptionKey,
    //   carrierCode: carrierCode,
    // };
    // let session4 = getSession();
    // session4.sequenceNumber = session4.sequenceNumber + 4;
    // const tstRequest = CreateTstRequest(session4);
    // const ticketTstRequest = {
    //   sessionDetails: tstRequest.sessionDetails,
    //   adults: tstRequest.adults,
    //   children: tstRequest.children,
    //   infants: tstRequest.infants,
    // };
  //   let session5 = getSession();
  //   session5.sequenceNumber = session5.sequenceNumber + 5;
  //   const commitPnrRequest = CreateCommitPnrRequest(session5);
  //  // debugger;
    //  let passenger = addPnrMultiRequset.passengerDetails?.find(
    //    (p) => p.isLeadPassenger === true
    //  );
    // const pnrCommitRequest = {
    //   sessionDetails: commitPnrRequest.sessionDetails,
    //   optionCode1: commitPnrRequest.optionCode1,
    //   optionCode2: commitPnrRequest.optionCode2,
    //   TotalAmount: selectedFlight?.price?.total,
    //   FirstName: passenger.firstName,
    //   LastName: passenger.surName,
    //   BookingRef: BookingRefNo,
    // };
    try {
      // Dispatch first API call
     
      //const pnrMulti = await dispatch(PNR_Multi(addPnrMultiRequset));
      
      // console.log('PNR_Multi dispatched successfully.');
      // if (pnrMulti?.payload?.isSuccessful === false) {
      //   setApiResponse(pnrMulti?.data?.error);
      //   alert("No Fare Avaialble Please go back to flights results page and select another... " + pnrMulti?.data?.error);
      //   router.push("/search-result");
      //   return;
      // }
      // Dispatch second API call
      // await dispatch(Create_Fop(FopRequest));
      // console.log("Create_Fop dispatched successfully.");
      // if (Create_Fop_Error != null) {
      //   setApiResponse(Create_Fop_Error);
      //   return;
      // }
      // Dispatch third API call
      // await dispatch(Fare_Price_Pnr(pricePnrRequest));
      // console.log("Fare_Price_Pnr dispatched successfully.");
      // if (Fare_Price_Pnr_Error != null) {
      //   setApiResponse(Fare_Price_Pnr_Error);
      //   return;
      // }

      // Dispatch fourth API call
      // await dispatch(Create_Tst(ticketTstRequest));
      // console.log("Create_Tst dispatched successfully.");
      // if (Create_Tst_Error != null) {
      //   setApiResponse(Create_Tst_Error);
      //   return;
      // }
      // For sending email to admin relted to selected custoemr fare

       let sessionemail = getSession();
       if (sessionemail != null) {
        const SelectedFlightEmailRequest = {
          passengerInfo :addPnrMultiRequset.passengerDetails,
          SessionId: session.sessionId,
          selectedFlightOffer: JSON.stringify(flight),
        }

        const result = dispatch(PASSENGER_SELECTED_FLIGHT_EMAIL(SelectedFlightEmailRequest)).unwrap();
        if (result?.isSuccessful === true) {
          console.log("Passeger Selected Flight Email Sent success");
        }
      }
  
      // Dispatch fifth API call
     // const result2 = await dispatch(Commit_Pnr(pnrCommitRequest)).unwrap();
      
      // if (result2?.isSuccessful === false) {
      //   setApiResponse(result2?.data?.error);
      //   alert("Error while generate pnr " + result2?.data?.error);
      //   router.push("/pnrfailed");
      //   return;
      // } else {
      //   if (result2?.data != null) {
      //     localStorage.setItem(
      //       "PNR_Number",
      //       result2?.data?.session?.reservation?.pnr
      //     );
      //   }
        const data = paymentPageData;
        if (data && data.url && data.parameters) {
         // debugger;
          const form = document.createElement("form");
          form.method = "POST";
          form.action = data.url;

          Object.keys(data.parameters)
            .sort()
            .forEach((key) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key.toUpperCase();
              input.value = data.parameters[key];
              form.appendChild(input);
            });
          document.body.appendChild(form);
          form.submit();
        }
     // }

      //  router.push("/confirmation");
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred while processing the requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleApiCallsPayment = async () => {
    setLoading(true);
    setError(null);
   // debugger;

    const paymentRequest = {
      OrderId: "Order123",
      Amount: 100.0, // Amount in pounds
      Currency: "GBP",
      Language: "en_US",
    };

    try {
      await dispatch(getPaymentPage(paymentRequest))
        .unwrap()
        .then(() => {
          //debugger;
          console.log("Get payment successfully.");
          if (paymentPageError != null) {
            setApiResponse(paymentPageError);
            return;
          }
          router.push("/payment");
        });
    } catch (err) {
      console.error("An error occurred:", err);
      setError("An error occurred while processing the requests.");
    } finally {
      setLoading(false);
    }
    router.push("/payment");
  };

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
  function CreatePnrMultiRequest(formData, session, flight) {

    const passengers = [];
    formData.adults.forEach((adult, index) => {
      if (index == 0) {
        passengers.push({
          firstName: adult.firstName,
          surName: adult.lastName,
          type: "ADT", // Adult type
          dob: formatDate(adult.dob), //adult.dob,
          isLeadPassenger: true, // First adult as lead passenger
          number: index + 1,
          email: adult.email,
          phone: adult.phone,
          PhoneNumber: adult.phone,
          PassengerType : "ADT"
        });
      }
      else {
        passengers.push({
          firstName: adult.firstName,
          surName: adult.lastName,
          type: "ADT", // Adult type
          dob: formatDate(adult.dob), //adult.dob,
          isLeadPassenger: false, // First adult as lead passenger
          number: index + 1,
          email: '',
          PassengerType : "ADT"
        });
      }
    });

    formData.children.forEach((child, index) => {
      passengers.push({
        firstName: child.firstName,
        surName: child.lastName,
        type: "CHD", // Child type
        dob: formatDate(child.dob), //child.dob,
        number: formData.adults.length + index + 1,
        email: "",
        PassengerType : "CHD"
      });
    });

    formData.infants.forEach((infant, index) => {
      passengers.push({
        firstName: infant.firstName,
        surName: infant.lastName,
        type: "INF", // Infant type
        dob: formatDate(infant.dob),//infant.dob,          
        number: formData.adults.length + formData.children.length + index + 1,
        email: "",
        PassengerType : "INF"
      });
    });
    const pnrmultirequest = {
      sessionDetails: session,
      passengerDetails: passengers,
      selectedFlightOffer: JSON.stringify(flight)
    };
    return pnrmultirequest;

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
  if (airsellRequest != null) {
    flight = flightResults?.data?.find(
      (flight) => flight.id === airsellRequest.flightId
    );
  }

  return (
    <>
      <Meta title="Flight confirmation" />

      <BreadcrumbSectionFc />
      {airsellResults?.data != null ? (
        <div className="small-section">
          <Container>
            <Row>
              <Col lg={9}>

                <div className="review-section">
                  {airsellResults.data.airSellResponse.map((response, index) => (
                    <div key={index} className="review_box flight_confirmation_box">
                      <div className="row title-top flight_confirmation_box_heading" style={{margin:'0px'}}>
                        <div className="col-sm-6 col-md-6">
                        <p className="mb-0 origion-destination-heading">
                            {index === 0 ? selectedFlight?.itineraries[0]?.airport_city : selectedFlight?.itineraries[1]?.airport_city}
                            <i className="fas fa-arrow-right fa-1x textC3" style={{ padding: '0 5px' }}></i>
                            {" "} 
                            {index === 0 ? selectedFlight?.itineraries[1]?.airport_city : selectedFlight?.itineraries[0]?.airport_city}                            
                        </p>
                        <p className="origion-destination-heading mb-0">{index === 0 ? "Outbound Flight" : "Inbound Flight"}</p>

                        </div>
                        <div className="col-sm-6 col-md-6">  {/* Aligning to the right */}
                            <p className="mb-0 journey-time">
                              {/* Total journey time {getTotalJourneyTime(selectedFlight.itineraries[index])} */}
                            </p>

                            <p className="mb-0 journey-time">
                               {/* { selectedFlight?.itineraries[index]?.segments?.length > 1 ? "Flying time: " + getTotalFlyingTime(selectedFlight?.itineraries[index]) : ""}  */}
                               { selectedFlight?.itineraries[index]?.duration != null ? "Flying time: " + formatTime(selectedFlight?.itineraries[index]?.duration) : ""}
                            </p>

                           
                            {/* <h6>                          
                           {selectedFlight?.itineraries[index]?.segments?.length - 1 != 0 ? selectedFlight?.itineraries[index]?.segments?.length - 1 + " stop" : ""} 
                           </h6> */}

                           <p className="mb-0 journey-time">                           
                                {"Baggage Allowence: " + getBaggageDetails(selectedFlight?.baggageDetails?.freeAllowance,selectedFlight?.baggageDetails?.quantityCode,selectedFlight?.baggageDetails?.unitQualifier)}
                          </p> 
                           {/*<span style={{ color: "transparent" }}> { "Free Allowance: " + selectedFlight?.baggageDetails?.freeAllowance + " , QuantityCode " + selectedFlight?.baggageDetails?.quantityCode + " , UnitQuilifier " + selectedFlight?.baggageDetails?.unitQualifier }</span> */}
                        </div>
                       
                      </div>
                      {response.flightDetails?.map((flight, flightIndex) => (
                        <div key={flightIndex} className="flight_detail flight_Confirmation_box_inner">
                          <Row>
                            <Col md={3}>
                              <div className="logo-sec flight_Confirmation_box_image">
                                <Image
                                  src={`/images/airline-logo/${flight.marketingCompany}.png`}
                                  alt={flight.marketingCompany}
                                  width={340}
                                  height={240}
                                  className="img-fluid"
                                />
                                  <div>
                              {selectedFlight?.itineraries?.[index]?.segments[flightIndex]?.number && (
                                      <p className="destination-date mb-0">
                                        Flight No. : {selectedFlight?.itineraries?.[index]?.segments[flightIndex]?.number}
                                      </p>
                                    )}
                                     {selectedFlight?.itineraries?.[index]?.segments[flightIndex]?.cabinClass && (
                                      <p className="destination-date mb-0">
                                        Cabin : {getCabinClassName(selectedFlight?.itineraries?.[index]?.segments[flightIndex]?.cabinClass)}
                                      </p>
                                    )}
                                    </div>
                              </div>
                              <div className="flight_confirmation_box_image_name">
                                <span>{flight.marketingCompanyName}</span>
                              </div>
                            </Col>
                            <Col md={7}>
                              <div className="airport-part">
                                <div className="airport-name">
                                  <h6 className="outbound-origion-h4">{flight.fromAirport}</h6>
                                  <span className="origion-date">{removeSeconds(flight.departureTime)} {formatDateToCustomFormat(flight.departureDate)}</span>
                                  {/* <p className="origion-date">{formatDateToCustomFormat(flight.departureDate)}</p> */}
                                  {/* {selectedFlight?.itineraries?.[index]?.segments?.[flightIndex]?.departure?.terminal && (
                                          <p className="origion-date">
                                            terminal: {selectedFlight.itineraries[index].segments[flightIndex].departure.terminal}
                                          </p>
                                        )} */}

                              <p className="origion-date">
                              terminal: {selectedFlight?.itineraries?.[index]?.segments?.[flightIndex]?.departure?.terminal ?? "terminal:-"}
                              </p>
                                </div>
                                <div className="airport-progress">
                                <p className="mb-0 origion-destination-heading">
                                   
                                    {/* { getdeptarrTimeDiffrence(flight.departureDate,flight.departureTime,flight.arrivalDate,flight.arrivalTime)}                           */}
                                  {formatTimeString(selectedFlight?.itineraries?.[index]?.segments?.[flightIndex]?.duration)}                          
                                    </p>
                                   
                         
                         {selectedFlight?.itineraries?.[index]?.segments?.length > 1 && (() => {
                            const layoverTimes = getLayoverTime(selectedFlight?.itineraries[index]).split(" | ");
                            return layoverTimes[flightIndex] !== undefined ? (
                              <p className="mb-0 layover-time">
                                {`Layover: ${layoverTimes[flightIndex]}`}
                              </p>
                            ) : null;
                          })()}
                               
                                </div>
                                <div className="airport-name arrival">
                                  <h6 className="outbound-destination-h4">{flight.toAirport}</h6>
                                  <span className="destination-date">{removeSeconds(flight.arrivalTime)} {formatDateToCustomFormat(flight.arrivalDate)}</span>
                                  {/* <p className="destination-date">{formatDateToCustomFormat(flight.arrivalDate)}</p> */}
                                 
                                  {selectedFlight?.itineraries?.[index]?.segments?.[flightIndex]?.arrival?.terminal && (
                                          <p className="destination-date">
                                            terminal: {selectedFlight.itineraries[index].segments[flightIndex].arrival.terminal}
                                          </p>
                                        )}
                                </div>
                              </div>
                            </Col>
                            <Col md={3}>

                              <div className="duration">
                            
                                <div>
                                
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="review_box">
                    <div className="title-top">
                      <h5>traveller details</h5>
                    </div>
                    <div className="flight_detail">
                      <Row className="form_flight">
                        <Col md={12}>
                          {Array.from(
                            { length: flightRequest.adults },
                            (_, index) => (
                              <form key={index}>
                                <h6>Adult {index + 1}</h6>
                                <Row>
                                  <Col md={3} className="form-group">
                                    <Label for={`title-${index}`}>Title</Label>
                                    <Input
                                      type="select"
                                      // className="form-control"
                                      id={`adults-title-${index}`}
                                      onChange={(e) =>
                                        handleChange(
                                          "adults",
                                          index,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      onBlur={(e) =>
                                        handleChange(
                                          "adults",
                                          index,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        errors.adults[index]?.title
                                          ? "form-control is-invalid"
                                          : "form-control"
                                      }
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Mr.">Mr.</option>
                                      <option value="Ms.">Ms.</option>
                                      <option value="Mrs.">Mrs.</option>
                                    </Input>
                                    {errors.adults[index]?.title && (
                                      <div className="invalid-feedback">
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={3} className="form-group">
                                    <Label for={`first-name-${index}`}>
                                      First Name
                                    </Label>
                                    <Input
                                      type="text"
                                      placeholder="Enter first name"
                                      id={`adults-first-name-${index}`}
                                      onChange={(e) =>
                                        handleChange(
                                          "adults",
                                          index,
                                          "firstName",
                                          e.target.value
                                        )
                                      }
                                      onBlur={(e) =>
                                        handleChange(
                                          "adults",
                                          index,
                                          "firstName",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        errors.adults[index]?.firstName
                                          ? "form-control is-invalid"
                                          : "form-control"
                                      }
                                    />
                                    {errors.adults[index]?.firstName && (
                                      <div className="invalid-feedback">
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={3} className="form-group">
                                    <Label for={`last-name-${index}`}>
                                      Last Name
                                    </Label>
                                    <Input
                                      type="text"
                                      // className="form-control"
                                      placeholder="Enter last name"
                                      id={`adults-last-name-${index}`}
                                      value={
                                        formData["adults"][index]?.lastName
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          "adults",
                                          index,
                                          "lastName",
                                          e.target.value
                                        )
                                      }
                                      onBlur={(e) =>
                                        handleChange(
                                          "adults",
                                          index,
                                          "lastName",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        errors.adults[index]?.lastName
                                          ? "is-invalid"
                                          : "form-control"
                                      }
                                    />
                                    {errors.adults[index]?.lastName && (
                                      <div className="invalid-feedback">
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={3} className="form-group">
                                    <label htmlFor={`adults-dob-${index}`}>
                                      Date of Birth
                                    </label>

                                    <DatePicker
                                      id={`adults-dob-${index}`}
                                      selected={
                                        formData.adults[index]?.dob || null
                                      }
                                      onChange={(date) =>
                                        handleChange(
                                          "adults",
                                          index,
                                          "dob",
                                          date
                                        )
                                      }
                                      dateFormat="dd-MM-yyyy"
                                      className={"form-control"}
                                      maxDate={adultDateRange.maxDate}
                                      minDate={adultDateRange.minDate}
                                      placeholderText="Date of Birth"
                                      showMonthDropdown // Enable month dropdown
                                      showYearDropdown // Enable year dropdown
                                      dropdownMode="select" // Use "select" dropdown for year/month
                                    />
                                    {errors.adults[index]?.dob && (
                                      <div
                                        className="error-input"
                                        style={{ color: "red" }}
                                      >
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                </Row>

                                {/** Working For Email And Contact */}
                                {index === 0 ? (
                                  <form style={{ margin: '20px 0 0 0' }}>
                                    <Row>
                                      <Col md={6} className="form-group">
                                        <Label for="inputEmail4">Email</Label>
                                        <Input
                                          type="email"
                                          //className="form-control"
                                          id="inputEmail4"
                                          onChange={(e) =>
                                            handleChange(
                                              "adults",
                                              index,
                                              "email",
                                              e.target.value
                                            )
                                          }
                                          onBlur={(e) =>
                                            handleChange(
                                              "adults",
                                              index,
                                              "email",
                                              e.target.value
                                            )
                                          }
                                          className={
                                            errors.adults[index]?.email
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.adults[index]?.email && (
                                          <div className="invalid-feedback">
                                            This field is required.
                                          </div>
                                        )}
                                      </Col>
                                      <Col
                                        md={6}
                                        className="form-group col-md-6"
                                      >
                                        <Label for="inputnumber">
                                          Phone no:
                                        </Label>
                                        <Input
                                          type="number"
                                          // className="form-control"
                                          id="inputnumber"
                                          onChange={(e) =>
                                            handleChange(
                                              "adults",
                                              index,
                                              "phone",
                                              e.target.value
                                            )
                                          }
                                          onBlur={(e) =>
                                            handleChange(
                                              "adults",
                                              index,
                                              "phone",
                                              e.target.value
                                            )
                                          }
                                          className={
                                            errors.adults[index]?.phone
                                              ? "form-control is-invalid"
                                              : "form-control"
                                          }
                                        />
                                        {errors.adults[index]?.phone && (
                                          <div className="invalid-feedback">
                                            This field is required.
                                          </div>
                                        )}
                                      </Col>
                                    </Row>
                                  </form>
                                ) : (
                                  ""
                                )}
                              </form>
                            )
                          )}

                          {/* For Childern */}
                          {Array.from(
                            { length: flightRequest?.children },
                            (_, index) => (
                              <form key={index}>
                                <h6>Child {index + 1}</h6>
                                <Row style={{ margin: '5px 0' }}>
                                  <Col md={3} className="form-group">
                                    <Label for={`title-${index}`}>
                                      Title c
                                    </Label>
                                    <Input
                                      type="select"
                                      //className="form-control"
                                      id={`title-child-${index}`}
                                      onChange={(e) =>
                                        handleChange(
                                          "children",
                                          index,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      onBlur={(e) =>
                                        handleChange(
                                          "children",
                                          index,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        errors.children[index]?.title
                                          ? "form-control is-invalid"
                                          : "form-control"
                                      }
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Master.">Master.</option>
                                      <option value="Miss.">Miss.</option>
                                    </Input>
                                    {errors.children[index]?.title && (
                                      <div className="invalid-feedback">
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={3} className="form-group">
                                    <Label for={`first-name-child-${index}`}>
                                      First Name
                                    </Label>
                                    <Input
                                      type="text"
                                      id={`first-name-child-${index}`}
                                      placeholder="Enter first name"
                                      //value={formData['children'][index]?.firstName}
                                      onChange={(e) =>
                                        handleChange(
                                          "children",
                                          index,
                                          "firstName",
                                          e.target.value
                                        )
                                      }
                                      onBlur={(e) =>
                                        handleChange(
                                          "children",
                                          index,
                                          "firstName",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        errors?.children[index]?.firstName
                                          ? "form-control is-invalid"
                                          : "form-control"
                                      }
                                    />
                                    {errors?.children[index]?.firstName && (
                                      <div className="invalid-feedback">
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={3} className="form-group">
                                    <Label for={`last-name-child-${index}`}>
                                      Last Name
                                    </Label>
                                    <Input
                                      type="text"
                                      // className="form-control"
                                      id={`last-name-child-${index}`}
                                      placeholder="Enter last name"
                                      //value={formData['children'][index]?.lastName}
                                      onChange={(e) =>
                                        handleChange(
                                          "children",
                                          index,
                                          "lastName",
                                          e.target.value
                                        )
                                      }
                                      onBlur={(e) =>
                                        handleChange(
                                          "children",
                                          index,
                                          "lastName",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        errors?.children[index]?.lastName
                                          ? "form-control is-invalid"
                                          : "form-control"
                                      }
                                    />
                                    {errors?.children[index]?.lastName && (
                                      <div className="invalid-feedback">
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={3} className="form-group">
                                    <div className="form-group">
                                      <label htmlFor={`children-dob-${index}`}>
                                        Date of Birth
                                      </label>
                                      <DatePicker
                                        id={`children-dob-${index}`}
                                        selected={
                                          formData?.children[index]?.dob || null
                                        } // Initial value
                                        onChange={(date) =>
                                          handleChange(
                                            "children",
                                            index,
                                            "dob",
                                            date
                                          )
                                        } // Update on date change
                                        dateFormat="dd-MM-yyyy" // Display format
                                        className={"form-control"}
                                        minDate={childDateRange.minDate}
                                        maxDate={childDateRange.maxDate}
                                        placeholderText="Date of Birth"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                      />
                                      {errors.children[index]?.dob && (
                                        <div
                                          className="error-input"
                                          style={{ color: "red" }}
                                        >
                                          This field is required.
                                        </div>
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              </form>
                            )
                          )}

                          {/* For Infant */}

                          {Array.from(
                            { length: flightRequest?.infant },
                            (_, index) => (
                              <form key={index}>
                                <h6>Infant {index + 1}</h6>
                                <Row style={{ margin: '5px 0' }}>
                                  <Col md={3} className="form-group">
                                    <Label for={`title-${index}`}>Title</Label>
                                    <Input
                                      type="select"
                                      // className="form-control"
                                      id={`title-infant-${index}`}
                                      onChange={(e) =>
                                        handleChange(
                                          "infants",
                                          index,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      onBlur={(e) =>
                                        handleChange(
                                          "infants",
                                          index,
                                          "title",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        errors?.infants[index]?.title
                                          ? "form-control is-invalid"
                                          : "form-control"
                                      }
                                    >
                                      <option value="">Choose...</option>
                                      <option value="Infant.">Infant.</option>
                                      <option value="Master.">Master.</option>
                                      <option value="Miss.">Miss.</option>
                                    </Input>
                                    {errors?.infants[index]?.title && (
                                      <div className="invalid-feedback">
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={3} className="form-group">
                                    <Label for={`first-name-infant-${index}`}>
                                      First Name
                                    </Label>
                                    <Input
                                      type="text"
                                      //className="form-control"
                                      id={`first-name-infants-${index}`}
                                      //  value={formData['infant'][index]?.firstName}
                                      placeholder="Enter first name"
                                      onChange={(e) =>
                                        handleChange(
                                          "infants",
                                          index,
                                          "firstName",
                                          e.target.value
                                        )
                                      }
                                      onBlur={(e) =>
                                        handleChange(
                                          "infants",
                                          index,
                                          "firstName",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        errors?.infants[index]?.firstName
                                          ? "form-control is-invalid"
                                          : "form-control"
                                      }
                                    />
                                    {errors?.infants[index]?.firstName && (
                                      <div className="invalid-feedback">
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={3} className="form-group">
                                    <Label for={`last-name-infant-${index}`}>
                                      Last Name
                                    </Label>
                                    <Input
                                      type="text"
                                      //className="form-control"
                                      id={`last-name-infants-${index}`}
                                      placeholder="Enter last name"
                                      //  value={formData['infant'][index]?.lastName}
                                      onChange={(e) =>
                                        handleChange(
                                          "infants",
                                          index,
                                          "lastName",
                                          e.target.value
                                        )
                                      }
                                      onBlur={(e) =>
                                        handleChange(
                                          "infants",
                                          index,
                                          "lastName",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        errors?.infants[index]?.lastName
                                          ? "form-control is-invalid"
                                          : "form-control"
                                      }
                                    />
                                    {errors?.infants[index]?.lastName && (
                                      <div className="invalid-feedback">
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                  <Col md={3} className="form-group">
                                    <label htmlFor={`infants-dob-${index}`}>
                                      Date of Birth
                                    </label>
                                    <DatePicker
                                      id={`infants-dob-${index}`}
                                      selected={
                                        formData?.infants[index]?.dob || null
                                      } // Initial value
                                      onChange={(date) =>
                                        handleChange(
                                          "infants",
                                          index,
                                          "dob",
                                          date
                                        )
                                      } // Update on date change
                                      dateFormat="dd-MM-yyyy" // Display format
                                      className={"form-control"}
                                      minDate={infantDateRange.minDate}
                                      maxDate={infantDateRange.maxDate}
                                      placeholderText="Date of Birth"
                                      showMonthDropdown
                                      showYearDropdown
                                      dropdownMode="select"
                                    />
                                    {errors.infants[index]?.dob && (
                                      <div
                                        className="error-input"
                                        style={{ color: "red" }}
                                      >
                                        This field is required.
                                      </div>
                                    )}
                                  </Col>
                                </Row>
                              </form>
                            )
                          )}
                          <form hidden={true}>
                            <Row>
                              <Col md={6} className="form-group">
                                <Label for="inputEmail4">Email</Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="inputEmail4"
                                  onChange={() => handleEmailChange()}
                                />
                              </Col>
                              <Col md={6} className="form-group col-md-6">
                                <Label for="inputnumber">Phone no:</Label>
                                <Input
                                  type="number"
                                  className="form-control"
                                  id="inputnumber"
                                  onChange={() => handlePhoneChange()}
                                />
                              </Col>
                            </Row>
                          </form>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3} className="res-margin">
                <div className="sticky-cls-top">
                  <div className="review-section">
                    <div className="review_box">
                      <div className="title-top">
                        <h5>booking summary</h5>
                      </div>
                      <div className="flight_detail">
                        <div className="summery_box">
                          <table className="table table-borderless">
                            <tbody>

                              <tr>

                              </tr>
                            </tbody>
                          </table>
                          <div className="grand_total">
                            <h5>
                              Total Price:{" "}
                              <span>
                                {currSign}
                                {flight?.price?.total}
                              </span>
                            </h5>
                          </div>
                          <div className="continue-btn">
                            <button
                              onClick={handleApiCalls}
                              disabled={loading}
                              className="btn btn-solid"
                              type="submit"
                            >
                              continue booking
                            </button>

                            <button
                              hidden={true}
                              onClick={initiatePayment}
                              disabled={loading}
                              className="btn btn-solid"
                              type="submit"
                            >
                              continue Payment
                            </button>
                            <span>{ApiResponse}</span>
                          </div>

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </Col>
            </Row>

          </Container>
        </div>
      ) : (
        <div>
          {" "}
          <h1>No Fare Available</h1>
        </div>
      )}
    </>
  );
};

export default FlightConfirmation;

FlightConfirmation.getLayout = function getLayout(page) {
  return <FrontLayout navTheme={"light innerNav"}>{page}</FrontLayout>;
};
