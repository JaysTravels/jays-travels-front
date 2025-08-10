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
import { setSelectedBoardType,toggleStop,setCheckAll,setUnCheckAll,setSelectedPriceRange,setFlightsWithCombination , setSelectedFlights,setSelectedDepartureTime,setSelectedArrivalTime } from "@/store/hotels/HotelAvailabilitySlice";


const LeftSidebarSr = () =>  {
 
  const dispatch = useDispatch();
  //const [range, setRange] = useState([0, 100]);
  const hotelResults = useSelector((state) => state?.hotels?.response?.data);
  const hotelRequest = useSelector((state) => state?.hotels?.hotels);
 // const marketingCarriers = useSelector((state) => state?.hotels?.marketingCarriers);
  const selectedPriceRange = useSelector((state) => state.hotels?.selectedPriceRange);
  const hotelMinprice = useSelector((state) => state.hotels?.minPrice);
  const hotelMaxprice = useSelector((state) => state.hotels?.maxPrice);  
  const _filterRoom = useSelector((state) => state.hotels?.filterRoom);  
  const _filteredHotels  = useSelector((state) => state?.hotels?.filteredHotels);
  const [open, setOpen] = useState(false);
  const [openStops, setOpenStops] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openAirlines, setOpenAirlines] = useState(false);
  const [openDepTime, setOpenDepTime] = useState(false);
  const [openArrTime, setOpenArrTime] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState([]);
  const [selectedTimeRanges, setSelectedTimeRanges] = useState([]);
  const [selectedTimeRangesArrival, setSelectedTimeRangesArrival] = useState([]);
  const hotelResultsFull = hotelResults;
  const [isCombination, setIsCombination] = useState(true);
  const [SelectedMinprice,setSelectedMinprice] = useState(hotelMinprice);
  const [SelectedMaxprice,setSelectedMaxprice] = useState(hotelMaxprice);  
  const [checkedCarriers, setCheckedCarriers] = useState({});
  const [marketingCarriers , setmarketingCarriers] = useState({})
  const [isCheckAll, setIsCheckAll] = useState(false);
 const [isUncheckAll, setIsUncheckAll] = useState(false);
 const [filterRooms,setfilterRoomss] = useState(_filterRoom); 

  const [range, setRange] = useState([hotelMinprice, hotelMaxprice]);

   
  useEffect(() => {
    dispatch(setSelectedPriceRange([hotelMinprice, hotelMaxprice]));
  }, [hotelResults, dispatch])


  const isTimeInRange = (time, start, end) => {
    const timeObj = new Date(`1970-01-01T${time}:00Z`);
    const startObj = new Date(`1970-01-01T${start}:00Z`);
    const endObj = new Date(`1970-01-01T${end}:00Z`);
    return timeObj >= startObj && timeObj < endObj;
  };

   
  const handlePriceChange = (value) => {
    debugger;
    const [_minPrice, _maxPrice] = value;  
    setSelectedMinprice(_minPrice);
    setSelectedMaxprice(_maxPrice); 
    
    dispatch(setSelectedPriceRange(value));
  };

  const handleSliderChange = (value) => {
    //debugger;
    setRange(value); 

    // Filter flights based on selected price range
    const newFilteredHotels = hotelResultsFull.filter(hotel => {
      const price = parseFloat(hotel?.data?.price?.grandTotal);
      return price >= value[0] && price <= value[1]; // Check if price is within range
    });
  setFlightPrice(flightResultsFull); 
  
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


  const updateCheckedCarriers = (carrierCode) => {
    setCheckedCarriers((prevState) => ({
        ...prevState,
        [carrierCode]: true, // Add carrierCode if it doesn't exist
    }));
};


  const handleCheckboxChangeSameCarrier = async (isChecked) => {
    //debugger;
    setIsCombination(isChecked); 
    isChecked = !isChecked
    const selectedCarriers = Object.keys(checkedCarriers).filter(
      (carrier) => checkedCarriers[carrier] 
    );

   // await  dispatch(setSelectedCarriers({ selectedCarriers, isCombination: isChecked }));
     dispatch(setSelectedCarriers({ selectedCarriers, isCombination: isChecked }));
     dispatch(setFlightsWithCombination({isSameCarrier: isChecked,selectedCarriers: selectedCarriers}));
   // debugger;
    const _filterAirline = [
      ...new Set(
        _filteredFlights.flatMap((flight) =>
          flight.itineraries.flatMap((itinerary) =>
            itinerary.segments.map((segment) => segment.marketingCarrierCode)
          )
        )
      ),
    ];
    if(_filterAirline != null ){
      setCheckedCarriers(_filterAirline.reduce((acc, code) => ({ ...acc, [code]: true }), {}));
     
     }
  };

  const handleBoardTypeFilterChange = (stopCount,isChecked) => {
    debugger;
    let updatedBoardType = isChecked
    ? [...selectedBoard, stopCount]
    : selectedBoard.filter((stop) => stop !== stopCount)

    setSelectedBoard(updatedBoardType);   
    dispatch(setSelectedBoardType({ selectedBoardType: updatedBoardType , isChecked : isChecked}));    
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
  //debugger;
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
                Board Type
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
                      onChange={(e) => handleBoardTypeFilterChange('RO', e.target.checked)}
                      checked={selectedBoard?.includes('RO')}
                    />
                    <Label className="form-check-label" for="free-d">
                      Room Only
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="time"
                      onChange={(e) => handleBoardTypeFilterChange('BB', e.target.checked)}
                      checked={selectedBoard?.includes('BB')}
                    />
                    <Label className="form-check-label" for="time">
                      Bed & Breakfast
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="zara"
                      onChange={(e) => handleBoardTypeFilterChange('HB', e.target.checked)}
                      checked={selectedBoard?.includes('HB')}
                    />
                    <Label className="form-check-label" for="zara">
                     Half Board
                    </Label>
                  </div>
                  <div className="form-check collection-filter-checkbox">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="zara"
                      onChange={(e) => handleBoardTypeFilterChange('FB', e.target.checked)}
                      checked={selectedBoard?.includes('FB')}
                    />
                    <Label className="form-check-label" for="zara">
                     Full Board
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
                      min={hotelMinprice}
                      max={hotelMaxprice}
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
          
          <div className="filter-block" style={{ display: 'none' }} >
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
          <div className="filter-block" style={{ display: 'none' }}>
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
