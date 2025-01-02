const {createSlice} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect, useState } from "react";
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import axiosInstance from '@/utils/axiosInstance';

export const PNR_Multi = createAsyncThunk(
    'flights/PNR_Muliti',
    async (multirequest, { rejectWithValue }) => {
      try {        
        const response = await axiosInstance.post('PNR', multirequest);
       // console.log("Add Multi " + response.data)      
        return response.data; 
      } catch (error) {
        
        console.log("Error while sending request to pnr multi request" +error);        
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );

  export const UPDATE_PAYMENT_STATUS = createAsyncThunk(
    'flights/UPDATE_PAYMENT_STATUS',
    async (multirequest, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post('PNR/UpdatePaymentStatus', multirequest);
       // console.log("UpdatePaymentStatus " + response.data)      
        return response.data; 
      } catch (error) {
        
        console.log("Error while sending request to UpdatePaymentStatus request" +error);        
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );

  export const Create_Fop = createAsyncThunk(
    'flights/Create_Fop',
    async (foprequest, { rejectWithValue }) => {
      try {
   
       // console.log(foprequest)
        const response = await axiosInstance.post('FOP', foprequest);
      //  console.log("Fop Response " +response.data)      
        return response.data; 
      } catch (error) {        
        console.log("Fop Error : " + error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );

  export const Fare_Price_Pnr = createAsyncThunk(
    'flights/Fare_Price_Pnr',
    async (farepricerequest, { rejectWithValue }) => {
      try {
     
       // console.log(farepricerequest)
        const response = await axiosInstance.post('FairPricePnr', farepricerequest);
      //  console.log("Fare Price Response " +response.data)      
        return response.data; 
      } catch (error) {        
        console.log("Fare Price Error " + error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );
  
  export const Create_Tst = createAsyncThunk(
    'flights/Create_Tst',
    async (createtstrequest, { rejectWithValue }) => {
      try {
    
       // console.log(createtstrequest)
        const response = await axiosInstance.post('CreateTst', createtstrequest);
      //  console.log("Create TST Response " +response.data)      
        return response.data; 
      } catch (error) {        
        console.log("Create Tst Error " + error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );

  export const Commit_Pnr = createAsyncThunk(
    'flights/Commit_Pnr',
    async (commitpnrrequest, { rejectWithValue }) => {
      try {
    
      //  console.log(commitpnrrequest)
        const response = await axiosInstance.post('Pnr/CommitPnr', commitpnrrequest);
      //  console.log("Commit pnr Response " +response.data)    
        return response.data; 
      } catch (error) {        
        console.log("Commit Pnr Error " + error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );
  
const Slice = createSlice({  
 
    name : 'generatePnr',
    initialState : {     
      PNR_Multi_Request : null,
      PNR_Multi_Response : null,
      PNR_Multi_Status : null,
      PNR_Multi_Error : null,
      Create_Fop_Response : null,
      Create_Fop_Error : null,
      Create_Fop_Status : null,
      Fare_Price_Pnr_Response : null,
      Fare_Price_Pnr_Error : null,
      Fare_Price_Pnr_Status : null,
      Create_Tst_Response : null ,
      Create_Tst_Error : null ,
      Create_Tst_Status : null ,
      CommitPnrResponse :  null,
      CommitPnrError :  null ,
      Commit_Pnr_Error_Status : '' ,
      PNR_Number  : '',  
      PassengerDetails : [],   
      UpdatePaymentStatus : null,  
      UpdatePaymentStatus_Loding : null,
      UpdatePaymentStatus_Error : null
    },
    reducers : {
          setPnrMulti:(state,action)=> 
            {              
              state.PNR_Multi_Request = { ...state.PNR_Multi_Request, ...action.payload };              
           },
           setPassengerDetails:(state,action)=> 
            {       
            
              state.PassengerDetails = { ...state.PassengerDetails, ...action.payload };              
           },
           setPnr:(state,action)=> 
            {       
            
              state.PNR_Number = { ...state.PNR_Number, ...action.payload };              
           },
           pnrResponse:(state,action)=> 
            {       
            
              state.CommitPnrResponse = { ...state.CommitPnrResponse, ...action.payload };              
           }

      },
      extraReducers: (builder) => {
        builder
          .addCase(PNR_Multi.pending, (state) => {
            state.PNR_Multi_Status = 'loading';
          })
          .addCase(PNR_Multi.fulfilled, (state, action) => {
          
           if(action.payload.isSuccessful === false){
            state.PNR_Multi_Status = 'failed';
            state.PNR_Multi_Error = action.payload.response;
           }
           else{
            state.PNR_Multi_Status = 'succeeded';
            state.PNR_Multi_Response = action.payload;
            state.PNR_Multi_Error = null;
           }
            
          }) .addCase(PNR_Multi.rejected, (state, action) => {
            state.PNR_Multi_Status = 'failed';
            state.PNR_Multi_Error = action.payload;
          })
          .addCase(Create_Fop.pending, (state) => {
            state.Create_Fop_Status = 'loading';
          })
          .addCase(Create_Fop.fulfilled, (state, action) => {
          
           if(action.payload.isSuccessful === false){
            state.Create_Fop_Status = 'failed';
            state.Create_Fop_Error = action.payload.response;
           }
           else{
            state.Create_Fop_Status = 'succeeded';
            state.Create_Fop_Response = action.payload;
            state.Create_Fop_Error = null;
           }
            
          }).addCase(Create_Fop.rejected, (state, action) => {
            state.Create_Fop_Status = 'failed';
            state.Create_Fop_Error = action.payload;
          })
          .addCase(Fare_Price_Pnr.pending, (state) => {
            state.Fare_Price_Pnr_Status = 'loading';
          })
          .addCase(Fare_Price_Pnr.fulfilled, (state, action) => {
         
           if(action.payload.isSuccessful === false){
            state.Fare_Price_Pnr_Status = 'failed';
            state.Fare_Price_Pnr_Error = action.payload.response;
           }
           else{
            state.Fare_Price_Pnr_Status = 'succeeded';
            state.Fare_Price_Pnr_Response = action.payload;
            state.Fare_Price_Pnr_Error = null;
           }
            
          }).addCase(Fare_Price_Pnr.rejected, (state, action) => {
            state.Fare_Price_Pnr_Status = 'failed';
            state.Fare_Price_Pnr_Error = action.payload;
          })
          .addCase(Create_Tst.pending, (state) => {
            state.Create_Tst_Status = 'loading';
          })
          .addCase(Create_Tst.fulfilled, (state, action) => {
        
           if(action.payload.isSuccessful === false){
            state.Create_Tst_Status = 'failed';
            state.Create_Tst_Error = action.payload.response;
           }
           else{
            state.Create_Tst_Status = 'succeeded';
            state.Create_Tst_Response = action.payload;
            state.Create_Tst_Error = null;
           }
            
          }).addCase(Create_Tst.rejected, (state, action) => {
            state.Create_Tst_Status = 'failed';
            state.Create_Tst_Error = action.payload;
          })
          .addCase(Commit_Pnr.pending, (state) => {
            state.Commit_Pnr_Error_Status = 'loading';
          })
          .addCase(Commit_Pnr.fulfilled, (state, action) => {
          
           if(action.payload.isSuccessful === false){
            state.Commit_Pnr_Error_Status = 'failed';
            state.CommitPnrError = action.payload?.data?.error;
           }
           else{
            state.Commit_Pnr_Error_Status = 'succeeded';
            state.CommitPnrResponse = action.payload;
            state.CommitPnrError = null;
            state.PNR_Number = state.PNR_Number === "" ? action.payload?.data?.pnrHeader?.reservation?.pnr : state.PNR_Number
           }
            
          }).addCase(Commit_Pnr.rejected, (state, action) => {
            state.CommitPnrError_Status = 'failed';
            state.CommitPnrError = action.payload?.data?.error;
          }).addCase(UPDATE_PAYMENT_STATUS.pending, (state) => {
            state.UpdatePaymentStatus_Loding = 'loading';
          }).addCase(UPDATE_PAYMENT_STATUS.fulfilled, (state, action) => {
           
            if(action.payload.isSuccessful === false){
             state.UpdatePaymentStatus_Error = 'failed';
             state.UpdatePaymentStatus = action.payload?.data;
            }
            else{
             state.UpdatePaymentStatus_Loding = null;
             state.UpdatePaymentStatus = action.payload;
             state.UpdatePaymentStatus_Error = null;
             
            }
             
           }).addCase(UPDATE_PAYMENT_STATUS.rejected, (state, action) => {
             state.UpdatePaymentStatus = false;
             state.UpdatePaymentStatus_Error = action.payload?.data;
           });
           
      },
    });

 export const {setPnrMulti,setPassengerDetails,setPnr,pnrResponse} = Slice.actions;
 export default Slice.reducer;