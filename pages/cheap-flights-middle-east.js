import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr";
import Cheapflightsmiddleeastcmpnt from "@/components/flightsLandingPages/cheapFlightsMiddleEast"
import Image from "next/image";



const cheapFlightsMiddleEast = () => {
  return (
    <>
      <Meta title="cheap-flights-middle-east" />
      <FrontNavbar/>
      <BreadcrumbSr />
    <Cheapflightsmiddleeastcmpnt/>
      <Footer/>
    </>
  );
};

export default cheapFlightsMiddleEast;