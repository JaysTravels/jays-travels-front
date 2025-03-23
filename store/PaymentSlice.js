const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '@/utils/axiosInstance';
export const getPaymentPage = createAsyncThunk(
    'payments/getPaymentPage',
    async (paymentData, { rejectWithValue }) => {
      try {
      //debugger;
        const response = await axiosInstance.post('payment/generate', paymentData);          
        return response.data; 
      } catch (error) {        
        alert(error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );   

const PaymentSlice = createSlice({  
 
    name : 'payment',
    initialState : {     
      paymentRequest: {
        OrderId : "Jys-123",
        Amount: "183.0",
        Currency: "GBP",
        Language : "en_US"
      },
      status: 'idle',
      payment_Error: null,
      payment_response: null
    },
    reducers : {
        setPayment:(state,action)=> 
            {                       
              state.paymentRequest = { ...state.paymentRequest, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(getPaymentPage.pending, (state) => {
           // debugger;
            state.status = 'loading';
          })
          .addCase(getPaymentPage.fulfilled, (state, action) => {
          // debugger;
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.payment_response = action.payload.data.error;
            state.payment_Error = action.payload.data;
           }
           else{
            state.status = 'succeeded';
            state.payment_response = action.payload.data;          
            state.payment_Error = null;
           }
           
          })
          .addCase(getPaymentPage.rejected, (state, action) => {
            //debugger;
            state.status = 'failed';
            state.payment_Error = action.payload;
          });
      },
    });

 export const {setPayment} = PaymentSlice.actions;
 export default PaymentSlice.reducer;