import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from "next/image";
import footerLogo from "@/public/images/footer-logo.png";

const WaitPage = () => {
  const router = useRouter();
  const  results  = useSelector((state) => state?.flights?.response);
  const  loading  = useSelector((state) => state?.flights?.loading);
  const flightResults = useSelector((state) => state?.flights?.response);
  const flightRequest = useSelector((state) => state?.flights?.flights);
  const flightError = useSelector((state) => state?.flights?.error);
  const filteredFlights  = useSelector((state) => state?.flights?.filteredFlights);
  const  [msg,setMsg] =useState('Searching for flights...');
  const [msg2 , setMsg2] = useState('Please wait while we find the best options for you.');
  useEffect(() => {  
    debugger; 
    if (!loading && results?.data != null) {
       router.push("/search-result");
    }
    else  if (!loading && flightError) {
      setMsg('No Fare found...')
      setMsg2('Some thing went wrong')
  }
    else{
      setMsg('Searching for flights...')
      setMsg2('Please wait while we find the best options for you.')
    }
  }, [loading, results, router]);
     
    return (
      <div className='waitpge.body'>
          
          <div style={{ textAlign: 'center', padding: '30px 50px' }}>
             <div className="footer-logo">
                            <Image src={footerLogo} alt="" className="img-fluid" />
                          </div>
                      <br/>
                      <br/>
            
            <h1>{msg}</h1>
            <h5>{msg2}</h5>          
      <br/>
      <br/>
      
            <div className="waitpge.container">
          <div className="waitpge.📦"></div>
          <div className="waitpge.📦"></div>
          <div className="waitpge.📦"></div>
          <div className="waitpge.📦"></div>
          <div className="waitpge.📦"></div>
        </div>
          </div>
          </div>
        );


 
};

export default WaitPage;