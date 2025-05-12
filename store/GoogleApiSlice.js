const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '@/utils/axiosInstance';

export const getGoogleDeeplink = createAsyncThunk(
    'GoogleFlights/GetFlight',
    async (deeplinkdata, { rejectWithValue }) => {
      try {
    debugger;
       console.log(deeplinkdata)       
        const response = await axiosInstance.get('GoogleFlights/GetFlight?flightId='+deeplinkdata);
        
        console.log(response.data)      
        return response.data; 
      } catch (error) {        
        alert(error.error);
        return rejectWithValue(error?.data || 'Server Error');
        
      }
    }
  );   
   
export const getGoogleFlightResult = createAsyncThunk(
    'GoogleFlights/GetFlightResult',
    async (deeplinkdata, { rejectWithValue }) => {
      try {
    
       console.log(deeplinkdata)       
        const response = await axiosInstance.get('GoogleFlights/GetFlightResult?flightId='+deeplinkdata);
        console.log(response.data)      
        return response.data; 
      } catch (error) {        
        alert(error.error);
        return rejectWithValue(error?.data || 'Server Error');
        
      }
    }
  );  

const GoogleDeeplinkSlice = createSlice({  
 
    name : 'googledeeplink',
    initialState : {
      googledeeplinkrequest : null,
      status: 'idle',
      error: null,
      response: null,
      loading : null,
      googleFlightResult : null,
    },
    reducers : {
        setGoogleDeeplink:(state,action)=> 
            {     
                     
              state.googledeeplinkrequest = { ...state.googledeeplinkrequest, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(getGoogleDeeplink.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
          })
          .addCase(getGoogleDeeplink.fulfilled, (state, action) => {
       
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
           }
           
          })
          .addCase(getGoogleDeeplink.rejected, (state, action) => { 
            state.status = 'failed';
            state.error = action.payload;
            state.loading = false;
          })
           .addCase(getGoogleFlightResult.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
          })
          .addCase(getGoogleFlightResult.fulfilled, (state, action) => {
       
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.googleFlightResult = action.payload.data.error;
            state.error = action.payload.response;
            state.loading = false;
           }
           else{
           
            state.status = 'succeeded';
            state.googleFlightResult = action.payload;                    
            state.error = null;
            state.loading = false;
           }
           
          })
          .addCase(getGoogleFlightResult.rejected, (state, action) => { 
            state.status = 'failed';
            state.error = action.payload;
            state.loading = false;
          });
      },
    });

 export const {setGoogleDeeplink} = GoogleDeeplinkSlice.actions;
 export default GoogleDeeplinkSlice.reducer;