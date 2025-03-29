import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css"; // Import animate.css
import "../styles/globals.scss";
import "../styles/common.css"
import { Providers } from "../store/provider";
import { store } from "../store/store";
import { RouterProvider } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import { Nunito } from 'next/font/google'
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
export const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
})


export default function App({ Component, pageProps }) {

  useEffect(() => {
    // Generate a session ID if not already stored
    //
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem("sessionId", sessionId);
    }

    const trackUser = async () => {
        try {
            await fetch("/api/track-users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    userId: null, // Replace with actual user ID if available
                    ip: "", // Optionally fetch user's IP
                }),
            });
        } catch (error) {
          
            console.error("Error tracking user:", error);
        }
    };
    try{
      trackUser();
      const interval = setInterval(trackUser, 60000); // Update every 60 sec
  
      return () => clearInterval(interval);
  
    }catch(error)
    {
      console.error("Error tracking user:", error);
    }

    }, []);

useEffect(() => {
  try{
    const cleanup = async () => {
      await fetch("/api/cleanup-users", { method: "POST" });
  };
  const interval = setInterval(cleanup, 10000); //300000 Run every 5 minutes
  return () => clearInterval(interval);
  }
  catch(error){
    console.error("Error tracking user:", error);
  }
}, []);

  const getLayout = Component.getLayout || ((page) => page);
  return <>
 
 <Providers store={store}>  
 {getLayout(<Component {...pageProps} />)}
 </Providers>
  
  </>
}
