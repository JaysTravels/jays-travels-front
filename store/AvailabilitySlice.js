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
        debugger;
       //// console.log(flightData)
        const response = await axiosInstance.post('availability', flightData);
        console.log(response.data)      
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
      },
      selectedFlight : null,
      status: 'idle',
      loading: false,
      error: null,
      response: null,
      marketingCarriers : null,
      filteredFlights: null, 
      selectedCarriers: null, 
      selectedCarriersAll : null,
      selectedSegments: null,
      selectedTime : null,
      selectedTimeArrival : null,
      selectedPriceRange: [0, 100],
      minPrice : 0,
      maxPrice : 100,
      samecarrier : false
    },
    reducers : {
        setFlights:(state,action)=> 
            {              
              state.flights = { ...state.flights, ...action.payload };              
           },
        setSelectedFlights:(state,action)=> 
            {              
              state.selectedFlight = { ...state.selectedFlight, ...action.payload };              
           },setSelectedCarriers_same(state, action) {
            debugger;
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
        setSelectedCarriers(state, action) {
          debugger;
            state.selectedCarriers = action.payload;  
            if(action.payload != null && action.payload.length > 0){
              state.filteredFlights = state.response.data.filter((flight) =>
                flight.itineraries.some((itinerary) =>
                  itinerary.segments.some((segment) =>
                    state.selectedCarriers.includes(segment.marketingCarrierCode)
                  )
                )
              );
            }else{
              state.filteredFlights = state.response.data;
            }           
    },setFlightsWithSameCarrier(state, action) {
      debugger;
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
    setSelectedSegments_v1(state, action) {
      debugger;
        state.selectedSegments = action.payload;  
        if(action.payload != null && action.payload.length > 0){       
          state.filteredFlights = state.response.data.filter((flight) =>
            flight.itineraries.some((itinerary) => {
              const segmentCount = itinerary.segments.length;
              const matchesStops = state.selectedSegments.length === 0 || state.selectedSegments.includes(segmentCount);          
              return matchesStops;
            })
          );
        }else{
          state.filteredFlights = state.response.data;
        }           
},setSelectedSegments_v2(state, action) {
  debugger;
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

      // Check if both outbound and inbound segment counts match the selectedSegments
      const outboundMatches = state.selectedSegments.includes(outboundSegmentCount);
      const inboundMatches = state.selectedSegments.includes(inboundSegmentCount);

      // Return true only if both outbound and inbound match the selectedSegments
      return outboundMatches && inboundMatches;
    });
  } else {
    // If no segment filter is selected, show all flights
    state.filteredFlights = state.response.data;
  }
},setSelectedSegments(state, action) {
  debugger;
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
            debugger;
            state.status = 'succeeded';
            state.response = action.payload;
            state.error = null;
            state.loading = false;
            state.marketingCarriers = getMarketingCarrierInfo(action.payload.data);
            state.filteredFlights = action.payload.data;
            const prices = action.payload.data
              .map(flight => parseFloat(flight?.price?.grandTotal))
              .filter(price => !isNaN(price));
            if (prices.length > 0) {
             state.minPrice =Math.round(Math.min(...prices));
             state.maxPrice = Math.round(Math.max(...prices));
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
 export const {setFlights,setSelectedFlights ,setFlightsWithSameCarrier,setSelectedCarriers,setSelectedSegments,setSelectedDepartureTime,setSelectedArrivalTime,setSelectedPriceRange} = Slice.actions;
 export default Slice.reducer;