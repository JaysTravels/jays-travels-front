import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { use, useEffect, useState } from 'react';

const WaitPage = () => {
  const router = useRouter();
  const  results  = useSelector((state) => state?.flights?.response);
  const  loading  = useSelector((state) => state?.flights?.loading);
  const flightResults = useSelector((state) => state?.flights?.response);
  const flightRequest = useSelector((state) => state?.flights?.flights);
  const flightError = useSelector((state) => state?.flights?.error);
  const filteredFlights  = useSelector((state) => state?.flights?.filteredFlights);
  const [error,SetError] = useState(null);

  useEffect(() => {   
    if (!loading && results?.data != null) {
        router.push("/search-result");
    }
    else if(flightError != null){
      SetError(flightResults)
    }
  }, [loading, results, router]);

  if(loading){
    return (
   
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Searching for flights...</h1>
        <h5>Please wait while we find the best options for you.</h5>       
      </div>
    );
  }
  else if(!loading && flightError != null){
    return (
   
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>No Fare Found</h1>
        <h5>{error}</h5>
      </div>
    );
  }

};

export default WaitPage;