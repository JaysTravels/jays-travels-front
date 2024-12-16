import FrontFooter from "@/components/footers/Front.Footer";
import FrontNavbar from "@/components/navbars/Front.Navbar";
import { useEffect } from "react";

const FrontLayout = (props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("wowjs").then((WOW) => {
      //  new WOW.WOW().init();
      });
    }
  }, []);

  return (
    <>      
      <FrontNavbar className={`navbar-${props.navTheme}`} {...props} />   
     {{...props.children}}     
      <FrontFooter />    
    </>
  );
};

export default FrontLayout;
