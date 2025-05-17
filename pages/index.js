import Meta from "@/components/common/Meta";
import CheapTicketsHome from "@/components/home/CheapTickets.Home";
import FlightRoutesHome from "@/components/home/FlightRoutes.Home";
import HeaderHome from "@/components/home/Header.Home";
import SpecialOfferHome from "@/components/home/SpecialOffer.Home";
import SubscribeFooterHome from "@/components/home/SubscribeFooter.Home";
import WhatWeDo from "@/components/home/whatWeDo.Home";
import FrontLayout from "@/components/layouts/Front.Layout";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {common} from '../public/locales/en-gb/common.json'
//import i18nConfig from '../next-i18next.config.mjs';
//import i18nConfig from '../next-i18next.config.mjs';
import i18n from '../next-i18next.config.mjs';
import fs from 'fs';
export default function Home() {
  const { t } = useTranslation('common');
  return (
    <>
      <Meta title="Home" />
      <HeaderHome />
      <WhatWeDo />
      <FlightRoutesHome />
      <CheapTicketsHome />
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
