import { thunk } from 'redux-thunk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';
import { submitFlightData,setFlights,setAirline,SubmitSignout } from "@/store/AvailabilitySlice";
import { useNavigate } from "react-router-dom";
import { AirLineClass } from "../components/classes/airlineclass";
import { useDispatch } from "react-redux";
import Image from "next/image";
import footerLogo from "@/public/images/footer-logo.png";
import Meta from "@/components/common/Meta";
import { Container } from "reactstrap";

export default function WaitPageLanding() {
  const router = useRouter();
  const { origin, destination, datefrom, dateTo, adults, children, infant, cabin, flightType,airline } = router.query;
  const [flights2, setFlights2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg , setMsg] = useState("loading flights please wait...")
  const [msg2 , setMsg2] = useState("Please wait while we find the best options for you.")
  const [apiResponse,setApiResponse] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    
    if (!origin || !destination) return;

    const fetchFlights = () => {
      try {
debugger;
       
        let cabinclass 
        setApiResponse('Please wait...')
        if (cabin?.toLowerCase() === "premiumeconomy") {
          cabinclass = AirLineClass.PremiumEconomy;
        }
        else if (cabin?.toLowerCase() === "basiceconomy") {
          cabinclass = AirLineClass.BasicEconomy;
        }
        else if (cabin?.toLowerCase() === "economy") {
          cabinclass = AirLineClass.Economy;
        }
        else if (cabin?.toLowerCase() === "business") {
          cabinclass = AirLineClass.Business;
        }
        else if (cabin?.toLowerCase() === "first") {
          cabinclass = AirLineClass.First;
        }
        else {
          cabinclass = AirLineClass.Economy;
        }
       let children1 ; let infant1; let flighttype1;
        if(children == undefined) {children1 = 0;} else {children1 = children}
        if(infant == undefined) {infant1 = 0;}else {infant = infant1}
       if(flightType == undefined) {flighttype1 = ''}else {flighttype1 = flightType}
        var flightData = { 
            origin : origin,
            destination: destination,  
            departureDate : datefrom , 
            returnDate : dateTo , 
            adults : adults , 
            children : children ?? 0, 
            infant : infant ?? 0, 
            cabinClass : cabinclass?? 0 , 
            flightType : flightType ?? ""
         }  
       
       if(airline != undefined){       
        dispatch(setAirline(airline));
       }
          
     // var flightData = { origin: origin ,destination: destination,  departureDate : datefrom , returnDate : dateTo , adults : adults , children : childs , infant : infant , cabinClass : cabinclass , flightType : flightType }
      const flightData2 = { 
        origin: origin, 
        destination: destination, 
        departureDate: datefrom, 
        returnDate: dateTo, 
        adults: adults, 
        children: children1, 
        infant: infant1, 
        cabinClass: cabinclass, 
        flightType: flighttype1
      };

      try {
  
  dispatch(setFlights(flightData2));
  
 } catch (error) {
  setApiResponse(error);
   console.error('Error calling setFlights:', error.message);
   
 }

       dispatch(submitFlightData(flightData));
       router.push('/wait');

      } catch (error) {
        console.error("Error fetching flights:", error);
        router.push('https://jaystravels.co.uk');
        setApiResponse(error);  
      } finally {
       
      }
    };

    fetchFlights();
  }, [origin, destination, datefrom, dateTo, adults, children, infant, cabin, flightType]);

  // return (
  //   <div>
  //     <h1>loading flights please wait...</h1>
  //     {loading && <p>Loading flights...</p>}
  //     {error && <p style={{ color: 'red' }}>{error}</p>}      
  //   </div>
  // );

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
