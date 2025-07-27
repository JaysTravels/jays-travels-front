"use client"
//import AutoComplete from "@/components/common/AutoComplete";
 import AutoComplete3 from "@/components/common/AutoCompleteHotel"
import {
  faCalendar,
  faCrosshairs,
  faLocationDot,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { submitHotelData,setHotels,setHotelsResults,setRoom,setSelectedHotels } from "@/store/hotels/HotelAvailabilitySlice";
import DatePicker from "react-datepicker";
import { Button, Col, Input, Label, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PassengersQty from "./Passengers.Qty";
import RoomsQty from "./Rooms.Qty";
import { useDispatch } from "react-redux";
import { AirLineClass } from "../classes/airlineclass";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
  const SearchForm = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPassengers, setShowPassengers] = useState(false);  
  const [passengerPlaceholder,setPassengerPlaceholder] = useState("Passengers");
  const [showRooms, setShowRooms] = useState(false);  
  const [roomPlaceholder,setRoomPlaceholder] = useState("Rooms");
 // const [originAirport, setoriginAirport] = useState(null);
   const [destAirport, setDestAirport] = useState(null);
  const [fromDate , setFromDate] = useState(null);
  const [toDate , setToDate] = useState(null);
  const [adults , setAdults] = useState(1);
  const [rooms, setRooms] = useState(1); // stores number
  const [roomCount, setRoomCount] = useState(1); // stores number
  const [valueRooms, setvalueRooms] = useState('1 Room');
  const [childs , setChilds] = useState(0);
  const [infants , setInfants] = useState(0);
  const [apiResponse,setApiResponse] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
 const router = useRouter();
 const passengerQtyRef = useRef(null);
  const flights = useSelector((state) => state.flights.flights);
  const passengerRef = useRef(null);
  const formRef = useRef(null);
  const appurl = process.env.NEXT_PUBLIC_APP_URL;
  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleTogglePassenger = () => {
    
    setShowPassengers(!isVisible); 
    setIsVisible(!isVisible);
  };

  const handleOutsideClick = (event) => {
    if (passengerRef.current && !passengerRef.current.contains(event.target)) {
      setShowPassengers(false); // Hide the component if clicked outside
    }
  };

const handleChangeRooms = (e) => {
  const inputValue = e.target.value;
  if (inputValue === '') {
    setRoomCount('');
    setvalueRooms('');
    return;
  }
  const newValue = Number(inputValue);
  //debugger;
  if (!isNaN(newValue) && newValue > 0) {
    setRoomCount(newValue);
    setvalueRooms(newValue === 1 ? '1 Room' : `${newValue} Rooms`);
  }
};
 
  const updateshowpassengerfromChild = (newValue) => {
   // debugger;
      setShowPassengers(newValue); 
  };
   const updateshowroomfromChild = (newValue) => {
    //debugger;
      setShowRooms(newValue); 
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
    const handleRoomsQtyChange = (qty) => {
    //debugger;
    var p = "";
    if (!isNaN(qty.valueRooms) && qty.valueRooms > 0) {
    setRoomCount(qty.valueRooms);
    setvalueRooms(qty.valueRooms === 1 ? '1 Room' : `${qty.valueRooms} Rooms`);  }
    //setRoomCount(qty.valueRooms);
    p = qty.valueRooms === 1 ? '1 Room' : `${qty.valueRooms} Rooms`;
    setRoomPlaceholder(p);
  };

  const handlePassengerQtyChange = (qty) => {
      var p = "";
    setAdults(qty.valueAdult);
    setChilds(qty.valueChildren);
    setInfants(qty.valueInfants);
    { p = qty.valueAdult + " Adt "}
    if(qty.valueChildren !=0){
      { p = p + "," + qty.valueChildren + " Chd "}
    }
    if(qty.valueInfants !=0){
      { p = p + "," + qty.valueInfants + " Inf"}
    }
    setPassengerPlaceholder(p);
  };
  const handleDestAirportChange = (airport) => {
    //debugger;
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
   const handleFocusRooms = () => {  
  
     setShowRooms(true);   
  };
  const handleClick = () => {   
    setShowPassengers((prevState) => !prevState);
   // setShowPassengers(true); 
      
  };
   const handleClickRoom = () => {   
    setShowRooms((prevState) => !prevState);
     
  };
  //
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowPassengers(false);
    }else if (passengerQtyRef.current && !passengerQtyRef.current.contains(event.target)) {
      setShowPassengers(false);
    }
  };
 
 
  function extractAirportCode(destination) {
   // const match = destination.match(/\[([A-Z]{3})\]/); 
    const match = destination.match(/\(([^)]+)\)/);
    
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
  };
 function verifydata(){  
   //debugger;
   setShowPassengers(false);
   setShowRooms(false);
    const isValid = (isToday(startDate) || isToday(endDate));
    if(isValid) {
    setApiResponse('Please provide valid date');
    return false;}  

      if (isStartDateGreater(startDate, endDate)) {
        setApiResponse("Start date is not valid");
        return false;
      }
        return true;

 }
 const DispatchData=()=>{
//debugger;
  if(verifydata() === false){
    return;
  }
  setApiResponse('')
  try{
    localStorage.removeItem("BookingRefNo"); 
    localStorage.removeItem("selectedFlight");    
    localStorage.removeItem("PassengerDetails");
    localStorage.removeItem("PNR_Number");
  }catch{}
 
let _destAirport = extractAirportCode(destAirport);

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
    
    localStorage.removeItem("session");  
      
  } else {
    console.log("No session data found in localStorage");
  }
  
  
 } catch (error) {
   console.error('Error calling setFlights:', error.message);
   
 }

var hotelData = { 
    stay: {
         checkIn: datefrom,
         checkOut: dateTo
    },
    occupancies: [
            {
            rooms: rooms,
            adults: adults,
            children: childs
            }
        ],
        destination: {
            code: _destAirport
        },
         filter: {
            maxHotels: 50
        },  
      }
try {
  
  dispatch(setHotels(hotelData));
  
 } catch (error) {
  setApiResponse(error);
   console.error('Error calling setFlights:', error.message);
   
 }
try {

  
  dispatch(submitHotelData(hotelData));
debugger;
 router.push(`${appurl}/waithotels`);
  
 } catch (error) {
   console.log('Error api call data:', error.message);
   setApiResponse('Error while search ' + error)
 }
}

  return (
    <>
      <form className="searchForm" ref={formRef}>
        <Row className="g-lg-3 g-0 m-0 align-items-end">
          <Col lg={props.col1 || "6"} md={props.col1 || "12"}>
            {props.showLabel && <Label>Destination</Label>}          
             <AutoComplete3
              font-family={'nunito'}
              placeholder="Destination"              
              className="position-relative z-2"
              icon={faCrosshairs} 
              defaultText={''}
              onAirportSelect={handleDestAirportChange}                 
            /> 
             </Col>
          <Col lg={props.col1 || "6"} md={props.col1 || "12"}>
            {props.showLabel && <Label>Rooms</Label>}
              <div className="inputGroup">
                <Input
                  type="text"
                  placeholder= {roomPlaceholder}
                  className="rounded-0 " 
                  onFocus={() => handleFocusRooms()}     
                  onClick={() => handleClickRoom()}                     
                />
                <div className="icon" >
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
              {showRooms && <RoomsQty  roomsValue={rooms} onGuestsChangeRoom={handleRoomsQtyChange}  updateshowRoom={updateshowroomfromChild} />}           
                        
          </Col>
          <Col lg={props.col2 || "4"} md={props.col2 || "4"}>
            {props.showLabel && <Label>departure date</Label>}
            <div className="inputGroup">
              <DatePicker
                className=" px12 form-control rounded-0"
                selected={startDate}
                dateFormat="dd/MM/yyyy"
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
                 dateFormat="dd/MM/yyyy"
              />                
              <div className="icon">
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
          </Col>
          <Col lg={props.col2 || "4"} md={props.col2 || "4"}>
            <div className="position-relative" >
              {props.showLabel && <Label>traveller</Label>}
              <div className="inputGroup">
                <Input
                  type="text"
                  placeholder= {passengerPlaceholder}
                  className="rounded-0 " 
                  onFocus={() => handleFocus()}     
                  onClick={() => handleClick()}                     
                />
                <div className="icon" >
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </div>
              {showPassengers && <PassengersQty  adultsValue={adults} childsValue={childs} infantsValue={infants} onGuestsChange={handlePassengerQtyChange}  updateshow={updateshowpassengerfromChild} />}           
              </div>
          </Col>
          <Col lg={props.col1 || "12"} md={props.col1 || "12"}>
            <Button
              outline={props.btnOutline}
              color="c3"
              size="md"
              className="text-uppercase mtLg10 mt6"
              onClick={DispatchData}>
             {props.searchButtonText != null ? props.searchButtonText : "Modify Searches"} 
            </Button>
          </Col>
          <Label>
              <span className="ms6">{apiResponse}</span>                   
          </Label>
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
