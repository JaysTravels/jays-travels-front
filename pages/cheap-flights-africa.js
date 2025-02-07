import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr";
import Cheapflightsafricacmpnt from "@/components/flightsLandingPages/cheapFlightsAfrica"
import Image from "next/image";



const cheapFlightsAfrica = () => {
  return (
    <>
      <Meta title="cheap-flights-africa" />
      <FrontNavbar/>
      <BreadcrumbSr />
    <Cheapflightsafricacmpnt/>
      <Footer/>
    </>
  );
};

export default cheapFlightsAfrica;