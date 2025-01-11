import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css"; // Import animate.css
import "../styles/globals.scss";
import "../styles/common.css"
import { Providers } from "../store/provider";
import { store } from "../store/store";
import { RouterProvider } from "react-router-dom";
import "slick-carousel/slick/slick.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return <>
 
 <Providers store={store}>  
 {getLayout(<Component {...pageProps} />)}
 </Providers>
  
  </>
}
