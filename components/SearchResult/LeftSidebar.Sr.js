import { faAlignCenter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import sunrise from "@/public/images/icon/time/sunrise.png";
import sun from "@/public/images/icon/time/sun.png";
import night from "@/public/images/icon/time/night.png";
import React, { useEffect, useState } from 'react';
import ReactSlider from "react-slider";
import { Button, Input, Label } from "reactstrap";
import {useDispatch, useSelector} from 'react-redux';
import { setSelectedCarriers,setSelectedPriceRange , setSelectedFlights,setSelectedSegments,setSelectedDepartureTime,setSelectedArrivalTime } from "@/store/AvailabilitySlice";


const LeftSidebarSr = () =>  {
 
  const dispatch = useDispatch();
  //const [range, setRange] = useState([0, 100]);
  const flightResults = useSelector((state) => state?.flights?.response?.data);
  const flightRequest = useSelector((state) => state?.flights?.flights);
  const marketingCarriers = useSelector((state) => state?.flights?.marketingCarriers);
  const selectedPriceRange = useSelector((state) => state.flights?.selectedPriceRange);
  const flightMinprice = useSelector((state) => state.flights?.minPrice);
  const flightMaxprice = useSelector((state) => state.flights?.maxPrice);
  const [open, setOpen] = useState(false);
  const [openStops, setOpenStops] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openAirlines, setOpenAirlines] = useState(false);
  const [openDepTime, setOpenDepTime] = useState(false);
  const [openArrTime, setOpenArrTime] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]);
  const [selectedTimeRangesArrival, setSelectedTimeRangesArrival] = useState([]);
  const flightResultsFull = flightResults;
 
 
  const [range, setRange] = useState([flightMinprice, flightMaxprice]);
  useEffect(() => {
    
    if(selectedAirlines != null){
      const filtered = flightResults?.filter((flight) =>
        flight.itineraries.some((itinerary) =>
          itinerary.segments.some((segment) =>
            selectedAirlines.includes(segment.marketingCarrierCode)
          )
        )
     );
      setFilteredFlights(filtered);
    }  
  }, [selectedAirlines, flightResults]);

  debugger;
  useEffect(() => {
    dispatch(setSelectedPriceRange([flightMinprice, flightMaxprice]));
  }, [flightResults, dispatch])

try {
  let minPrice;
  let maxPrice;
  const prices = flightResults
    .map(flight => parseFloat(flight?.price?.grandTotal))
    .filter(price => !isNaN(price)); // Remove invalid values

  if (prices.length > 0) {
    minPrice = Math.min(...prices);
    maxPrice = Math.max(...prices);
  }
} catch (error) {
  console.error("Error calculating min/max price:", error);
}

  const isTimeInRange = (time, start, end) => {
    const timeObj = new Date(`1970-01-01T${time}:00Z`);
    const startObj = new Date(`1970-01-01T${start}:00Z`);
    const endObj = new Date(`1970-01-01T${end}:00Z`);
    return timeObj >= startObj && timeObj < endObj;
  };

  const handlePriceChange = (value) => {
    debugger;
    dispatch(setSelectedPriceRange(value));
  };

  const handleSliderChange = (value) => {
    debugger;
    setRange(value); 

    // Filter flights based on selected price range
    const newFilteredFlights = flightResultsFull.filter(flight => {
      const price = parseFloat(flight?.data?.price?.grandTotal);
      return price >= value[0] && price <= value[1]; // Check if price is within range
    });
  setFlightPrice(flightResultsFull); // Update filtered flights
  //dispatch(setSelectedPriceRange(flightResultsFull));
};
  const handleTimeRangeChange = (range,isChecked) => {   
   // debugger; 
  
    if (isChecked) {
       const updatedSelectedRanges = selectedTimeRanges.includes(range)
    ? selectedTimeRanges.filter((r) => r !== range)
    : [...selectedTimeRanges, range];
      setSelectedTimeRanges([...selectedTimeRanges, range]);
      dispatch(setSelectedDepartureTime(updatedSelectedRanges));
    } else { 
      const updatedSelectedRanges = selectedTimeRanges.filter((r) => r !== range);
      setSelectedTimeRanges(updatedSelectedRanges);
      dispatch(setSelectedDepartureTime(updatedSelectedRanges));
    }
    
  };

  const handleTimeRangeChangeArrival = (range,isChecked) => {   
   // debugger; 
  
    if (isChecked) {
       const updatedSelectedRangesArrival = selectedTimeRangesArrival.includes(range)
    ? selectedTimeRangesArrival.filter((r) => r !== range)
    : [...selectedTimeRangesArrival, range];
      setSelectedTimeRangesArrival([...selectedTimeRangesArrival, range]);
      dispatch(setSelectedArrivalTime(updatedSelectedRangesArrival));
    } else { 
      const updatedSelectedRangesArrival = selectedTimeRangesArrival.filter((r) => r !== range);
      setSelectedTimeRangesArrival(updatedSelectedRangesArrival);
      dispatch(setSelectedArrivalTime(updatedSelectedRangesArrival));
    }
    
  };

//setSelectedArrivalTime
  const handleCheckboxChange = (carrierCode) => {
  //  debugger;  
     const updatedSelectedAirlines = selectedAirlines?.includes(carrierCode)
     ? selectedAirlines.filter((code) => code !== carrierCode)
     : [...selectedAirlines, carrierCode];
     setSelectedAirlines(updatedSelectedAirlines);    
     dispatch(setSelectedCarriers(updatedSelectedAirlines)); 

  };

  const handleCheckboxChangeSameCarrier = (carrierCode) => {
    //debugger;  
     const updatedSelectedAirlines = selectedAirlines?.includes(carrierCode)
     ? selectedAirlines.filter((code) => code !== carrierCode)
     : [...selectedAirlines, carrierCode];
     setSelectedAirlines(updatedSelectedAirlines);    
     dispatch(setSelectedCarriers(updatedSelectedAirlines)); 

  };

  const handleStopFilterChange = (stopCount) => {
    debugger;
    const updatedSelectedStops = selectedStops?.includes(stopCount)
    ? selectedStops.filter((stop) => stop !== stopCount)
    : [...selectedStops, stopCount];

  setSelectedStops(updatedSelectedStops);
    dispatch(setSelectedSegments(updatedSelectedStops));
  };

  const TIME_RANGES = {
    morning: { start: "06:00", end: "12:00" },
    noon: { start: "12:00", end: "18:00" },
    evening: { start: "18:00", end: "23:59" }, // Evening until end of the day
  };

  const toggleCollapse = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const toggleCollapseStops = (e) => {
    e.preventDefault();
    setOpenStops(!openStops);
  };
  const toggleCollapsePrice = (e) => {
    e.preventDefault();
    setOpenPrice(!openPrice);
  };
  const toggleCollapseAirlines = (e) => {
    e.preventDefault();
    setOpenAirlines(!openAirlines);
  };
  const toggleCollapseDepTime = (e) => {
    e.preventDefault();
    setOpenDepTime(!openDepTime);
  };
  const toggleCollapseArrTime = (e) => {
    e.preventDefault();
    setOpenArrTime(!openArrTime);
  };

  return (
    <div className="left-sidebar">
      <div className="back-btn">back</div>
      {/* <div className="search-bar">
        <Input type="text" placeholder="Search here.." />
        <i>
          <FontAwesomeIcon icon={faSearch} />
        </i>
      </div> */}
      <div
        className={`middle-part collection-collapse-block ${
          open ? "" : "open"
        }`}
      >
        <Button
          block
          color="transparent"
          onClick={toggleCollapse}
          className="section-title collapse-block-title d-flex justify-content-between shadow-none p-0 border-0 rounded-0"
        >
          <h5>Filters</h5>         
          <FontAwesomeIcon icon={faAlignCenter} />
        </Button>
        <div
          className="collection-collapse-block-content"
          style={{
            maxHeight: open ? "0" : "1000px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <div className="filter-block">
            <div
              className={`collection-collapse-block ${openStops ? "" : "open"}`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapseStops}
              >
                stops
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openStops ? "0" : "110px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="free-d"
                      onChange={() => handleStopFilterChange(1)}
                      checked={selectedStops?.includes(1)}
                    />
                    <Label className="form-check-label" for="free-d">
                      Direct
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="time"
                      onChange={() => handleStopFilterChange(2)}
                      checked={selectedStops?.includes(2)}
                    />
                    <Label className="form-check-label" for="time">
                      1 stop
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="zara"
                      onChange={() => handleStopFilterChange(3)}
                      checked={selectedStops?.includes(3)}
                    />
                    <Label className="form-check-label" for="zara">
                      2 stop
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-block">
            <div
              className={`collection-collapse-block ${openPrice ? "" : "open"}`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapsePrice}
              >
                price
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openPrice ? "0" : "100px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="wrapper">
                  <div className="range-slider">
                   
                    <ReactSlider
                      id="range-slider"
                      className="horizontal-slider"
                      thumbClassName="example-thumb"
                      trackClassName="example-track"
                      defaultValue={range}
                      value={selectedPriceRange} 
                      min={flightMinprice}
                      max={flightMaxprice}
                      pearling
                      minDistance={0}
                      onChange={handlePriceChange}  // Dispatch on change onChange={handleSliderChange}
                      renderThumb={(props, state) => (
                        <div {...props}>{state.valueNow}</div>
                      )}
                    />
                    <p>
                      Selected range: {range[0]} - {range[1]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-block">
            <div
              className={`collection-collapse-block ${
                openAirlines ? "" : "open"
              }`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapseAirlines}
              >
                airlines
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openAirlines ? "0" : "330px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                {marketingCarriers && marketingCarriers.length > 0 ? (
                    marketingCarriers.map((carrier, index) => (
                <div className="form-check collection-filter-checkbox" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`carrier-${carrier.marketingCarrierCode}`}
                  //  onChange={() => handleCheckboxChange(carrier.marketingCarrierCode)}
                    onChange={() => {
                      handleCheckboxChange(carrier.marketingCarrierCode);                     
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`carrier-${carrier.marketingCarrierCode}`}
                  >
                    {carrier.marketingCarrierName}
                  </label>
                </div>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>

              {/* for bunch airline code */}
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openAirlines ? "0" : "330px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                <div className="form-check collection-filter-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`carrier-AllAirline`}
                    onChange={() => {
                      handleCheckboxChangeSameCarrier('same-airline');                     
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`carrier-allairlines`}
                  >
                    {'Same Carrier'}
                  </label>
                </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-block">
            <div
              className={`collection-collapse-block open ${
                openDepTime ? "" : "open"
              }`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapseDepTime}
              >
                departure time
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openDepTime ? "0" : "330px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                 <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="suomi"
                      onChange={(event) => handleTimeRangeChange("morning", event.target.checked)}
                      checked={selectedTimeRanges.includes("morning")}
                    />
                    <Label className="form-check-label" for="suomi">
                      <Image src={sunrise} className="img-fluid me-1" alt="" />{" "}
                      morning (6am to 12pm)
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="english"
                      onChange={(event) => handleTimeRangeChange("noon", event.target.checked)}
                      checked={selectedTimeRanges.includes("noon")}
                    
                    />
                    <Label className="form-check-label" for="english">
                      <Image src={sun} className="img-fluid me-1" alt="" /> noon
                      (12pm to 6pm)
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="sign"
                      onChange={(event) => handleTimeRangeChange("evening", event.target.checked)}
                      checked={selectedTimeRanges.includes("evening")}
                    />
                    <Label className="form-check-label" for="sign">
                      <Image src={night} className="img-fluid me-1" alt="" />{" "}
                      evening (after 6pm)
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="filter-block">
            <div
              className={`collection-collapse-block ${
                openArrTime ? "" : "open"
              }`}
            >
              <h6
                className="collapse-block-title"
                onClick={toggleCollapseArrTime}
              >
                arrival time
              </h6>
              <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openArrTime ? "0" : "130px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="morning"
                      onChange={(event) => handleTimeRangeChangeArrival("morning", event.target.checked)}
                      checked={selectedTimeRangesArrival.includes("morning")}
                    />
                    <Label className="form-check-label" for="morning">
                      <Image src={sunrise} className="img-fluid me-1" alt="" />{" "}
                      morning (6am to 12pm)
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="noon"
                      onChange={(event) => handleTimeRangeChangeArrival("noon", event.target.checked)}
                      checked={selectedTimeRangesArrival.includes("noon")}
                    />
                    <Label className="form-check-label" for="noon">
                      <Image src={sun} className="img-fluid me-1" alt="" /> noon
                      (12pm to 6pm)
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="evening"
                      onChange={(event) => handleTimeRangeChangeArrival("evening", event.target.checked)}
                      checked={selectedTimeRangesArrival.includes("evening")}
                    />
                    <Label className="form-check-label" for="evening">
                      <Image src={night} className="img-fluid me-1" alt="" />
                      evening (after 6pm)
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-info">
        <h5>
          <span>i</span> Need help ? Call Us
        </h5>
        <br/>
        <br/>
        <h4>0800-8101600</h4>
        {/* <h6>Mon - Fri 10am-6pm</h6>
        <h6>Sat - Sun 10am-3pm</h6> */}
      </div>
    </div>
  );
};

export default LeftSidebarSr;
