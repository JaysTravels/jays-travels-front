
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