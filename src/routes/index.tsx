import { ReactNode } from "react";
import { UseTranslationResponse } from "react-i18next";
import { BsFillWalletFill } from "react-icons/bs";
import { FaChartSimple, FaMoneyBillTrendUp } from "react-icons/fa6";
import { GoCreditCard, GoDotFill, GoTrophy } from "react-icons/go";
import { HiUsers } from "react-icons/hi";
import { HiAcademicCap } from "react-icons/hi2";
import { IoMdBulb, IoMdHelpCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { MdDashboard, MdOutlineAttachMoney } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";

export interface Route {
  key: string;
  route: string;
  display: string;
  icon: ReactNode;
  disabled?: boolean;
  children?: Route[];
}

export const ROUTES: (
  i18n: UseTranslationResponse<"ns1", undefined>
) => Route[] = (i18n) => [
  {
    key: "dashboard",
    route: "/",
    display: i18n.t("menu.dashboard"),
    icon: <MdDashboard size={28} />,
  },
  {
    key: "team",
    route: "/team",
    display: i18n.t("menu.my_team"),
    icon: <HiUsers size={28} />,
    children: [
      {
        key: "my-team",
        route: "/team/me",
        display: i18n.t("menu.my_team"),
        icon: <GoDotFill />,
      },
      {
        key: "unilevel",
        route: "/team/unilevel",
        display: i18n.t("menu.unilevel"),
        icon: <GoDotFill />,
      },
      {
        key: "binary",
        route: "/team/binary",
        display: i18n.t("menu.binary"),
        icon: <GoDotFill />,
      },
    ],
  },
  {
    key: "academy",
    route: "/academy",
    display: i18n.t("menu.academy"),
    icon: <HiAcademicCap size={28} />,
    disabled: false,
    children: [
      {
        key: "academy-list",
        route: "/academy/",
        display: i18n.t("menu.academy"),
        icon: <GoDotFill />,
        disabled: false
      },
      {
        key: "academy-filmed",
        route: "/academy/filmed",
        display: i18n.t("menu.past_sessions"),
        icon: <GoDotFill />,
        disabled: true
      },
      {
        key: "academy-live",
        route: "/academy/live",
        display: i18n.t("menu.live_sessions"),
        icon: <GoDotFill />,
        disabled: true
      },
    ],
  },
  {
    key: "ranks",
    route: "/ranks",
    display: i18n.t("menu.ranks"),
    icon: <GoTrophy size={24} />,
  },
  {
    key: "investment",
    route: "/investment",
    display: i18n.t("menu.investments"),
    icon: <FaMoneyBillTrendUp size={24} />,
    children: [
      {
        key: "investment-deposit",
        route: "/investment/deposit",
        display: i18n.t("menu.invest"),
        icon: <GoDotFill />,
      },
      {
        key: "investment-list",
        route: "/investment/list",
        display: i18n.t("menu.my_investments"),
        icon: <GoDotFill />,
      },
    ],
  },
  {
    key: "purchases",
    route: "/purchases",
    display: i18n.t("menu.buys"),
    icon: <GoCreditCard size={24} style={{ rotate: "-25deg" }} />,
    children: [
      {
        key: "purchases-membership",
        route: "/purchases/membership",
        display: i18n.t("menu.buy_membership"),
        icon: <GoDotFill />,
      },
      {
        key: "purchases-me",
        route: "/purchases/me",
        display: i18n.t("menu.my_buys"),
        icon: <GoDotFill />,
      },
    ],
  },
  {
    key: "fees",
    route: "/fees/me",
    display: i18n.t("commissions.commissions"),
    icon: <FaChartSimple size={28} />,
  },
  {
    key: "withdrawals",
    route: "/withdrawals",
    display: i18n.t("menu.withdrawals"),
    icon: <BiMoneyWithdraw size={28} />,
  },
  {
    key: "signals",
    route: "/signals",
    display: i18n.t("menu.signals"),
    icon: <IoMdBulb size={28} />,
    disabled: true,
  },
  {
    key: "help",
    route: "/support",
    display: i18n.t("menu.help"),
    icon: <IoMdHelpCircleOutline size={28} />,
  },
  {
    key: "profile",
    route: "/profile",
    display: i18n.t("menu.profile"),
    icon: <HiUsers size={28} />,
  },
];
