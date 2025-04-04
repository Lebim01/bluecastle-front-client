import CardDota from "@/components/utils/cards/Card";
import CardBanner from "../../utils/cards/CardBanner";
import Links from "./components/Links";
import RankDashboard from "./components/RanksDashboard";
import NextRank from "./components/NextRank";
import InvestmentCard from "./components/InvestmentCard";
import Upgrade from "./components/Upgrade";
import PromoDubai from "./components/PromoDubai";
import PromoRolex from "./components/PromoRolex";
import MultiplierPortafolio from "./components/MultiplierPortafolio";
import MultiplierMembership from "./components/MultiplierMembership";
import ActiveCompoundInterest from "./components/ActiveCompoundInterest";
import { useTranslation } from "react-i18next";
import MapJson from "./components/MapJson";
import CountriesList from "./components/CountriesList";
import BinanceBot from "./components/BinanceBot";
import GetNftCard from "./components/GetNftCard";

const Dashboard = () => {
  const i18n = useTranslation();
  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BinanceBot />

        <CardBanner img="/img/buy-membership.png" position="bottom">
          <div className="bg-gray-900/70 flex flex-col gap-2 p-1">
            <span className="text-3xl font-bold">
              {i18n.t("dashboard_view.banner_membership.title")}
            </span>
            <span className="text-xl font-black text-balance">
              {i18n.t("dashboard_view.banner_membership.description")}
            </span>
          </div>
        </CardBanner>

        <GetNftCard />

        <PromoDubai i18n={i18n} />

        <PromoRolex i18n={i18n} />

        <Upgrade i18n={i18n} />

        <Links i18n={i18n} />

        <InvestmentCard i18n={i18n} />

        <ActiveCompoundInterest i18n={i18n} />

        <MultiplierPortafolio i18n={i18n} />

        <MultiplierMembership i18n={i18n} />

        {/* Este sera el marcador donde esta dota master */}
        <RankDashboard i18n={i18n} />

        {/* Este sera el marcador de la carrera */}
        <NextRank i18n={i18n} />
        <CardDota classNames="col-span-full grid grid-cols-12 gap-4">
          <div className="col-span-full md:col-span-6 lg:col-span-4">
            <CountriesList />
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-8">
            <MapJson />
          </div>
        </CardDota>
        {/*<CardDota classNames="col-span-full h-[400px]">
          <Map />
        </CardDota>*/}
      </div>
    </div>
  );
};

export default Dashboard;
