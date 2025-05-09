"use client"
import Image from "next/image";
import { useEffect } from "react";

const WhatsAppChat = () => {
  const phoneNumber = "+447405804449"; // Replace with your WhatsApp number
  const message = "Hello, I want to enquire about some flights!"; // Optional predefined message
 useEffect  (() => {

  const handleScroll =  () => {
    const whatsappLinkElement = document.querySelector(".whatsapp-link");
    if(window.scrollY > 100){
      whatsappLinkElement?.classList.add("visible");
    }
    else {
      whatsappLinkElement?.classList.remove("visble")
    }
  }
  window.addEventListener("scroll", handleScroll);  
  return () => {
    window.removeEventListener("scroll",handleScroll); 
  }
 } , []
);
  return (
    <div className="">
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-link relative"
       
      >
        <span className="">
          <span></span>
          </span>
          <Image src="/images/whatsapp.png" width={60} height={60} className="whatsapp-icon" />
      </a>
    </div>
  );
};

export default WhatsAppChat;