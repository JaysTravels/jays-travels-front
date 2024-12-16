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
import { setSelectedCarriers , setSelectedFlights,setSelectedSegments,setSelectedDepartureTime,setSelectedArrivalTime } from "@/store/AvailabilitySlice";


const LeftSidebarSr = () =>  {
 // debugger;
  const dispatch = useDispatch();
  const [range, setRange] = useState([0, 100]);
  const flightResults = useSelector((state) => state?.flights?.response?.data);
  const flightRequest = useSelector((state) => state?.flights?.flights);
  const marketingCarriers = useSelector((state) => state?.flights?.marketingCarriers);
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
  useEffect(() => {
   // debugger;
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

  const isTimeInRange = (time, start, end) => {
    const timeObj = new Date(`1970-01-01T${time}:00Z`);
    const startObj = new Date(`1970-01-01T${start}:00Z`);
    const endObj = new Date(`1970-01-01T${end}:00Z`);
    return timeObj >= startObj && timeObj < endObj;
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
    debugger; 
  
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
    debugger;  
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
      <div className="search-bar">
        <Input type="text" placeholder="Search here.." />
        <i>
          <FontAwesomeIcon icon={faSearch} />
        </i>
      </div>
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
          <h5>latest filter</h5>         
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
                      non stop
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
                      min={0}
                      max={100}
                      pearling
                      minDistance={0}
                      onChange={(value) => setRange(value)}
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
          <span>i</span> need help
        </h5>
        <h4>856 - 215 - 211</h4>
        <h6>Monday to Friday 9.00am - 7.30pm</h6>
      </div>
    </div>
  );
};

export default LeftSidebarSr;
