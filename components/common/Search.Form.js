"use client"
//import AutoComplete from "@/components/common/AutoComplete";
import AutoComplete2 from "@/components/common/AutoComplete2"
import {
  faCalendar,
  faCrosshairs,
  faLocationDot,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { submitFlightData,setFlights,SubmitSignout } from "@/store/AvailabilitySlice";
import DatePicker from "react-datepicker";
import { Button, Col, Input, Label, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { useState  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PassengersQty from "./Passengers.Qty";
import { useDispatch } from "react-redux";
import { AirLineClass } from "../classes/airlineclass";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
//import { newDate } from "react-datepicker/dist/date_utils";
//import { getDate } from "react-datepicker/dist/date_utils";
  const SearchForm = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPassengers, setShowPassengers] = useState(false);  
  const [destAirport, setDestAirport] = useState(null);
  const [originAirport, setOriginAirport] = useState('London , [LON], UnitedKingdom');
  const [fromDate , setFromDate] = useState(null);
  const [toDate , setToDate] = useState(null);
  const [adults , setAdults] = useState(1);
  const [childs , setChilds] = useState(0);
  const [infants , setInfants] = useState(0);
  const [cabin,setCabin] = useState('economy');
  const [flightType , setFlightType] = useState('');
  const [selectedFlightClass, setSelectedFlightClass] = useState('economy');
  const [apiResponse,setApiResponse] = useState('');
  const dispatch = useDispatch();
 const router = useRouter();
  const flights = useSelector((state) => state.flights.flights);
  console.log(flights);
  
  const updateshowpassengerfromChild = (newValue) => {
   // debugger;
    setShowPassengers(newValue); 
  };
  
  const handlecabin = (value) =>{
    setCabin(value);
    setSelectedFlightClass(value); 
  }
  const handleFlightType = (event) => {
    
    if(event.target.checked === true){
      setFlightType('N')
    }
    else {
      setFlightType('')
    }
  };
 
  const handleGuestsChange = (counts) => {
    setGuestCounts(counts);
  };

  const handleFromDate = (fromDate) => {
    setFromDate(fromDate);
  };

  const handleToDate = (toDate) => {
    setToDate(toDate);
  };

  const handleAdults = (adults) => {
    setAdults(adults);
  };  
  const handleChild = (childs) => {
    setChilds(childs);
  };
  const handleInfant = (infants) => {
    setInfants(infants);
  };
  const handlePassengerQtyChange = (qty) => {
    setAdults(qty.valueAdult);
    setChilds(qty.valueChildren);
    setInfants(qty.valueInfants);
  };
  const handleDestAirportChange = (airport) => {
    setApiResponse('')
    setDestAirport(airport);
  };  
  const handleOriginAirportChange = (airport) => {
    setApiResponse('')
    setOriginAirport(airport);
  };  
  const handleFocus = () => {  
  
     setShowPassengers(true);   
  };
  const handleClick = () => {   
    setShowPassengers((prevState) => !prevState);
   // setShowPassengers(true); 
      
  };
 
 
  function extractAirportCode(destination) {
    const match = destination.match(/\[([A-Z]{3})\]/); 
    return match ? match[1] : null; 
  }
  const getFormattedDate = (date) => {
    
    if(date != null){
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');  
      return `${year}-${month}-${day}`;
    }
    
  };

  const isToday = (date) => {
    const today = new Date().toISOString().split('T')[0];
    const dateToCheck = date ? new Date(date).toISOString().split('T')[0] : null; 
    return dateToCheck === today;
  };
  const isStartDateGreater = (startDate, endDate) => {
    if (!startDate || !endDate) return false; 
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start > end  ; 
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;//.toISOString().split("T")[0];
  };
  const handleStartDateChange = (event) => {
    const newFromDate = event;
    setStartDate(newFromDate);
    setEndDate(addDays(newFromDate, 7));
    setApiResponse('') 
    console.log(startDate);
    console.log(endDate);
  };
 function verifydata(){  
   
   setShowPassengers(false);
    const isValid = (isToday(startDate) || isToday(endDate));
    if(isValid) {
    setApiResponse('Please provide valid from date and to date');
    return false;}

    if(destAirport === null || originAirport === null) {
      setApiResponse('Origin and Destination both are required');
      return false;}

      if (isStartDateGreater(startDate, endDate)) {
        setApiResponse("Start date is not valid");
        return false;
      }
        return true;

 }
 const DispatchData=()=>{

  if(verifydata() === false){
    return;
  }
  setApiResponse('')
  try{
    localStorage.removeItem("BookingRefNo"); 
    localStorage.removeItem("selectedFlight");    
    localStorage.removeItem("PassengerDetails");
    localStorage.removeItem("PNR_Number");
  }catch{

  }
 
let cabinclass 
setApiResponse('Search is in progress please wait...')
if (cabin.toLowerCase() === "premiumeconomy") {
  cabinclass = AirLineClass.PremiumEconomy;
}
else if (cabin.toLowerCase() === "basiceconomy") {
  cabinclass = AirLineClass.BasicEconomy;
}
else if (cabin.toLowerCase() === "economy") {
  cabinclass = AirLineClass.Economy;
}
else if (cabin.toLowerCase() === "business") {
  cabinclass = AirLineClass.Business;
}
else if (cabin.toLowerCase() === "first") {
  cabinclass = AirLineClass.First;
}
let deptAirport = extractAirportCode(originAirport);
let arrivalAirport  = extractAirportCode(destAirport);
let datefrom = getFormattedDate(startDate);
let dateTo = getFormattedDate(endDate);

try {
 
  const storedSession = localStorage.getItem("session");
  if (storedSession) {
    const jsonObject = JSON.parse(storedSession);
    const sessiondata = {
      TransactionStatusCode: jsonObject.transactionStatusCode,
      SessionId: jsonObject.sessionId,
      SequenceNumber : jsonObject.sequenceNumber,
      SecurityToken: jsonObject.securityToken
    };
    dispatch(SubmitSignout(sessiondata)).unwrap().then(()=>{
    localStorage.removeItem("session");  
   })
   
  } else {
    console.log("No session data found in localStorage");
  }
  
  
 } catch (error) {
   console.error('Error calling setFlights:', error.message);
   
 }

var flightData = { origin: deptAirport ,destination: arrivalAirport,  departureDate : datefrom , returnDate : dateTo , adults : adults , children : childs , infant : infants , cabinClass : cabinclass , flightType : flightType }
try {
  
  dispatch(setFlights(flightData));
  
 } catch (error) {
  setApiResponse(error);
   console.error('Error calling setFlights:', error.message);
   
 }
try {

  // dispatch(submitFlightData(flightData)).unwrap().then(()=>{
  //      router.push("/search-result"); 
  // })
  dispatch(submitFlightData(flightData));
  router.push('/wait');
  
 } catch (error) {
   console.log('Error api call data:', error.message);
   alert(error);
   setApiResponse('Error while search ' + error)
 }
}
  const fromItems = [
    {
      id: 0,
      country: "paris, france",
      destination: "Charles de Gaulle Airport",
      extension: "par",
    },
    {
      id: 1,
      country: "Dubai, UAE",
      destination: "Dubai International Airport",
      extension: "par",
    },
    {
      id: 2,
      country: "london",
      destination: "Heathrow",
      extension: "par",
    },
    {
      id: 3,
      country: "singapore, singapore",
      destination: "changi Airport",
      extension: "par",
    },
    {
      id: 4,
      country: "vancouver, canada",
      destination: "vancouver International Airport",
      extension: "par",
    },
    {
      id: 5,
      country: "sydney, australia",
      destination: "rose bay SPB",
      extension: "par",
    },
    {
      id: 6,
      country: "kuala lumpur, malaysia",
      destination: "sentral",
      extension: "par",
    },
  ];
  const toItems = [
    {
      id: 0,
      country: "paris, france",
      destination: "Charles de Gaulle Airport",
      extension: "par",
    },
    {
      id: 1,
      country: "Dubai, UAE",
      destination: "Dubai International Airport",
      extension: "par",
    },
    {
      id: 2,
      country: "london",
      destination: "Heathrow",
      extension: "par",
    },
    {
      id: 3,
      country: "singapore, singapore",
      destination: "changi Airport",
      extension: "par",
    },
    {
      id: 4,
      country: "vancouver, canada",
      destination: "vancouver International Airport",
      extension: "par",
    },
    {
      id: 5,
      country: "sydney, australia",
      destination: "rose bay SPB",
      extension: "par",
    },
    {
      id: 6,
      country: "kuala lumpur, malaysia",
      destination: "sentral",
      extension: "par",
    },
  ];
  return (
    <>
      <form className="searchForm">
        <Row className="g-lg-3 g-0 m-0 align-items-end">
          <Col lg={props.col1 || "12"} md={props.col1 || "12"}>
            {props.showLabel && <Label>from</Label>}          
            <AutoComplete2
              items={fromItems}
              placeholder="Form"              
              className="position-relative z-2"
              icon={faCrosshairs}     
              onAirportSelect={handleOriginAirportChange} 
              defaultText={'London , [LON], UnitedKingdom'}      
            /> 
             </Col>
          <Col lg={props.col1 || "12"} md={props.col1 || "12"}>
            {props.showLabel && <Label>to</Label>}
            <AutoComplete2
              items={toItems}
              placeholder="To"
              className="position-relative z-1"
              icon={faLocationDot}  
              onAirportSelect={handleDestAirportChange}
              defaultText={''}
            />
          </Col>
          <Col lg={props.col2 || "4"} md={props.col2 || "4"}>
            {props.showLabel && <Label>departure date</Label>}
            <div className="inputGroup">
              <DatePicker
                className=" px12 form-control rounded-0"
                selected={startDate}
                //onChange={(date) => { setStartDate(date); setApiResponse('');}}
                onChange={ handleStartDateChange}
                minDate={new Date()}
               
              />

              <div className="icon">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
          </Col>
          <Col lg={props.col2 || "4"} md={props.col2 || "4"}>
            {props.showLabel && <Label>return date</Label>}
            <div className="inputGroup">
              <DatePicker
                className=" px12 form-control rounded-0"
                selected={endDate}
                onChange={(date) => { setEndDate(date); setApiResponse('');}}
                minDate={startDate} 
              />
              <div className="icon">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
          </Col>
          <Col lg={props.col2 || "4"} md={props.col2 || "4"}>
            <div className="position-relative">
              {props.showLabel && <Label>traveller & class</Label>}
              <div className="inputGroup">
                <Input
                  type="text"
                  placeholder="Passengers"
                  className="rounded-0 " 
                  onFocus={() => handleFocus()}     
                  onClick={() => handleClick()}                     
                />
                <div className="icon" >
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>              
              {showPassengers && <PassengersQty adultsValue={adults} childsValue={childs} infantsValue={infants} selectedClassValue={selectedFlightClass} onGuestsChange={handlePassengerQtyChange}  updateshow={updateshowpassengerfromChild} parentcabin={handlecabin} />}           
             
            </div>
          </Col>
          {props.flightConnectingHide || (
            <>
              <Col lg={props.col1 || "12"} md={props.col1 || "12"}>
                <div className="flightConnecting mtLg10">
                  <Label check onClick={() => handleFlightType('')} hidden={true}>
                    <Input name="radio1" type="radio" checked={flightType === ''}/>{" "}
                    <span className="ms6">multi-city route</span>
                  </Label>
                  <Label check >
                    <Input onChange={handleFlightType} name="radio1" type="checkbox" checked={flightType === 'N'}/>{" "}
                    <span className="ms6">non stop flights</span>
                  </Label>
                </div>
              </Col>
            </>
          )}
          <Col lg={props.col1 || "12"} md={props.col1 || "12"}>
            <Button
              outline={props.btnOutline}
              color="c3"
              size="md"
              className="text-uppercase mtLg10 mt6"
              onClick={DispatchData}>
              Search Now
            </Button>
            <Label>
              <span className="ms6">{apiResponse}</span>                   
          </Label>
          </Col>
        </Row>
        <div className="responsive-close">
          <Button color="transparent" className="p-0" onClick={props.closeBtn}>
            <FontAwesomeIcon icon={faTimesCircle} />           
          </Button>        
        </div>
        
      </form>
    </>
  );
};

export default SearchForm;
