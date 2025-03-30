const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '@/utils/axiosInstance';

export const trackUsers = createAsyncThunk(
    'ActiveUsers/trackUsers',
    async (usersData, { rejectWithValue }) => {
      try {
    
        const response = await axiosInstance.post('ActiveUsers/trackusers', usersData);
        return response.data; 
      } catch (error) { 
        return rejectWithValue(error?.data || 'Server Error');       
      }
    }
  );   
   
  
export const clearUsers = createAsyncThunk(
    'ActiveUsers/clearUsers',
    async (usersData, { rejectWithValue }) => {
      try {
    
        const response = await axiosInstance.post('ActiveUsers/clearusers', usersData);
        return response.data; 
      } catch (error) { 
        return rejectWithValue(error?.data || 'Server Error');       
      }
    }
  );  

const ActiveUsersSlice = createSlice({  
 
    name : 'activeusers',
    initialState : {
      activeusersrequest : null,
      status: 'idle',
      error: null,
      trackresponse: null,
      cleanresponse: null,
      loading : null
    },
    reducers : {
        setUserslink:(state,action)=> 
            {     
                     
              state.activeusersrequest = { ...state.activeusersrequest, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(trackUsers.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
          })
          .addCase(trackUsers.fulfilled, (state, action) => {
       
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.trackresponse = action.payload.data.error;
            state.error = action.payload.response;
            state.loading = false;
           }
           else{
           
            state.status = 'succeeded';
            state.trackresponse = action.payload;                    
            state.error = null;
            state.loading = false;
           }
           
          })
          .addCase(trackUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.loading = false;
          }).addCase(clearUsers.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
          })
          .addCase(clearUsers.fulfilled, (state, action) => {
       
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.cleanresponse = action.payload.data.error;
            state.error = action.payload.response;
            state.loading = false;
           }
           else{
           
            state.status = 'succeeded';
            state.cleanresponse = action.payload;                    
            state.error = null;
            state.loading = false;
           }
           
          })
          .addCase(clearUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.loading = false;
          });
      },
    });

 export const {setUserslink} = ActiveUsersSlice.actions;
 export default ActiveUsersSlice.reducer;