
import { useRouter } from "next/router";
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
export default function PaymentPage() {
   // debugger;
    const [isLoading, setIsLoading] = useState(false);
    const currSign = '£';
    const router = useRouter();
    const data = useSelector((state) => state.payments?.payment_response);
    const dispatch = useDispatch();
    const flightResults = useSelector((state) => state.flights.response);
    const flightRequest = useSelector((state) => state.flights.flights);
    const airsellResults = useSelector((state) => state.airsell.response);
    const airsellRequest = useSelector((state) => state.airsell.airSellRequest);
    const PNR_Multi_Error = useSelector((state) => state.generatePnr.PNR_Multi_Error);
    const Create_Fop_Error = useSelector((state) => state.generatePnr.Create_Fop_Error);
    const Fare_Price_Pnr_Error = useSelector((state) => state.generatePnr.Fare_Price_Pnr_Error);
    const Create_Tst_Error = useSelector((state) => state.generatePnr.Create_Tst_Error);
    const Commit_Pnr_Error = useSelector((state) => state.generatePnr.CommitPnrError);
    const paymentPageError = useSelector((state) => state.payments?.payment_Error);
    const paymentPageData = useSelector((state) => state.payments?.payment_response);
   const BookingRefNo = useSelector((state) => state.payments?.payment_response?.bookingRefNo);
    const PassengerDetails = useSelector((state) => state.generatePnr.PassengerDetails);
    const selectedFlight = useSelector((state) => state.flights.selectedFlight);
    
   
    const initiatePayment = async () => {
        //debugger;
        setIsLoading(true);       

        //const data = await response.json();

        if (data && data.url && data.parameters) {
           // debugger;
            // Dynamically create form and submit
            const form = document.createElement('form');
            form.action = data.url;
            form.method = 'POST';

            Object.keys(data.parameters).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data.parameters[key];
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        }
        setIsLoading(false);
    };

    return (
        <div>
            <button onClick={initiatePayment} disabled={isLoading}>
                {isLoading ? 'Redirecting...' : 'Pay Now'}
            </button>
        </div>
    );
}