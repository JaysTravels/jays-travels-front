import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import HolidayMain from "@/components/holidaysLandingPages/holidaysMainPage"


const holidays = () => {
  return (
    <>
      <Meta title="Holidays" />
      <FrontNavbar/>
      <HolidayMain/>

      <Footer/>

</>
);
};

export default holidays;