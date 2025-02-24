const generateDeepLink = (searchParams) => {
    debugger;
    const queryString = new URLSearchParams({
      startDate: searchParams.startDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      endDate: searchParams.endDate.toISOString().split("T")[0],
      destAirport: searchParams.destAirport || "",
      originAirport: searchParams.originAirport,
      fromDate: searchParams.fromDate || "",
      toDate: searchParams.toDate || "",
      adults: searchParams.adults,
      childs: searchParams.childs,
      infants: searchParams.infants,
      cabin: searchParams.cabin,
      flightType: searchParams.flightType || "",
      selectedFlightClass: searchParams.selectedFlightClass,
    }).toString();
  
    return `${window.location.origin}/search?${queryString}`;
  };
  
  // Example usage:
  const searchParams = {
    startDate: new Date(),
    endDate: new Date(),
    destAirport: "JFK",
    originAirport: "London , (LON), United Kingdom",
    fromDate: "2025-09-09",
    toDate: "2025-09-04",
    adults: 2,
    childs: 1,
    infants: 0,
    cabin: "economy",
    flightType: "round-trip",
    selectedFlightClass: "business",
  };
  
  const deepLink = generateDeepLink(searchParams);
  console.log(deepLink); 
  // Example Output: "http://yourdomain.com/search?startDate=2025-09-09&endDate=2025-09-04&destAirport=JFK&originAirport=London%20,%20(LON),%20United%20Kingdom&adults=2&childs=1&infants=0&cabin=economy&flightType=round-trip&selectedFlightClass=business"
  