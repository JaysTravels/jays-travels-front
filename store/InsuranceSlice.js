const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '@/utils/axiosInstance';

export const submitInsuranceRequest = createAsyncThunk(
    'Insurance/sendinsurance',
    async (insuranceData, { rejectWithValue }) => {
      try {
     // debugger;
      //  console.log(enquiryData)
        const response = await axiosInstance.post('insurance/sendinsurance', insuranceData);
        console.log(response.data)      
        return response.data; 
      } catch (error) {
        
        alert(error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );   
   

const insuranceSlice = createSlice({  
 
    name : 'insurance',
    initialState : {
      insuranceRequest : null,
      status: 'idle',
      error: null,
      response: null
    },
    reducers : {
        setInsurance:(state,action)=> 
            {     
                     
              state.insuranceRequest = { ...state.insuranceRequest, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(submitInsuranceRequest.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(submitInsuranceRequest.fulfilled, (state, action) => {
           
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.response = action.payload.data.error;
            state.error = action.payload.response;
           }
           else{
            state.status = 'succeeded';
            state.response = action.payload;
           // const sessionData = action.payload.data.session;            
            state.error = null;
           }
           
          })
          .addCase(submitInsuranceRequest.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      },
    });

 export const {setInsurance} = insuranceSlice.actions;
 export default insuranceSlice.reducer;