import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import footerLogo from "@/public/images/footer-logo.png";
import Meta from "@/components/common/Meta";
import { Container } from "reactstrap";

const WaitHotelsPage = () => {
  const router = useRouter();
  const results = useSelector((state) => state?.hotels?.response);
  const loading = useSelector((state) => state?.hotels?.loading);
  const hotelResults = useSelector((state) => state?.hotels?.response);
  const hotelRequest = useSelector((state) => state?.hotels?.hotels);
  const flightError = useSelector((state) => state?.hotels?.error);
  const filteredHotels = useSelector(
    (state) => state?.hotels?.filteredHotels
  );
  const appurl = process.env.NEXT_PUBLIC_APP_URL;
  const [msg, setMsg] = useState("Searching for hotels...");
  const [msg2, setMsg2] = useState(
    "Please wait while we find the best options for you."
  );
  useEffect(() => {
    debugger;
    if (!loading && results != null) {
       //("/search-result");
       router.push(`${appurl}/hotel-search-result`);
      
    } else if (!loading && flightError) {
      setMsg("No Fare found...");
      setMsg2("Some thing went wrong");
    } else {
      setMsg("Searching for hotels...");
      setMsg2("Please wait while we find the best options for you.");
    }
  }, [loading, results, router]);

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
};

export default WaitHotelsPage;
