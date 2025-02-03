import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr";
import Cheapflightsamericacmpnt from "@/components/flightsLandingPages/cheapFlightsAmerica"
import Image from "next/image";



const cheapFlightsAmerica = () => {
  return (
    <>
      <Meta title="cheap-flights-america" />
      <FrontNavbar/>
      <BreadcrumbSr />
    <Cheapflightsamericacmpnt/>
      <Footer/>
    </>
  );
};

export default cheapFlightsAmerica;