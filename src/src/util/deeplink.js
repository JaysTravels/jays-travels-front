export const generateDeepLink = (searchParams) => {
    if (!searchParams || typeof searchParams !== "object") {
      console.error("Invalid search parameters");
      return "";
    }
  
    const queryString = new URLSearchParams({
      startDate: searchParams.startDate ? searchParams.startDate.toISOString().split("T")[0] : "",
      endDate: searchParams.endDate ? searchParams.endDate.toISOString().split("T")[0] : "",
      destAirport: searchParams.destAirport || "",
      originAirport: searchParams.originAirport || "",
      fromDate: searchParams.fromDate || "",
      toDate: searchParams.toDate || "",
      adults: searchParams.adults || 1,
      childs: searchParams.childs || 0,
      infants: searchParams.infants || 0,
      cabin: searchParams.cabin || "economy",
      flightType: searchParams.flightType || "",
      selectedFlightClass: searchParams.selectedFlightClass || "economy",
    }).toString();
  
    return `${window.location.origin}/search?${queryString}`;
  };
  