import Image from "next/image";
import adjust from "@/public/images/icon/adjust.png";
import Link from "next/link";
import TopbarFlightSr from "@/components/SearchResult/TopbarFlight.Sr";
import HotelResultsSr from "@/components/hotels/HotelResults.Sr";

const HotelRightContentSr = () => {
  return (
    <>
      <Link href="javascript:void(0)" className="mobile-filter border-top-0">
        <h5>latest filter</h5>
        <Image src={adjust} className="img-fluid" alt="" />
      </Link>

      {/* <TopbarFlightSr /> */}

      <HotelResultsSr />
    </>
  );
};

export default HotelRightContentSr;
