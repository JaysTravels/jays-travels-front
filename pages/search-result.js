import Meta from "@/components/common/Meta";
import FrontLayout from "@/components/layouts/Front.Layout";
import BreadcrumbSr from "@/components/SearchResult/Breadcrumb.Sr";
import ContentSr from "@/components/SearchResult/Content.Sr";
import SearchBarSr from "@/components/SearchResult/SearchBar.Sr";
import { Breadcrumb } from "reactstrap";

const SearchResult = () => {
  return (
    <>
      <Meta title="Search result" />
      <BreadcrumbSr />
      <SearchBarSr />
      <ContentSr />
    </>
  );
};

export default SearchResult;

SearchResult.getLayout = function getLayout(page) {
  return <FrontLayout navTheme={"light innerNav"}>{page}</FrontLayout>;
};
