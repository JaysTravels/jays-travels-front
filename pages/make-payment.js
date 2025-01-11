import Meta from "@/components/common/Meta"
import Footer from "@/components/footers/Front.Footer"
import FrontNavbar from "@/components/navbars/Front.Navbar"
import MakePayment from "@/components/manualPayment/make.payment"
import Image from "next/image";
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr";


const makePaymentPage = () => {
  return (
    <>
      <Meta title="Make A Payment" />
      <FrontNavbar/>
      <BreadcrumbSr />
     <MakePayment/>

  <Footer/>

    </>
  );
};

export default makePaymentPage;