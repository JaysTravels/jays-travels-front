import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
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

  useEffect(() => {   
    if (!loading && results?.data != null) {
        router.push("/search-result");
    }
  }, [loading, results, router]);

  return (
    
<div>
    
    <div style={{ textAlign: 'center', padding: '30px 50px' }}>
       <div className="footer-logo">
                      <Image src={footerLogo} alt="" className="img-fluid" />
                    </div>
                <br/>
                <br/>

      <h1>Searching for flights...</h1>
      <h5>Please wait while we find the best options for you.</h5>
    
<br/>
<br/>
<div class="waitcontainer">
		<div class="📦"></div>
		<div class="📦"></div>
		<div class="📦"></div>
		<div class="📦"></div>
		<div class="📦"></div>
	</div>
    </div>
    </div>
  );
};

export default WaitPage;