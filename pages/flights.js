import Meta from "@/components/common/Meta";
import FrontNavbar from "@/components/navbars/Front.Navbar"
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr";
import SearchBarSr from "@/components/SearchResult/SearchBar.Sr";
import Footer from "@/components/footers/Front.Footer"

const flights = () => {
  return (
    <>
      <Meta title="Flights" />
      <FrontNavbar/>
      <BreadcrumbSr />
      <SearchBarSr />
      <Footer/>
    </>
  );
};

export default flights;
