const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '@/utils/axiosInstance';

export const getDeeplink = createAsyncThunk(
    'deeplink/getdeeplink',
    async (deeplinkdata, { rejectWithValue }) => {
      try {
    
       console.log(deeplinkdata)       
        const response = await axiosInstance.post('deeplink', deeplinkdata);
        console.log(response.data)      
        return response.data; 
      } catch (error) {
        
        alert(error);
        return rejectWithValue(error?.data || 'Server Error');
        state.loading = false;
      }
    }
  );   
   

const deeplinkSlice = createSlice({  
 
    name : 'deeplink',
    initialState : {
      deeplinkrequest : null,
      status: 'idle',
      error: null,
      response: null,
      loading : null
    },
    reducers : {
        setDeeplink:(state,action)=> 
            {     
                     
              state.deeplinkrequest = { ...state.deeplinkrequest, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(getDeeplink.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
          })
          .addCase(getDeeplink.fulfilled, (state, action) => {
       
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
          .addCase(getDeeplink.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.loading = false;
          });
      },
    });

 export const {setDeeplink} = deeplinkSlice.actions;
 export default deeplinkSlice.reducer;