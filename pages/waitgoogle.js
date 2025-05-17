import { thunk } from 'redux-thunk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';
import { getGoogleDeeplink,setGoogleDeeplink,getGoogleFlightResult} from "@/store/GoogleApiSlice";
import { setFlights,setFlightResults } from "@/store/AvailabilitySlice";
import { useNavigate } from "react-router-dom";
import { AirLineClass } from "../components/classes/airlineclass";
import { submitairSellRequest, setAirSell } from "@/store/AirSellSlice";
import { useDispatch,useSelector } from "react-redux";
import Image from "next/image";
import footerLogo from "@/public/images/footer-logo.png";
import Meta from "@/components/common/Meta";
import { Container } from "reactstrap";

export default function WaitPageGoogle() {
  const router = useRouter();
  //const { origin, destination, datefrom, dateTo, adults, children, infant, cabin, flightType,airline } = router.query;
  const [flights2, setFlights2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg , setMsg] = useState("Searching for flights...")
  const [msg2 , setMsg2] = useState("Please wait while we find the best options for you.")
  const [apiResponse,setApiResponse] = useState('');
  const dispatch = useDispatch();
  const deepLinkFlight = useSelector((state) => state?.googledeeplink?.response);
  const flightList = useSelector((state) => state?.googledeeplink?.googleFlightResult);
  const flightRequest = useSelector((state) => state?.flights?.flights);

  useEffect(() => {
    if (router.isReady) {      
      const allQueryParams = router.query;      
      const {google_redirectid,DeparturingFrom,Goingto,DeparturingDate,ReturnDate,JourneyType,
        flightType, CabinClass, adult, child,infant,totPassenger,flightResults, Airline,ChildAges,
        Infanttype,flight, price,airline
      } = allQueryParams;

 const fetchDeeplink = async () => {
    try {
      const data2 = await dispatch(getGoogleDeeplink(flight)).unwrap();     
    } catch (err) {
      console.error('Failed:', err.message);
    }
  };
let fResults;
const fetchGoogleFlightResults = async () => {
  try {
    
    const fResults = await dispatch(getGoogleFlightResult(flightResults)).unwrap();
    //debugger;
     dispatch(setFlightResults(fResults));
  } catch (err) {
    console.error('Failed:', err.message);
  }
};
 let isOneWay = false;
 if(JourneyType !== "Return"){ isOneWay = true;}
var flightData = { origin: DeparturingFrom ,destination: Goingto,  departureDate : DeparturingDate , returnDate : ReturnDate , adults : adult , children : child , infant : infant , cabinClass : CabinClass , flightType : flightType , oneWay : isOneWay}
try {
  
  dispatch(setFlights(flightData));
  
 } catch (error) {
  setApiResponse(error);
   console.error('Error calling setFlights:', error.message);
   
 }

      if (flight){
        if(deepLinkFlight == null) {fetchDeeplink();}
        if(flightList == null){   fetchGoogleFlightResults(); }
    
      } 
      
         const AirSellFlights = () => {
        try {           
            const AirSellRequset = getAirSellRequest();
             
            try { dispatch(setAirSell(AirSellRequset));          
              } catch (error) { console.error('Error calling setAirSell:', error.message); }
    
              dispatch(submitairSellRequest(AirSellRequset)).unwrap().then(() => {
                router.push("/en-gb/flight-confirmation");
        
              })
  
        } catch (error) {
          console.error("Error fetching flights:", error);
          router.push('https://jaystravels.co.uk/en-gb');
          setApiResponse(error);  
        } finally {
         
        }
      };
  function convertToDateFormat(dateString) {
    if (dateString != null) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}${month}${year}`;
    }

  }
      function getAirSellRequest(){
              let flight = deepLinkFlight.data;
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
         if(JourneyType === "Return"){
     
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
               origin: DeparturingFrom,
               destination: Goingto,
               segmentInformation: {
                 travelProductInformation: travelProductInformationOutBound,
               },
             },
             inBound: {
               origin: Goingto,
               destination: DeparturingFrom,
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
               origin: DeparturingFrom,
               destination: Goingto,
               segmentInformation: {
                 travelProductInformation: travelProductInformationOutBound,
               },
             },        
           };
         }
        
         return flightData;
       }
       if(fResults != null){
        debugger;
        //dispatch(setFlightResults(fResults)); 
       }
        if(deepLinkFlight != null){         
          debugger;
        AirSellFlights();
        }
    
    }

 

       
  }, [router.isReady,dispatch,deepLinkFlight]);

  return (
    <>
      <Meta title="Wait..." />
      <Container>
        <div className="waitpge">
          <div>
            <div className="footer-logo mb40">
              <Image src={footerLogo} alt="" className="img-fluid" />
            </div>

            <h1>{msg}</h1>
            <h5>{msg2}</h5>

            <div className="waitpge-container">
              <div className="waitpge.📦"></div>
              <div className="waitpge.📦"></div>
              <div className="waitpge.📦"></div>
              <div className="waitpge.📦"></div>
              <div className="waitpge.📦"></div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
