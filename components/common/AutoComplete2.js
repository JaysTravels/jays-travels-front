import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import airportsData from "@/src/util/AirportNames.json";

const AirportSearch = ({ placeholder, className, icon ,onAirportSelect,defaultText }) => {
 // debugger;
    const [items, setItems] = useState([])
    const [destAirport, setDestAirport] = useState('')
    const [originAirport, setOriginAirport] = useState('')
    const [defText, setDefText] = useState(defaultText);
    const handleAirportChange = (airport) => {
      setDestAirport(airport);
      onAirportSelect(airport); 
    };
  
    useEffect(() => {
       
        const processedData = airportsData.map((airport, index) => ({
        
          id: index,
          name: airport.AirportName.split(',')[0] + ',' + airport.AirportName.split(',')[2] + ','+ airport.AirportName.split(',')[1]+','+airport.AirportName.split(',')[3]
        }))
        setItems(processedData)
      }, [])
      const handleOnFocus = () => {
        console.log("Focused");
      };
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result);
      };
      const handleOnSearch = (string, results) => {
            console.log(string, results);
      };
     
      const handleOnSelect = (item) => {
       
      // item.name = item.name.split(',')[0] + ' ,' + item.name.split(',')[3] + ' ['+ item.name.split(',')[1]+'], '+item.name.split(',')[2];
      item.name = item.name.split(',')[0] + ' , ['+ item.name.split(',')[1]+'], '+item.name.split(',')[2];
        const formattedName = (
            <>
                <span>
                {`${item.name}`}
            </span>
            </>
          )
               
         // setSelectedAirport(formattedName)
         handleAirportChange(`${item.name}`)
         
      }
    
      const formatResult = (item) => {
       
        const [city, code,country,airport] = item.name.split(',')
        const formattedName = `${city} (${code}), ${country}, ${airport}`
        return (
          <span> {/*  {`${city} , ${airport} [${code}], ${country}  `}*/}
         {`${city} , [${code}], ${country}  `}
            </span> 
        )
      }

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
          maxResults={7}
          inputSearchString={defText || ""}
          showNoResults={false}
        />

        <div className="icon">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    </>
  );
};
export default AirportSearch;
