import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr"
import Cheapflightssouthamericacmpnt from "@/components/flightsLandingPages/cheapFlightsSothAmerica"
import Image from "next/image";



const cheapFlightsSouthAmerica = () => {
  return (
    <>
      <Meta title="cheap-flights-south-america" />
      <FrontNavbar/>
      <BreadcrumbSr />
    <Cheapflightssouthamericacmpnt/>
      <Footer/>
    </>
  );
};

export default cheapFlightsSouthAmerica;