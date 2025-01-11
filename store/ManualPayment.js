const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '@/utils/axiosInstance';
export const getManualPaymentPage = createAsyncThunk(
    'payments/getManualPaymentPage',
    async (paymentData, { rejectWithValue }) => {
      try {
      //debugger;
        const response = await axiosInstance.post('payment/generatemanualpayment', paymentData);   
        debugger;       
        return response.data; 
      } catch (error) {        
        alert(error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );   

const ManualPaymentSlice = createSlice({  
 
    name : 'manualpayment',
    initialState : {     
      paymentRequest: {
        OrderId : "Jys-123",
        Amount: "183.0",
        Currency: "GBP",
        Language : "en_US"
      },
      status: 'idle',
      payment_Error: null,
      manual_payment_response: null
    },
    reducers : {
        setManualPayment:(state,action)=> 
            {                       
              state.paymentRequest = { ...state.paymentRequest, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(getManualPaymentPage.pending, (state) => {
           // debugger;
            state.status = 'loading';
          })
          .addCase(getManualPaymentPage.fulfilled, (state, action) => {
           debugger;
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.manual_payment_response = action.payload.data.error;
            state.payment_Error = action.payload.data;
           }
           else{
            state.status = 'succeeded';
            state.manual_payment_response = action.payload.data;          
            state.payment_Error = null;
           }
           
          })
          .addCase(getManualPaymentPage.rejected, (state, action) => {
            //debugger;
            state.status = 'failed';
            state.payment_Error = action.payload;
          });
      },
    });

 export const {setManualPayment} = ManualPaymentSlice.actions;
 export default ManualPaymentSlice.reducer;