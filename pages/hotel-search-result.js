import Meta from "@/components/common/Meta";
import FrontLayout from "@/components/layouts/Front.Layout";
import HotelBreadcrumbSr from "@/components/hotels/HotelBreadcrumb.Sr";
import HotelContentSr from "@/components/hotels/HotelContent.Sr";
import SearchBarSr from "@/components/SearchResult/SearchBar.Sr";
import { Breadcrumb } from "reactstrap";

const HotelSearchResult = () => {
  return (
    <>
      <Meta title="Hotel Search Result" />
      <HotelBreadcrumbSr />
      <SearchBarSr />
      <HotelContentSr />
    </>
  );
};

export default HotelSearchResult;

// SearchResult.getLayout = function getLayout(page) {
//   return <FrontLayout navTheme={"light innerNav"}>{page}</FrontLayout>;
// };
