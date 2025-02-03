import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr";
import Cheapflightsasiacmpnt from "@/components/flightsLandingPages/cheapFlightsAsia"
import Image from "next/image";



const cheapFlightsAsia = () => {
  return (
    <>
      <Meta title="cheap-flights-asia" />
      <FrontNavbar/>
      <BreadcrumbSr />
    <Cheapflightsasiacmpnt/>
      <Footer/>
    </>
  );
};

export default cheapFlightsAsia;