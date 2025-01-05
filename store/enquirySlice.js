const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '@/utils/axiosInstance';

export const submitEnquiryRequest = createAsyncThunk(
    'enquiry/sendenquiry',
    async (enquiryData, { rejectWithValue }) => {
      try {
     // debugger;
      //  console.log(enquiryData)
        const response = await axiosInstance.post('enquiry/sendenquiry', enquiryData);
        console.log(response.data)      
        return response.data; 
      } catch (error) {
        
        alert(error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );   
   

const enquirySlice = createSlice({  
 
    name : 'enquiry',
    initialState : {
      enquiryRequest : null,
      status: 'idle',
      error: null,
      response: null
    },
    reducers : {
        setEnquiry:(state,action)=> 
            {     
                     
              state.enquiryRequest = { ...state.enquiryRequest, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(submitEnquiryRequest.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(submitEnquiryRequest.fulfilled, (state, action) => {
           
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.response = action.payload.data.error;
            state.error = action.payload.response;
           }
           else{
            state.status = 'succeeded';
            state.response = action.payload;
            const sessionData = action.payload.data.session;            
            state.error = null;
           }
           
          })
          .addCase(submitEnquiryRequest.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
          });
      },
    });

 export const {setEnquiry} = enquirySlice.actions;
 export default enquirySlice.reducer;