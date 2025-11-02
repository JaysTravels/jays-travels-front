const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '@/utils/axiosInstance';
export const getLoginDetails = createAsyncThunk(
    'auth/login',
    async (loginData, { rejectWithValue }) => {
      try {   
        const response = await axiosInstance.post('auth/login', loginData);    
         debugger;      
        return response.data; 
      } catch (error) {        
        alert(error);
        return rejectWithValue(error?.data || 'Server Error');
      }
    }
  );   

const LoginSlice = createSlice({  
 
    name : 'login',
    initialState : {     
      loginRequest: {
        email : "test@test.com",
        password: "test",       
      },
      status: 'idle',
      login_Error: null,
      login_response: null
    },
    reducers : {
        setLogin:(state,action)=> 
            {                       
              state.loginRequest = { ...state.loginRequest, ...action.payload };              
           }
      },
      extraReducers: (builder) => {
        builder
          .addCase(getLoginDetails.pending, (state) => {
           // debugger;
            state.status = 'loading';
          })
          .addCase(getLoginDetails.fulfilled, (state, action) => {
          // debugger;
           if(action.payload.isSuccessful === false){
            state.status = 'failed';
            state.login_response = action.payload.data.error || 'Login failed';
            state.login_Error = action.payload.data;
           }
           else{
             debugger;
            state.status = 'succeeded';
            state.login_response = action.payload.data;          
            state.login_Error = null;
           }
           
          })
          .addCase(getLoginDetails.rejected, (state, action) => {
            //debugger;
            state.status = 'failed';
            state.login_Error = action.payload  || 'Request failed';
          });
      },
    });

 export const {setLogin} = LoginSlice.actions;
 export default LoginSlice.reducer;