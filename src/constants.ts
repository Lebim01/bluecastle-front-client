import { UseTranslationResponse } from "react-i18next";
import { Rank, RankKey } from "./types/Rank";

export type Memberships = "p-100" | "p-300" | "p-500" | "p-1000";

type MembershipDetails = {
  display: string;
  key: Memberships;
  order: number;
  value: string;
  pros: string[];
  image: string;
};

export const DISPLAY: Record<Memberships, string> = {
  "p-100": "100",
  "p-300": "300",
  "p-500": "500",
  "p-1000": "1000",
};

export const RanksObject: (
  i18n?: UseTranslationResponse<"ns1", undefined>
) => Record<RankKey, Rank> = (i18n) => ({
  none: {
    display: i18n?.t('rank_view.ranks.emprendedor') || "Emprendedor",
    key: "none",
    order: -1,
    ranks: [],
    start_points: 0,
    points: 0,
    binary_percent: 0.7,
    bonus: 0,
  },
  contructor: {
    display: i18n?.t('rank_view.ranks.constructor') || "Constructor",
    key: "contructor",
    order: 0,
    ranks: [],
    start_points: 0,
    points: 5000,
    binary_percent: 0.7,
    bonus: 50,
  },
  director: {
    display: i18n?.t('rank_view.ranks.director') || "Director",
    key: "director",
    order: 1,
    ranks: [],
    start_points: 5000,
    points: 15000,
    binary_percent: 0.7,
    bonus: 200,
  },
  director_premier: {
    display: i18n?.t('rank_view.ranks.director_premier') || "Director Premier",
    key: "director_premier",
    order: 2,
    ranks: [],
    start_points: 20000,
    points: 30000,
    binary_percent: 0.7,
    bonus: 400,
  },
  embajador: {
    display: i18n?.t('rank_view.ranks.embajador') || "Embajador",
    key: "embajador",
    order: 3,
    ranks: [],
    start_points: 50000,
    points: 60000,
    binary_percent: 0.7,
    bonus: 800,
  },
  diamante: {
    display: i18n?.t('rank_view.ranks.diamond') || "Diamante",
    key: "diamante",
    order: 4,
    ranks: [],
    start_points: 110000,
    points: 150000,
    binary_percent: 0.8,
    bonus: 1500,
  },
  diamante_ejecutivo: {
    display: i18n?.t('rank_view.ranks.ejecutive_diamond') || "Diamante Ejecutivo",
    key: "diamante_ejecutivo",
    order: 5,
    ranks: [],
    start_points: 260000,
    points: 300000,
    binary_percent: 0.8,
    bonus: 4000,
  },
  diamante_premier: {
    display: i18n?.t('rank_view.ranks.premier_diamond') || "Diamante Premier",
    key: "diamante_premier",
    order: 6,
    ranks: [
      ["diamante_ejecutivo", "diamante_ejecutivo"],
      ["diamante_ejecutivo"],
    ],
    start_points: 560000,
    points: 600000,
    binary_percent: 0.8,
    bonus: 8000,
  },
  diamante_negro: {
    display: i18n?.t('rank_view.ranks.black_diamond') || "Diamante Negro",
    key: "diamante_negro",
    order: 7,
    ranks: [["diamante_premier", "diamante_premier"], ["diamante_premier"]],
    start_points: 1160000,
    points: 1500000,
    binary_percent: 0.9,
    bonus: 20000,
  },
  diamante_corona: {
    display: i18n?.t('rank_view.ranks.crown_diamond') || "Diamante Corona",
    key: "diamante_corona",
    order: 8,
    ranks: [
      ["diamante_negro", "diamante_negro"],
      ["diamante_negro", "diamante_negro"],
    ],
    start_points: 2660000,
    points: 5000000,
    binary_percent: 0.9,
    bonus: 100000,
  },
  diamante_royal: {
    display: i18n?.t('rank_view.ranks.royal_diamond') || "Diamante Royal",
    key: "diamante_royal",
    order: 9,
    ranks: [
      ["diamante_corona", "diamante_corona"],
      ["diamante_corona", "diamante_corona"],
    ],
    start_points: 7660000,
    points: 8000000,
    binary_percent: 1,
    bonus: 200000,
  },
});

export const membershipRecord: (
  i18n?: UseTranslationResponse<"ns1", undefined>
) => Record<Memberships, MembershipDetails> = (i18n) => ({
  "p-100": {
    display: "Plan 100",
    key: "p-100",
    order: 1,
    value: "100",
    pros: [
      i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
      i18n?.t("purchases.membership.benefits.tokenomic_course") ||
      "Curso Tokenomics",
      i18n?.t("purchases.membership.benefits.generates_up_to_3") ||
      "Genera hasta 3x puntos",
      i18n?.t("purchases.membership.benefits.adds_value_up_to_10") ||
      "Agrega valor hasta 10x de tu membresía",
    ],
    image: "/img/memberships/silver.png",
  },
  "p-300": {
    display: "Plan 300",
    key: "p-300",
    order: 2,
    value: "100",
    pros: [
      i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
      i18n?.t("purchases.membership.benefits.tokenomic_course") ||
      "Curso Tokenomics",
      i18n?.t("purchases.membership.benefits.generates_up_to_3") ||
      "Genera hasta 3x puntos",
      i18n?.t("purchases.membership.benefits.adds_value_up_to_10") ||
      "Agrega valor hasta 10x de tu membresía",
    ],
    image: "/img/memberships/gold.png",
  },
  "p-500": {
    display: "Plan 500",
    key: "p-500",
    order: 3,
    value: "100",
    pros: [
      i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
      i18n?.t("purchases.membership.benefits.tokenomic_course") ||
      "Curso Tokenomics",
      i18n?.t("purchases.membership.benefits.binance_trading_bot") ||
      "Bot de Trading Binance",
      i18n?.t("purchases.membership.benefits.generates_up_to_3") ||
      "Genera hasta 3x puntos",
      i18n?.t("purchases.membership.benefits.adds_value_up_to_10") ||
      "Agrega valor hasta 10x de tu membresía",
    ],
    image: "/img/memberships/ruby.png",
  },
  "p-1000": {
    display: "Plan 1000",
    key: "p-1000",
    order: 4,
    value: "100",
    pros: [
      i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
      i18n?.t("purchases.membership.benefits.tokenomic_course") ||
      "Curso Tokenomics",
      i18n?.t("purchases.membership.benefits.binance_trading_bot") ||
      "Bot de Trading Binance",
      i18n?.t("purchases.membership.benefits.trading_signals") ||
      "Señales de Trading",
      i18n?.t("purchases.membership.benefits.live_classes") || "Clases en Vivo",
      i18n?.t("purchases.membership.benefits.generates_up_to_3") ||
      "Genera hasta 3x puntos",
      i18n?.t("purchases.membership.benefits.adds_value_up_to_10") ||
      "Agrega valor hasta 10x de tu membresía",
    ],
    image: "/img/memberships/black.png",
  },
});

export const OPTIONS = [
  {
    label: DISPLAY["p-100"],
    value: "p-100",
    image: "/img/memberships/silver.png",
  },
  {
    label: DISPLAY["p-300"],
    value: "p-300",
    image: "/img/memberships/gold.png",
  },
  {
    label: DISPLAY["p-500"],
    value: "p-500",
    image: "/img/memberships/ruby.png",
  },
  {
    label: DISPLAY["p-1000"],
    value: "p-1000",
    image: "/img/memberships/black.png",
  },
];

export const pares = [
  "AUD-CHF",
  "AUD-JPY",
  "AUD-NZD",
  "AUD-USD",
  "BTCUSD",
  "CAD-CHF",
  "CAD-JPY",
  "CHF-JPY",
  "EUR-AUD",
  "EUR-CAD",
  "EUR-CHF",
  "EUR-GBP",
  "EUR-JPY",
  "EUR-NZD",
  "EUR-USD",
  "GBP-AUD",
  "GBP-CAD",
  "GBP-CHF",
  "GBP-JPY",
  "GBP-NZD",
  "GBP-USD",
  "GOLD",
  "NZD-CAD",
  "NZD-CHF",
  "NZD-JPY",
  "NZD-USD",
  "US30",
  "US100",
  "US500",
  "USD-JPY",
  "USD-CAD",
  "USD-CHF",
];

export const orderTypes = [
  { label: "SELL", value: "sell" },
  { label: "BUY", value: "buy" },
  { label: "SELL LIMIT", value: "sell_limit" },
  { label: "SELL STOP", value: "sell_stop" },
  { label: "BUY LIMIT", value: "buy_limit" },
  { label: "BUY STOP", value: "buy_stop" },
];

export const paresRecord = {
  AUDCHF: { key: "AUDCHF", label: "AUD-CHF", categorie: "Forex" },
  AUDJPY: { key: "AUDJPY", label: "AUD-JPY", categorie: "Forex" },
  AUDNZD: { key: "AUDNZD", label: "AUD-NZD", categorie: "Forex" },
  AUDUSD: { key: "AUDUSD", label: "AUD-USD", categorie: "Forex" },
  BTCUSD: { key: "BTCUSD", label: "BTC-USD", categorie: "Crypto" },
  CADCHF: { key: "CADCHF", label: "CAD-CHF", categorie: "Forex" },
  CADJPY: { key: "CADJPY", label: "CAD-JPY", categorie: "Forex" },
  CHFJPY: { key: "CHFJPY", label: "CHF-JPY", categorie: "Forex" },
  EURAUD: { key: "EURAUD", label: "EUR-AUD", categorie: "Forex" },
  EURCAD: { key: "EURCAD", label: "EUR-CAD", categorie: "Forex" },
  EURCHF: { key: "EURCHF", label: "EUR-CHF", categorie: "Forex" },
  EURGBP: { key: "EURGBP", label: "EUR-GBP", categorie: "Forex" },
  EURJPY: { key: "EURJPY", label: "EUR-JPY", categorie: "Forex" },
  EURNZD: { key: "EURNZD", label: "EUR-NZD", categorie: "Forex" },
  EURUSD: { key: "EURUSD", label: "EUR-USD", categorie: "Forex" },
  GBPAUD: { key: "GBPAUD", label: "GBP-AUD", categorie: "Forex" },
  GBPCAD: { key: "GBPCAD", label: "GBP-CAD", categorie: "Forex" },
  GBPCHF: { key: "GBPCHF", label: "GBP-CHF", categorie: "Forex" },
  GBPJPY: { key: "GBPJPY", label: "GBP-JPY", categorie: "Forex" },
  GBPNZD: { key: "GBPNZD", label: "GBP-NZD", categorie: "Forex" },
  GBPUSD: { key: "GBPUSD", label: "GBP-USD", categorie: "Forex" },
  GOLD: { key: "GOLD", label: "GOLD", categorie: "Metal" },
  NZDCAD: { key: "NZDCAD", label: "NZD-CAD", categorie: "Forex" },
  NZDCHF: { key: "NZDCHF", label: "NZD-CHF", categorie: "Forex" },
  NZDJPY: { key: "NZDJPY", label: "NZD-JPY", categorie: "Forex" },
  NZDUSD: { key: "NZDUSD", label: "NZD-USD", categorie: "Forex" },
  US30: { key: "US30", label: "US30", categorie: "Indices" },
  US100: { key: "US100", label: "US100", categorie: "Indices" },
  US500: { key: "US500", label: "US500", categorie: "Indices" },
  USDJPY: { key: "USDJPY", label: "USD-JPY", categorie: "Forex" },
  USDCAD: { key: "USDCAD", label: "USD-CAD", categorie: "Forex" },
  USDCHF: { key: "USDCHF", label: "USD-CHF", categorie: "Forex" },
} as const;
