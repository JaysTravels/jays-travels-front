import { faAlignCenter, faL, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import sunrise from "@/public/images/icon/time/sunrise.png";
import sun from "@/public/images/icon/time/sun.png";
import night from "@/public/images/icon/time/night.png";
import React, { use, useEffect, useState } from 'react';
import ReactSlider from "react-slider";
import { Button, Input, Label } from "reactstrap";
import {useDispatch, useSelector} from 'react-redux';
import { setSelectedCarriers,setCheckAll,setUnCheckAll,setSelectedCarriersExclude,setSelectedPriceRange,setFlightsWithCombination , setSelectedFlights,setSelectedSegments,setSelectedDepartureTime,setSelectedArrivalTime } from "@/store/AvailabilitySlice";


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
  const [isCombination, setIsCombination] = useState(true);
  const [SelectedMinprice,setSelectedMinprice] = useState(flightMinprice);
  const [SelectedMaxprice,setSelectedMaxprice] = useState(flightMaxprice);  
  const [checkedCarriers, setCheckedCarriers] = useState({});
  const [isCheckAll, setIsCheckAll] = useState(false);
const [isUncheckAll, setIsUncheckAll] = useState(false);

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

  //debugger;
  useEffect(() => {
    dispatch(setSelectedPriceRange([flightMinprice, flightMaxprice]));
  }, [flightResults, dispatch])

  useEffect(() => {
    if (marketingCarriers && marketingCarriers.length > 0) {
      const initialCheckedState = {};
      marketingCarriers.forEach((carrier) => {
        initialCheckedState[carrier.marketingCarrierCode] = true;
      });
      setCheckedCarriers(initialCheckedState);
    }
  }, [marketingCarriers]);

  const isTimeInRange = (time, start, end) => {
    const timeObj = new Date(`1970-01-01T${time}:00Z`);
    const startObj = new Date(`1970-01-01T${start}:00Z`);
    const endObj = new Date(`1970-01-01T${end}:00Z`);
    return timeObj >= startObj && timeObj < endObj;
  };

  const handlePriceChange = (value) => {
    //debugger;
    const [_minPrice, _maxPrice] = value;  
    setSelectedMinprice(_minPrice);
    setSelectedMaxprice(_maxPrice); 
    
    dispatch(setSelectedPriceRange(value));
  };

  const handleSliderChange = (value) => {
    //debugger;
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
  
  const checkedAirlines = Object.keys(checkedCarriers).filter(
    (carrierCode) => checkedCarriers[carrierCode] // Only keep those with `true`
  );

  const handleCheckboxChange = (carrierCode, isChecked) => {
    debugger;
    setCheckedCarriers((prevState) => ({
      ...prevState,
      [carrierCode]: isChecked, // Update checked state
    }));
  
    const checkedAirlines = Object.keys(checkedCarriers).filter(
      (carrierCode) => checkedCarriers[carrierCode] // Only keep those with `true`
    );
    const newCheckedCarriers = {};
  marketingCarriers.forEach((carrier) => {
    newCheckedCarriers[carrier.marketingCarrierCode] = isChecked;
  });
    // Update selected airlines list
    const updatedSelectedAirlines = isChecked
      ? [...selectedAirlines, carrierCode]
      : selectedAirlines.filter((code) => code !== carrierCode);
 
    setSelectedAirlines(updatedSelectedAirlines);  
    dispatch(setSelectedCarriers({ selectedCarriers: updatedSelectedAirlines, isCombination :isCombination,isChecked :isChecked }));
 
 
  
  
  
   // dispatch(setSelectedCarriers(updatedSelectedAirlines));
   
    //dispatch(setSelectedCarriers({ filter: filterType, payload: updatedSelectedAirlines }));
  };

  const handleCheckboxChangeold = (carrierCode, isChecked) => {
   debugger;  
   
 
   if(isChecked){
    const updatedSelectedAirlines = selectedAirlines?.includes(carrierCode)
    ? selectedAirlines.filter((code) => code !== carrierCode)
    : [...selectedAirlines, carrierCode];
    setSelectedAirlines(updatedSelectedAirlines,isChecked); 
    const filterType = updatedSelectedAirlines.length > 0 ? "exclude" : "include";   
    dispatch(setSelectedCarriers({ filter: filterType, payload: updatedSelectedAirlines }));
    setCheckedCarriers((prevState) => ({
     ...prevState,
     [carrierCode]: !prevState[carrierCode],
   }));
   }
   else{
    const updatedSelectedAirlines = selectedAirlines?.includes(!carrierCode)
    ? selectedAirlines.filter((code) => code !== carrierCode)
    : [...selectedAirlines, carrierCode];
    setSelectedAirlines(updatedSelectedAirlines,isChecked);
    const filterType = updatedSelectedAirlines.length > 1 ? "exclude" : "include";       
    dispatch(setSelectedCarriersExclude(updatedSelectedAirlines)); 
    setCheckedCarriers((prevState) => ({
     ...prevState,
     [carrierCode]: !prevState[carrierCode],
   }));
   }
 
  };

  const handleCheckboxChangeSameCarrier = (isChecked) => {
       
    //setIsCombination(!isCombination); // Toggle the state
    setIsCombination(isChecked); // Update state when checkbox is clicked
    const selectedCarriers = Object.keys(checkedCarriers).filter(
      (carrier) => checkedCarriers[carrier] // Get only checked airlines
    );
    dispatch(setSelectedCarriers({ selectedCarriers, isCombination: isChecked }));

    dispatch(setFlightsWithCombination(isChecked));
  };

  const handleStopFilterChange = (stopCount,isChecked) => {
    
    let updatedStops = isChecked
    ? [...selectedStops, stopCount]
    : selectedStops.filter((stop) => stop !== stopCount)

    setSelectedStops(updatedStops);
    dispatch(setSelectedSegments({ selectedStops: updatedStops, selectedCarriers }));    
  };

  const handleStopFilterChange_old = (stopCount,isChecked) => {
    
    let updatedStops;

    if (isChecked) {
      // If the checkbox is checked, add the stop type to the selectedStops array
      updatedStops = [...selectedStops, stopCount];
    } else {
      // If the checkbox is unchecked, remove the stop type from the selectedStops array
      updatedStops = selectedStops.filter((stop) => stop !== stopCount);
    }
    const updatedSelectedStops = selectedStops?.includes(stopCount)
    ? selectedStops.filter((stop) => stop !== stopCount)
    : [...selectedStops, stopCount];

  setSelectedStops(updatedSelectedStops,isChecked);
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

  // Function to handle 'Check All'
const handleCheckAllChange = (isChecked) => {
  debugger;
  setIsCheckAll(isChecked);
  const newCheckedCarriers = {};
  marketingCarriers.forEach((carrier) => {
    newCheckedCarriers[carrier.marketingCarrierCode] = isChecked;
  });
  setCheckedCarriers(newCheckedCarriers);
  setCheckAll(isChecked);
  dispatch(setCheckAll(isChecked));
  if(isChecked){
    setIsUncheckAll(false);    
  }

 
};

// Function to handle 'Uncheck All'
const handleUncheckAllChange = (isChecked) => {
  const newCheckedCarriers = {};
  marketingCarriers.forEach((carrier) => {
    newCheckedCarriers[carrier.marketingCarrierCode] = !isChecked;
  });
  setCheckedCarriers(newCheckedCarriers);
  if(isChecked){
      setIsCheckAll(false);
      setIsCombination(false); 
      dispatch(setUnCheckAll());
    
  }
};
  return (
    <div className="left-sidebar border rounded-3">
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
            maxHeight: open ? "0" : "",
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
                      onChange={(e) => handleStopFilterChange(1, e.target.checked)}
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
                      onChange={(e) => handleStopFilterChange(2, e.target.checked)}
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
                      onChange={(e) => handleStopFilterChange(3, e.target.checked)}
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
                     <p className="price-filter" style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      padding: "5px 10px" // Adds padding inside the p
                    }}></p>
                    <p className="price-filter" style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>£{SelectedMinprice}</span>
                    <span>£{SelectedMaxprice}</span>
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
                  maxHeight: openAirlines ? "0" : "",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                 {/* Check All and Uncheck All checkboxes */}
                 {marketingCarriers && marketingCarriers?.length > 1 && (
                  <div className="form-check collection-filter-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="check-all"
                    checked={Object.values(checkedCarriers).every(Boolean)} // Check if all carriers are checked
                    onChange={(e) => handleCheckAllChange(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="check-all">
                    Check All
                  </label>
                </div>

                 )}
            
            {marketingCarriers && marketingCarriers?.length > 1 && ( 
                    <div className="form-check collection-filter-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="uncheck-all"
                      checked={Object.values(checkedCarriers).every((checked) => !checked)} // Check if all carriers are unchecked
                      onChange={(e) => handleUncheckAllChange(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="uncheck-all">
                      Uncheck All
                    </label>
                  </div>

            )}
    
                {marketingCarriers && marketingCarriers.length > 0 ? (
                    marketingCarriers.map((carrier, index) => (
                <div className="form-check collection-filter-checkbox" key={index}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`carrier-${carrier.marketingCarrierCode}`}
                    checked={checkedCarriers[carrier.marketingCarrierCode] || false}                  
                    onChange={(e) => handleCheckboxChange(carrier.marketingCarrierCode, e.target.checked)}
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
                <div
                className="collection-collapse-block-content"
                style={{
                  maxHeight: openAirlines ? "0" : "",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  paddingBottom: "0",
                }}
              >
                <div className="collection-brand-filter">
                {marketingCarriers && marketingCarriers.length > 1 && (
                    <div className="form-check collection-filter-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`carrier-allairlines`}
                      checked={isCombination}
                      onChange={(e) => handleCheckboxChangeSameCarrier(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`carrier-allairlines`}
                    >
                      {'Airlines Combinations'}
                    </label>
                    </div>

                )}
               
                </div>
              </div>
              </div>

              {/* for bunch airline code */}
             
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
