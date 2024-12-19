const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import axiosInstance from '@/utils/axiosInstance';

export const submitFlightData = createAsyncThunk(
    'flights/submitFlightData',
    async (flightData, { rejectWithValue }) => {
      try { 
        //debugger;
       //// console.log(flightData)
        const response = await axiosInstance.post('availability', flightData);
      //  console.log(response.data)      
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
      selectedSegments: null,
      selectedTime : null,
      selectedTimeArrival : null
    },
    reducers : {
        setFlights:(state,action)=> 
            {              
              state.flights = { ...state.flights, ...action.payload };              
           },
        setSelectedFlights:(state,action)=> 
            {              
              state.selectedFlight = { ...state.selectedFlight, ...action.payload };              
           },
        setSelectedCarriers(state, action) {
          
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
    },
    setSelectedSegments(state, action) {
      
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
            state.status = 'succeeded';
            state.response = action.payload;
            state.error = null;
            state.loading = false;
            state.marketingCarriers = getMarketingCarrierInfo(action.payload.data);
            state.filteredFlights = action.payload.data;
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
 export const {setFlights,setSelectedFlights,setSelectedCarriers,setSelectedSegments,setSelectedDepartureTime,setSelectedArrivalTime} = Slice.actions;
 export default Slice.reducer;