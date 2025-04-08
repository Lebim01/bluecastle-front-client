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
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IoWallet } from "react-icons/io5";
import Indicators from "@/components/ui/indicators";

const Dashboard = () => {
  const i18n = useTranslation();
  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 w-full md:grid-cols-3 gap-4">
     
        <Indicators icon={<IoWallet />} color="red" background="bg-red-200" title="Total Balance" value={'$100,000'} />
        <Indicators icon={<IoWallet />} color="blue" background="bg-blue-200" title="Total Balance" value={'$100,000'} />
        <Indicators icon={<IoWallet />} color="orange" background="bg-orange-200" title="Total Balance" value={'$100,000'} />
      </div>
    </div>
  );
};

export default Dashboard;
