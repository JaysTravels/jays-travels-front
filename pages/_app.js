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
import UserTracker from "@/components/UserTracker"; 
import { appWithTranslation } from 'next-i18next';
import i18nConfig from '../next-i18next.config.mjs'; 

export const inter = Nunito({
  subsets: ['latin'],
  display: 'swap',
})


 function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);
  return <>
 
 <Providers store={store}>  
 <UserTracker /> 
 {getLayout(<Component {...pageProps} />)}
 </Providers>
  
  </>
}
export default appWithTranslation(App,i18nConfig);