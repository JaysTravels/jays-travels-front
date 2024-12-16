import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const AutoComplete = ({ items, placeholder, className, icon }) => {
  // note: the id field is mandatory

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <div className="searchDropdown d-flex justify-content-between">
          <div id={item.id}>
            <h5 className="m-0">{item.id}</h5>
            <h5 className="m-0">{item.country}</h5>
            <h6 className="m-0">{item.destination}</h6>
          </div>

          <h4 className="m-0">{item.extension}</h4>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={`autoComplete inputGroup ${className}`}>
        <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          placeholder={placeholder}
          showIcon={false}
        />

        <div className="icon">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    </>
  );
};

export default AutoComplete;
