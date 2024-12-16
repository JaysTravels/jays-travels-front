import SearchForm from "@/components/common/Search.Form";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "reactstrap";

const SearchBarSr = () => {
  const [showClass, setShowClass] = useState(false);

  const handle = () => {
    setShowClass(!showClass);
  };
  return (
    <>
      <div className="bg-inner small-section pb-0">
        <div className="container">
          <div className="flight-search">
            <div className="responsive-detail">
              <div className="destination">
                <span>dubai</span>
                <span>
                  <i className="fas fa-long-arrow-alt-right"></i>
                </span>
                <span>paris</span>
              </div>
              <div className="details">
                <span>tue, 19-Aug-2019</span>
                <span className="divider">|</span>
                <span>2 Adults</span>
              </div>
              <div className="modify-search">
                <Button
                  color="c3"
                  className={`rounded-0 ${showClass || "show"}`}
                  onClick={handle}
                >
                  modify search
                </Button>
              </div>
            </div>
            <div className={`flight-search-detail ${showClass ? "show" : ""}`}>
              <SearchForm
                col1="2"
                col2="2"
                flightConnectingHide
                closeBtn={handle}
                showLabel
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBarSr;
