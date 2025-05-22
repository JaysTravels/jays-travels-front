import Meta from "@/components/common/Meta";
// import BlogSectionHome from "@/components/home/BlogSection.Home";
import CheapTicketsHome from "@/components/home/CheapTickets.Home";
// import FeaturedDestinationHome from "@/components/home/FeaturedDestination.Home";
// import FlightDetailHome from "@/components/home/FlightDetail.Home";
import FlightRoutesHome from "@/components/home/FlightRoutes.Home";
import HeaderHome from "@/components/home/Header.Home";
// import OffersHome from "@/components/home/Offers.Home";
import SpecialOfferHome from "@/components/home/SpecialOffer.Home";
import SubscribeFooterHome from "@/components/home/SubscribeFooter.Home";
import WhatWeDo from "@/components/home/whatWeDo.Home";
import FrontLayout from "@/components/layouts/Front.Layout";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {common} from '@/public/locales/en-gb/common.json'
import i18n from '@/next-i18next.config.mjs';
import fs from 'fs';
export default function Home() {
  return (
    <>
      <Meta title="Home" />
      <HeaderHome />
     {/* <FeaturedDestinationHome /> */}
      {/* <OffersHome /> */}
      <WhatWeDo />
      <FlightRoutesHome />
      {/* <SpecialOfferHome /> */}
      <CheapTicketsHome />
      {/* <FlightDetailHome /> */}
      {/* <BlogSectionHome /> */}
      <SubscribeFooterHome />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <FrontLayout navTheme={"dark homeNav"}>{page}</FrontLayout>;
};

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || i18n.i18n.defaultLocale, ['common'])),
    },
  };
}
