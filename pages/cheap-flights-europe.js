import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr";
import Cheapflightseuropecmpnt from "@/components/flightsLandingPages/cheapFlightsEurope"
import Image from "next/image";



const cheapFlightsEurope = () => {
  return (
    <>
      <Meta title="cheap-flights-europe" />
      <FrontNavbar/>
      <BreadcrumbSr />
    <Cheapflightseuropecmpnt/>
      <Footer/>
    </>
  );
};

export default cheapFlightsEurope;