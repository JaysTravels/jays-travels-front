const {createSlice,nanoid} = require("@reduxjs/toolkit");
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useEffect, useState } from "react";
import React from 'react';
import axiosInstance from '@/utils/axiosInstance';

export async function getAuthToken() {
  try {
    debugger;
    const tokenRequest = {
        UserName: process.env.NEXT_PUBLIC_API_USER_NAME,
        Password: process.env.NEXT_PUBLIC_API_USER_PASSWORD
       };
    const response = await axiosInstance.post('/security/createToken', tokenRequest);
      if (response?.data) {
        const token = response.data;
        localStorage.setItem("SecurityToken", token);
        console.log("Token saved to localStorage:", token);
        return token;
      }
      return response.data; 
    
  } catch (error) {
    console.error('Token Generation Error:', error);
    throw error;
  }
}
export const getToken = createAsyncThunk(
  'flights/getToken',
  async (tokenRequest, { rejectWithValue }) => {
    try { 
      debugger;
      const response = await axiosInstance.post('/security/createToken', tokenRequest);
      if (response?.data) {
        const token = response.data;
        localStorage.setItem("SecurityToken", token);
        console.log("Token saved to localStorage:", token);
        return token;
      }
      return response.data; 
    } catch (error) {
      console.log(error?.data)
    return rejectWithValue(error?.data || 'Server Error');
    }
  }
);

const Slice = createSlice({  

    name : 'token',
    initialState : {     
      status: 'idle',
      loading: false,
      error: null,
      securityToken : null,
    },
    reducers : {
        setToken:(state,action)=> 
            {              
              state.securityToken = { ...state.securityToken, ...action.payload };              
           }
    },
      extraReducers: (builder) => {
        builder
          .addCase(getToken.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
          })
          .addCase(getToken.fulfilled, (state, action) => {
            state.status = 'success';
            state.response = action.payload.data;
            state.error = null;
            state.loading = false;  
            localStorage.setItem("SecurityToken", action.payload.data);
          })
          .addCase(getToken.rejected, (state, action) => {
            state.status = 'failed';
            state.loading = false;
            state.error = action.payload;
          })
      },
    });  
       
 export const {setToken} = Slice.actions;
 export default Slice.reducer;