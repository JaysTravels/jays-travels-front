const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { faL } from '@fortawesome/free-solid-svg-icons';

export const submitFlightData = createAsyncThunk(
    'flights/submitFlightData',
    async (flightData, { rejectWithValue }) => {
      try { 
     // debugger;
     //   console.log(flightData)
        const response = await axiosInstance.post('availability', flightData);
        console.log(response)      
        return response.data; 
      } catch (error) {
        console.log(error?.data)
      return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );

  export const SubmitSignout = createAsyncThunk(
    'flights/SubmitSignout',
    async (singoutRequest, { rejectWithValue }) => {
      try {
       // console.log(singoutRequest)
        const response = await axiosInstance.post('availability/signout', singoutRequest);
        // console.log(response.data)      
        return response.data; 
      } catch (error) {        
        console.log(error);
      }
    }
  );
  
 const Slice = createSlice({  
 
    name : 'flights',
    initialState : {     
      flights: {
        origin: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        adults: '',
        children : '',
        infant: '',
        cabinClass: '',
        flightType: '',   
        oneWay: false    
      },
      selectedFlight : null,
      status: 'idle',
      loading: false,
      error: null,
      response: null,
      marketingCarriers : null,
      filteredFlights: null, 
      selectedCarriers: null, 
      selectedCarriersExclude: null, 
      selectedCarriersAll : null,
      selectedSegments: [],
      selectedTime : null,
      selectedTimeArrival : null,
      selectedPriceRange: [0, 100],
      minPrice : 0,
      maxPrice : 100,
      samecarrier : false,
      selectedAirline : '',
      selectedStops: [],
      filterAirline: null
    },
    reducers : {
        setFlights:(state,action)=> 
            {              
              state.flights = { ...state.flights, ...action.payload };              
           },
           setFlightResults:(state,action)=> 
            {   
              state.response =  action.payload.data ;              
           },
           setAirline:(state,action)=> 
            {    
              state.selectedAirline = action.payload;           
           },
        setSelectedFlights:(state,action)=> 
            {              
              state.selectedFlight = { ...state.selectedFlight, ...action.payload };              
           },setSelectedCarriers_same(state, action) {
            //debugger;
            state.selectedCarriers = action.payload;
          
            if (action.payload != null && action.payload.length > 0) {
              state.filteredFlights = state.response.data.filter((flight) => {
                const itineraries = flight.itineraries;
          
                // Assume the first itinerary is outbound and the second is inbound
                const outboundItinerary = itineraries[0];
                const inboundItinerary = itineraries[1];
          
                if (!outboundItinerary || !inboundItinerary) {
                  // If either outbound or inbound itinerary is missing, exclude the flight
                  return false;
                }
          
                // Get all marketingCarrierCodes for outbound and inbound segments
                const outboundCarriers = outboundItinerary.segments.map(
                  (segment) => segment.marketingCarrierCode
                );
                const inboundCarriers = inboundItinerary.segments.map(
                  (segment) => segment.marketingCarrierCode
                );
          
                // Check if ALL selected carriers are present in both outbound and inbound
                const allSelectedInOutbound = state.selectedCarriers.every((carrier) =>
                  outboundCarriers.includes(carrier)
                );
                const allSelectedInInbound = state.selectedCarriers.every((carrier) =>
                  inboundCarriers.includes(carrier)
                );
          
                // Return true only if ALL selected carriers are in both outbound and inbound
                return allSelectedInOutbound && allSelectedInInbound;
              });
            } else {
              // If no carriers are selected, show all flights
              state.filteredFlights = state.response.data;
            }
          },
          setSelectedCarriersExclude(state, action) {
           // debugger;
              state.selectedCarriersExclude = action.payload;  
              if(action.payload != null && action.payload.length > 0){
                state.filteredFlights = state.response.data.filter((flight) =>
                  flight.itineraries.every((itinerary) =>
                    itinerary.segments.every((segment) =>
                      !state.selectedCarriersExclude.includes(segment.marketingCarrierCode)
                    )
                  )
                );
              }else{
                state.filteredFlights = state.response.data;
               
              }           
      },setSelectedCarriers(state, action) {
        debugger;
        //const selectedCarriers = action.payload; // The selected airline codes
        const { selectedCarriers, isCombination,isChecked } = action.payload;
        // Store selected carriers
        state.selectedCarriers = selectedCarriers; //action.payload;
      
        // If no carriers are selected, show all flights
        if(isChecked){
          if (!selectedCarriers || selectedCarriers.length === 0) {
            state.filteredFlights = state.response.data;
            return;
          }
        }
       
        if (isCombination) {
          //  Show flights where any segment contains a selected airline
          state.filteredFlights = state.response.data.filter((flight) =>
            flight.itineraries.some((itinerary) =>
              itinerary.segments.some((segment) =>
                selectedCarriers.includes(segment.marketingCarrierCode)
              )
            )
          );
        } else {
          //  Show only flights where both inbound & outbound have the same airline
          state.filteredFlights = state.response.data.filter((flight) =>
            flight.itineraries.length === 2 && // Ensure round-trip flights
            flight.itineraries.every((itinerary) =>
              itinerary.segments.every((segment) =>
                selectedCarriers.includes(segment.marketingCarrierCode) // Same carrier for all segments
              )
            ) &&
            flight.itineraries[0].segments[0].marketingCarrierCode ===
            flight.itineraries[1].segments[0].marketingCarrierCode // Ensure both directions use the same carrier
          );
        }       
      },
        setSelectedCarriers_old(state, action) {
         // debugger;
          const filter = action.payload.filter;
          const { payload } = action.payload; // Extract type and payload from action 
            state.selectedCarriers = action.payload;  
            if(payload != null && filter === "include"){ 
              if(payload.length == 0){
                state.filteredFlights = state.response.data; return;
              }             
                state.filteredFlights = state.response.data.filter((flight) =>
                  flight.itineraries.some((itinerary) =>
                    itinerary.segments.some((segment) =>                   
                Array.isArray(payload) && payload.includes(segment.marketingCarrierCode)
                    )
                  )
                );
              } else if (filter === "exclude") {
                if(payload.length == 0){
                  state.filteredFlights = state.response.data; return;
                }   
                state.filteredFlights = state.response.data.filter((flight) =>
                  !flight.itineraries.some((itinerary) =>
                    itinerary.segments.some((segment) =>
                   
                Array.isArray(payload) && payload.includes(segment.marketingCarrierCode)
                    )
                  )
                );
              }
            else {
              state.filteredFlights = state.response.data;
            }

            //   state.filteredFlights = state.response.data.filter((flight) =>
            //     flight.itineraries.some((itinerary) =>
            //       itinerary.segments.some((segment) =>
            //         state.selectedCarriers.includes(segment.marketingCarrierCode)
            //       )
            //     )
            //   );
            // }else{
            //  state.filteredFlights = state.response.data;
            
            // }           
    },setFlightsWithCombination(state, action) {
     //debugger;
      //const isDifferentCarrier = action.payload;    
      const { isSameCarrier, selectedCarriers } = action.payload;
      if (!isSameCarrier && selectedCarriers?.length == 0) {       
          state.filteredFlights = state.response.data;
          return;   
      }    
      let sameAirline = isSameCarrier;
      state.filteredFlights = state.response.data.filter((flight) => {
        const itineraries = flight.itineraries;
      
        // Ensure we have both outbound and inbound itineraries
        if (itineraries.length < 2) {
          return false;
        }
      
        const outboundItinerary = itineraries.find(
          (itinerary) => itinerary.segment_type === 'OutBound'
        );
        const inboundItinerary = itineraries.find(
          (itinerary) => itinerary.segment_type === 'InBound'
        );
      
        // If outbound or inbound itineraries are missing, exclude the flight
        if (!outboundItinerary || !inboundItinerary) {
          return false;
        }
      
        // Get all marketing carrier codes for outbound and inbound
        const outboundCarriers = new Set(
          outboundItinerary.segments.map((segment) => segment.marketingCarrierCode)
        );
        const inboundCarriers = new Set(
          inboundItinerary.segments.map((segment) => segment.marketingCarrierCode)
        );
      
        // Check if sameAirline condition is enabled
        if (sameAirline) {
          // Ensure at least one common carrier exists in both outbound and inbound
          const hasCommonCarrier = [...outboundCarriers].some((carrier) =>
            inboundCarriers.has(carrier)
          );
          return hasCommonCarrier;
        } else {
          // Ensure all carriers in outbound are different from inbound
          const hasDifferentCarriers = [...outboundCarriers].every(
            (carrier) => !inboundCarriers.has(carrier)
          );
          return hasDifferentCarriers;
        }
      });
      debugger;
      const _filterAirline = [
        ...new Set(
          state.filteredFlights.flatMap((flight) =>
            flight.itineraries.flatMap((itinerary) =>
              itinerary.segments.map((segment) => segment.marketingCarrierCode)
            )
          )
        ),
      ];
      state.filterAirline = _filterAirline
    }    
    ,setFlightsWithCombination_old(state, action) {
      debugger;
      const isDifferentCarrier = action.payload;
    
      if (!isDifferentCarrier) {
        state.filteredFlights = state.response.data;
        return;
      }
    
      state.filteredFlights = state.response.data.filter((flight) => {
        const itineraries = flight.itineraries;
    
        // Ensure we have both outbound and inbound itineraries
        if (itineraries.length < 2) {
          return false;
        }
    
        const outboundItinerary = itineraries[0];
        const inboundItinerary = itineraries[1];
    
        // Get all marketing carrier codes for outbound and inbound
        const outboundCarriers = new Set(
          outboundItinerary.segments.map((segment) => segment.marketingCarrierCode)
        );
        const inboundCarriers = new Set(
          inboundItinerary.segments.map((segment) => segment.marketingCarrierCode)
        );
    
        // Ensure outbound and inbound have at least one different carrier
        const hasDifferentCarriers = [...outboundCarriers].some(
          (carrier) => !inboundCarriers.has(carrier)
        );
    
        return hasDifferentCarriers;
      });
    }    
    ,
    setFlightsWithCombination_sameairline(state, action) {
     // debugger;
      const isSameCarrier = action.payload;
      if(isSameCarrier == false){
        state.filteredFlights = state.response.data;
        return;
      }
      state.filteredFlights = state.response.data.filter((flight) => {
        const itineraries = flight.itineraries;
    
        // Assume the first itinerary is outbound and the second is inbound
        const outboundItinerary = itineraries[0];
        const inboundItinerary = itineraries[1];
    
        if (!outboundItinerary || !inboundItinerary) {
          // If either outbound or inbound itinerary is missing, exclude the flight
          return false;
        }
    
        // Get all marketingCarrierCodes for outbound and inbound segments
        const outboundCarriers = outboundItinerary.segments.map(
          (segment) => segment.marketingCarrierCode
        );
        const inboundCarriers = inboundItinerary.segments.map(
          (segment) => segment.marketingCarrierCode
        );
    
        // Check if there is any common marketingCarrierCode between outbound and inbound
        const hasCommonCarrier = outboundCarriers.some((carrier) =>
          inboundCarriers.includes(carrier)
        );
    
        // Return true if there is at least one common carrier
        return hasCommonCarrier;
      });
    },
    setCheckAll(state, action) {
      state.filteredFlights = state.response.data;
      const isChecked = action.payload ?? false; // Default to false if undefined
    if (isChecked) {
        state.filteredFlights = state.response.data; // Set all flights
    } else {
        state.filteredFlights = []; // Clear flights
    }
                  
},
setUnCheckAll(state, action) {
  //debugger;
   state.filteredFlights = [];
   state.selectedAirline = '';
             
},setSelectedSegments(state, action) {
 // debugger;
  state.selectedSegments = Array.isArray(action.payload.selectedStops) ? action.payload.selectedStops : [];
  
  if (state.selectedSegments.length > 0) {
    // Filter flights based on selectedSegments
    state.filteredFlights = state.response.data.filter((flight) => {
      const itineraries = flight.itineraries;
      if (!itineraries || itineraries.length < 2) return false; // Ensure there are itineraries

      const outboundSegmentCount = itineraries[0]?.segments?.length || 0;
      const inboundSegmentCount = itineraries[1]?.segments?.length || 0;

      // Ensure selectedSegments is an array before using includes
      const outboundMatches = state.selectedSegments.includes(outboundSegmentCount);
      const inboundMatches = state.selectedSegments.includes(inboundSegmentCount);

      return outboundMatches && inboundMatches;
    });
  } else {
    // If no segment filter is selected, show all flights
    state.filteredFlights = state.response.data;
  }
},
setSelectedSegments_old(state, action) {
  debugger;
  state.selectedSegments = action.payload; // Update selectedSegments with the payload
  let stops = state.Stops;
  if (action.payload != null) {
    // Filter flights based on selectedSegments
    state.filteredFlights = state.response.data.filter((flight) => {
      const itineraries = flight.itineraries;

      // Assume the first itinerary is outbound and the second is inbound
      const outboundItinerary = itineraries[0];
      const inboundItinerary = itineraries[1];

      // Check if both outbound and inbound itineraries exist
      if (!outboundItinerary || !inboundItinerary) {
        return false; // Exclude flights with missing itineraries
      }

      // Get segment counts for outbound and inbound
      const outboundSegmentCount = outboundItinerary.segments.length;
      const inboundSegmentCount = inboundItinerary.segments.length;

      // Check if both outbound and inbound segment counts are in selectedSegments
      const outboundMatches = state.selectedSegments.includes(outboundSegmentCount);
      const inboundMatches = state.selectedSegments.includes(inboundSegmentCount);

      // Return true only if both outbound and inbound match the selectedSegments
      return outboundMatches && inboundMatches;
    });
  } else {
    // If no segment filter is selected, show all flights
    state.filteredFlights = state.response.data;
  }
},
  setSelectedSegments_old(state, action) {
  //debugger;
  state.selectedSegments = action.payload; // Update selectedSegments with the payload

  if (action.payload != null && action.payload.length > 0) {
    // Filter flights based on selectedSegments
    state.filteredFlights = state.response.data.filter((flight) => {
      const itineraries = flight.itineraries;

      // Assume the first itinerary is outbound and the second is inbound
      const outboundItinerary = itineraries[0];
      const inboundItinerary = itineraries[1];

      // Check if both outbound and inbound itineraries exist
      if (!outboundItinerary || !inboundItinerary) {
        return false; // Exclude flights with missing itineraries
      }

      // Get segment counts for outbound and inbound
      const outboundSegmentCount = outboundItinerary.segments.length;
      const inboundSegmentCount = inboundItinerary.segments.length;

      // Check if both outbound and inbound segment counts are in selectedSegments
      const outboundMatches = state.selectedSegments.includes(outboundSegmentCount);
      const inboundMatches = state.selectedSegments.includes(inboundSegmentCount);

      // Return true only if both outbound and inbound match the selectedSegments
      return outboundMatches && inboundMatches;
    });
  } else {
    // If no segment filter is selected, show all flights
    state.filteredFlights = state.response.data;
  }
},
setSelectedDepartureTime(state, action) {   
 // debugger;
  state.selectedTime = action.payload;  
  if(action.payload != null && action.payload.length > 0){   
    let selectedTime = action.payload
    const TIME_RANGES_SELECTED = {
      morning: { start: "06:00", end: "12:00" },
      noon: { start: "12:00", end: "18:00" },
      evening: { start: "18:00", end: "23:59" }, // Evening until end of the day
    };

    if (!selectedTime.includes("morning")) {
      delete TIME_RANGES_SELECTED.morning;
    } 
    if (!selectedTime.includes("noon")) {
      delete TIME_RANGES_SELECTED.noon;
    }  
    if (!selectedTime.includes("evening")) {
      delete TIME_RANGES_SELECTED.evening;
    }   
    var testFlight= [];
    state.filteredFlights = state.response.data.filter((flight) =>
      flight.itineraries.some((itinerary) =>
        itinerary.segments.some((segment) => {         
          const departureTime = segment.departure.at.split("T")[1].substring(0, 5);          
          return selectedTime.some((range) => {
            const { start, end } = TIME_RANGES[range];
            var departurevalid = isTimeInRange(departureTime, start, end);
            if(departurevalid ){             
              const plainFlight = JSON.parse(JSON.stringify(flight)); 
              testFlight.push(plainFlight)}
            return isTimeInRange(departureTime, start, end);
          });
        })      
    ))
    if(testFlight.length> 0){state.filteredFlights = testFlight }
   
  }else{
    state.filteredFlights = state.response.data;
  }           
},
setSelectedPriceRange(state, action) {
  //debugger;
  try{
    state.selectedPriceRange = action.payload;
    const [minPrice, maxPrice] = action.payload;
  
    state.filteredFlights = state.response.data.filter((flight) => {
      const price = parseFloat(flight?.price?.grandTotal);
      return price >= minPrice && price <= maxPrice;
    });
  }catch{
          state.filteredFlights = state?.response?.data;  
  }
},

setSelectedArrivalTime(state, action) {  
 // debugger; 
  state.selectedTimeArrival = action.payload;  
  if(action.payload != null && action.payload.length > 0){   
    let selectedTime = action.payload
    const TIME_RANGES_SELECTED = {
      morning: { start: "06:00", end: "12:00" },
      noon: { start: "12:00", end: "18:00" },
      evening: { start: "18:00", end: "23:59" }, // Evening until end of the day
    };

    if (!selectedTime.includes("morning")) {
      delete TIME_RANGES_SELECTED.morning;
    } 
    if (!selectedTime.includes("noon")) {
      delete TIME_RANGES_SELECTED.noon;
    }  
    if (!selectedTime.includes("evening")) {
      delete TIME_RANGES_SELECTED.evening;
    }   
    var testFlight= [];
    state.filteredFlights = state.response.data.filter((flight) =>
      flight.itineraries.some((itinerary) =>
        itinerary.segments.some((segment) => {         
          const arrivalTime = segment.arrival.at.split("T")[1].substring(0, 5);          
          return selectedTime.some((range) => {
            const { start, end } = TIME_RANGES[range];
            var isvalid = isTimeInRange(arrivalTime, start, end);
            if(isvalid ){             
              const plainFlight = JSON.parse(JSON.stringify(flight)); 
              testFlight.push(plainFlight)}
            return isTimeInRange(arrivalTime, start, end);
          });
        })      
    ))
    if(testFlight.length> 0){state.filteredFlights = testFlight }
   
  }else{
    state.filteredFlights = state.response.data;
  }           
},
      },
      extraReducers: (builder) => {
        builder
          .addCase(submitFlightData.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
          })
          .addCase(submitFlightData.fulfilled, (state, action) => {
         // debugger;
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.response = action.payload.data.error;
            state.error = action.payload.response;
            state.loading = false;
           }
           else{
            //debugger;
            if (state.selectedAirline != '') {
              const selectedAirlineUpper = state.selectedAirline.toUpperCase();
              action.payload.data = action?.payload?.data.filter((flight) =>
                flight.itineraries.every((itinerary) =>
                  itinerary.segments.every((segment) =>
                    segment.marketingCarrierCode === selectedAirlineUpper
                  )
                )
              );
              state.selectedAirline = ''
            }

            state.status = 'succeeded';
            state.response = action?.payload;
            state.error = null;
            state.loading = false;
            state.filteredFlights = action?.payload?.data;
            state.marketingCarriers = getMarketingCarrierInfo(action?.payload?.data);
            
            const prices = action?.payload?.data
              .map(flight => parseFloat(flight?.price?.grandTotal))
              .filter(price => !isNaN(price));
            if (prices.length > 0) {
             state.minPrice =Math.round(Math.min(...prices)) -1;
             state.maxPrice = Math.round(Math.max(...prices))+1;
            }
            
           }
            
          })
          .addCase(submitFlightData.rejected, (state, action) => {
            state.status = 'failed';
            state.loading = false;
            state.error = action.payload;
          });
      },
    });

    const TIME_RANGES = {
      morning: { start: "06:00", end: "12:00" },
      noon: { start: "12:00", end: "18:00" },
      evening: { start: "18:00", end: "23:59" }, // Evening until end of the day
    };

    const isTimeInRange = (time, start, end) => {     
      const parseTimeToMinutes = (t) => {
        const [hours, minutes] = t.split(":").map(Number);
        return hours * 60 + minutes;
      };
    
      const timeMinutes = parseTimeToMinutes(time);
      const startMinutes = parseTimeToMinutes(start);
      const endMinutes = parseTimeToMinutes(end);  
      var res =    timeMinutes >= startMinutes && timeMinutes <= endMinutes;
      return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
    };
  
    const getMarketingCarrierInfo = (data) => {
      const marketingCarriers = [];
    try{
      data.forEach((flight) => {
        flight.itineraries.forEach((itinerary) => {
          itinerary.segments.forEach((segment) => {
            marketingCarriers.push({
              marketingCarrierCode: segment.marketingCarrierCode,
              marketingCarrierName: segment.marketingCarrierName,
            });
          });
        });      
      });

      const uniqueCarriers = Array.from(
        new Map(
          marketingCarriers.map((item) => [
            item.marketingCarrierCode,
            item,
          ])
        ).values()
      );
    
      return uniqueCarriers;
    }catch(error){
    }
    return marketingCarriers;
    }
 export const {setFlights,setFlightResults,setAirline,setSelectedFlights,setCheckAll,setUnCheckAll ,setFlightsWithCombination,setSelectedCarriers,setSelectedCarriersExclude,setSelectedSegments,setSelectedDepartureTime,setSelectedArrivalTime,setSelectedPriceRange} = Slice.actions;
 export default Slice.reducer;