import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr";
import Cheapflightssouthasiacmpnt from "@/components/flightsLandingPages/cheapFlightsSouthAsia"
import Image from "next/image";



const cheapFlightsSouthAsia = () => {
  return (
    <>
      <Meta title="cheap-flights-south-asia" />
      <FrontNavbar/>
      <BreadcrumbSr />
    <Cheapflightssouthasiacmpnt/>
      <Footer/>
    </>
  );
};

export default cheapFlightsSouthAsia;