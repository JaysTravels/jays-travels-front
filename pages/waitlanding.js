import { thunk } from 'redux-thunk';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';
import { submitFlightData,setFlights,SubmitSignout } from "@/store/AvailabilitySlice";
import { useNavigate } from "react-router-dom";
import { AirLineClass } from "../components/classes/airlineclass";
import { useDispatch } from "react-redux";
import Image from "next/image";
import footerLogo from "@/public/images/footer-logo.png";
import Meta from "@/components/common/Meta";
import { Container } from "reactstrap";

export default function WaitPageLanding() {
  const router = useRouter();
  const { deptAirport, arrivalAirport, datefrom, dateTo, adults, children, infant, cabin, flightType } = router.query;
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg , setMsg] = useState("loading flights please wait...")
  const [msg2 , setMsg2] = useState("you will be shortly redirect...")
  const [apiResponse,setApiResponse] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    
    if (!deptAirport || !arrivalAirport) return;

    const fetchFlights = () => {
      try {
debugger;
        let cabinclass 
        setApiResponse('Please wait...')
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

        var flightData = { 
            origin: deptAirport ,
            destination: arrivalAirport,  
            departureDate : datefrom , 
            returnDate : dateTo , 
            adults : adults , 
            children : children , 
            infant : infant , 
            cabinClass : cabinclass , 
            flightType : flightType
         }  
     
       dispatch(submitFlightData(flightData));
       router.push('/wait');

      } catch (error) {
        console.error("Error fetching flights:", error);
        router.push('/wait');
        setApiResponse(error);  
      } finally {
       
      }
    };

    fetchFlights();
  }, [deptAirport, arrivalAirport, datefrom, dateTo, adults, children, infant, cabin, flightType]);

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
