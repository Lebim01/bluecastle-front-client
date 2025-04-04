module.exports = {

"[project]/src/hooks/useWindowSize.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>useWindowSize)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_import__("[externals]/react [external] (react, cjs)");
;
function useWindowSize() {
    const [windowSize, setWindowSize] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        width: undefined,
        height: undefined
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return ()=>window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
}
}}),
"[externals]/nuqs [external] (nuqs, esm_import)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_external_import__("nuqs");

__turbopack_export_namespace__(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/hooks/useAxios.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/index.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_import__("[externals]/react [external] (react, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const useAxios = ({ url, postData, method = "get", defaultValue }, dependencies = [])=>{
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(defaultValue || null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const exec = async ()=>{
        setLoading(true);
        try {
            const response = await (method == "get" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"][method](`${("TURBOPACK compile-time value", "https://dota-api-1039762081728.us-central1.run.app")}/${url}`) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"][method](`${("TURBOPACK compile-time value", "https://dota-api-1039762081728.us-central1.run.app")}/${url}`, postData));
            setData(response.data);
        } catch (err) {
            setData(null);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        exec();
    }, dependencies);
    return {
        data,
        loading,
        refetch: exec
    };
};
const __TURBOPACK__default__export__ = useAxios;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/arrows-svg [external] (arrows-svg, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("arrows-svg", () => require("arrows-svg"));

module.exports = mod;
}}),
"[project]/src/constants.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "DISPLAY": (()=>DISPLAY),
    "OPTIONS": (()=>OPTIONS),
    "RanksObject": (()=>RanksObject),
    "membershipRecord": (()=>membershipRecord),
    "orderTypes": (()=>orderTypes),
    "pares": (()=>pares),
    "paresRecord": (()=>paresRecord)
});
const DISPLAY = {
    "p-100": "100",
    "p-300": "300",
    "p-500": "500",
    "p-1000": "1000"
};
const RanksObject = (i18n)=>({
        none: {
            display: i18n?.t('rank_view.ranks.emprendedor') || "Emprendedor",
            key: "none",
            order: -1,
            ranks: [],
            start_points: 0,
            points: 0,
            binary_percent: 0.7,
            bonus: 0
        },
        contructor: {
            display: i18n?.t('rank_view.ranks.constructor') || "Constructor",
            key: "contructor",
            order: 0,
            ranks: [],
            start_points: 0,
            points: 5000,
            binary_percent: 0.7,
            bonus: 50
        },
        director: {
            display: i18n?.t('rank_view.ranks.director') || "Director",
            key: "director",
            order: 1,
            ranks: [],
            start_points: 5000,
            points: 15000,
            binary_percent: 0.7,
            bonus: 200
        },
        director_premier: {
            display: i18n?.t('rank_view.ranks.director_premier') || "Director Premier",
            key: "director_premier",
            order: 2,
            ranks: [],
            start_points: 20000,
            points: 30000,
            binary_percent: 0.7,
            bonus: 400
        },
        embajador: {
            display: i18n?.t('rank_view.ranks.embajador') || "Embajador",
            key: "embajador",
            order: 3,
            ranks: [],
            start_points: 50000,
            points: 60000,
            binary_percent: 0.7,
            bonus: 800
        },
        diamante: {
            display: i18n?.t('rank_view.ranks.diamond') || "Diamante",
            key: "diamante",
            order: 4,
            ranks: [],
            start_points: 110000,
            points: 150000,
            binary_percent: 0.8,
            bonus: 1500
        },
        diamante_ejecutivo: {
            display: i18n?.t('rank_view.ranks.ejecutive_diamond') || "Diamante Ejecutivo",
            key: "diamante_ejecutivo",
            order: 5,
            ranks: [],
            start_points: 260000,
            points: 300000,
            binary_percent: 0.8,
            bonus: 4000
        },
        diamante_premier: {
            display: i18n?.t('rank_view.ranks.premier_diamond') || "Diamante Premier",
            key: "diamante_premier",
            order: 6,
            ranks: [
                [
                    "diamante_ejecutivo",
                    "diamante_ejecutivo"
                ],
                [
                    "diamante_ejecutivo"
                ]
            ],
            start_points: 560000,
            points: 600000,
            binary_percent: 0.8,
            bonus: 8000
        },
        diamante_negro: {
            display: i18n?.t('rank_view.ranks.black_diamond') || "Diamante Negro",
            key: "diamante_negro",
            order: 7,
            ranks: [
                [
                    "diamante_premier",
                    "diamante_premier"
                ],
                [
                    "diamante_premier"
                ]
            ],
            start_points: 1160000,
            points: 1500000,
            binary_percent: 0.9,
            bonus: 20000
        },
        diamante_corona: {
            display: i18n?.t('rank_view.ranks.crown_diamond') || "Diamante Corona",
            key: "diamante_corona",
            order: 8,
            ranks: [
                [
                    "diamante_negro",
                    "diamante_negro"
                ],
                [
                    "diamante_negro",
                    "diamante_negro"
                ]
            ],
            start_points: 2660000,
            points: 5000000,
            binary_percent: 0.9,
            bonus: 100000
        },
        diamante_royal: {
            display: i18n?.t('rank_view.ranks.royal_diamond') || "Diamante Royal",
            key: "diamante_royal",
            order: 9,
            ranks: [
                [
                    "diamante_corona",
                    "diamante_corona"
                ],
                [
                    "diamante_corona",
                    "diamante_corona"
                ]
            ],
            start_points: 7660000,
            points: 8000000,
            binary_percent: 1,
            bonus: 200000
        }
    });
const membershipRecord = (i18n)=>({
        "p-100": {
            display: "Plan 100",
            key: "p-100",
            order: 1,
            value: "100",
            pros: [
                i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
                i18n?.t("purchases.membership.benefits.tokenomic_course") || "Curso Tokenomics",
                i18n?.t("purchases.membership.benefits.generates_up_to_3") || "Genera hasta 3x puntos",
                i18n?.t("purchases.membership.benefits.adds_value_up_to_10") || "Agrega valor hasta 10x de tu membresía"
            ],
            image: "/img/memberships/silver.png"
        },
        "p-300": {
            display: "Plan 300",
            key: "p-300",
            order: 2,
            value: "100",
            pros: [
                i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
                i18n?.t("purchases.membership.benefits.tokenomic_course") || "Curso Tokenomics",
                i18n?.t("purchases.membership.benefits.generates_up_to_3") || "Genera hasta 3x puntos",
                i18n?.t("purchases.membership.benefits.adds_value_up_to_10") || "Agrega valor hasta 10x de tu membresía"
            ],
            image: "/img/memberships/gold.png"
        },
        "p-500": {
            display: "Plan 500",
            key: "p-500",
            order: 3,
            value: "100",
            pros: [
                i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
                i18n?.t("purchases.membership.benefits.tokenomic_course") || "Curso Tokenomics",
                i18n?.t("purchases.membership.benefits.binance_trading_bot") || "Bot de Trading Binance",
                i18n?.t("purchases.membership.benefits.generates_up_to_3") || "Genera hasta 3x puntos",
                i18n?.t("purchases.membership.benefits.adds_value_up_to_10") || "Agrega valor hasta 10x de tu membresía"
            ],
            image: "/img/memberships/ruby.png"
        },
        "p-1000": {
            display: "Plan 1000",
            key: "p-1000",
            order: 4,
            value: "100",
            pros: [
                i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
                i18n?.t("purchases.membership.benefits.tokenomic_course") || "Curso Tokenomics",
                i18n?.t("purchases.membership.benefits.binance_trading_bot") || "Bot de Trading Binance",
                i18n?.t("purchases.membership.benefits.trading_signals") || "Señales de Trading",
                i18n?.t("purchases.membership.benefits.live_classes") || "Clases en Vivo",
                i18n?.t("purchases.membership.benefits.generates_up_to_3") || "Genera hasta 3x puntos",
                i18n?.t("purchases.membership.benefits.adds_value_up_to_10") || "Agrega valor hasta 10x de tu membresía"
            ],
            image: "/img/memberships/black.png"
        }
    });
const OPTIONS = [
    {
        label: DISPLAY["p-100"],
        value: "p-100",
        image: "/img/memberships/silver.png"
    },
    {
        label: DISPLAY["p-300"],
        value: "p-300",
        image: "/img/memberships/gold.png"
    },
    {
        label: DISPLAY["p-500"],
        value: "p-500",
        image: "/img/memberships/ruby.png"
    },
    {
        label: DISPLAY["p-1000"],
        value: "p-1000",
        image: "/img/memberships/black.png"
    }
];
const pares = [
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
    "USD-CHF"
];
const orderTypes = [
    {
        label: "SELL",
        value: "sell"
    },
    {
        label: "BUY",
        value: "buy"
    },
    {
        label: "SELL LIMIT",
        value: "sell_limit"
    },
    {
        label: "SELL STOP",
        value: "sell_stop"
    },
    {
        label: "BUY LIMIT",
        value: "buy_limit"
    },
    {
        label: "BUY STOP",
        value: "buy_stop"
    }
];
const paresRecord = {
    AUDCHF: {
        key: "AUDCHF",
        label: "AUD-CHF",
        categorie: "Forex"
    },
    AUDJPY: {
        key: "AUDJPY",
        label: "AUD-JPY",
        categorie: "Forex"
    },
    AUDNZD: {
        key: "AUDNZD",
        label: "AUD-NZD",
        categorie: "Forex"
    },
    AUDUSD: {
        key: "AUDUSD",
        label: "AUD-USD",
        categorie: "Forex"
    },
    BTCUSD: {
        key: "BTCUSD",
        label: "BTC-USD",
        categorie: "Crypto"
    },
    CADCHF: {
        key: "CADCHF",
        label: "CAD-CHF",
        categorie: "Forex"
    },
    CADJPY: {
        key: "CADJPY",
        label: "CAD-JPY",
        categorie: "Forex"
    },
    CHFJPY: {
        key: "CHFJPY",
        label: "CHF-JPY",
        categorie: "Forex"
    },
    EURAUD: {
        key: "EURAUD",
        label: "EUR-AUD",
        categorie: "Forex"
    },
    EURCAD: {
        key: "EURCAD",
        label: "EUR-CAD",
        categorie: "Forex"
    },
    EURCHF: {
        key: "EURCHF",
        label: "EUR-CHF",
        categorie: "Forex"
    },
    EURGBP: {
        key: "EURGBP",
        label: "EUR-GBP",
        categorie: "Forex"
    },
    EURJPY: {
        key: "EURJPY",
        label: "EUR-JPY",
        categorie: "Forex"
    },
    EURNZD: {
        key: "EURNZD",
        label: "EUR-NZD",
        categorie: "Forex"
    },
    EURUSD: {
        key: "EURUSD",
        label: "EUR-USD",
        categorie: "Forex"
    },
    GBPAUD: {
        key: "GBPAUD",
        label: "GBP-AUD",
        categorie: "Forex"
    },
    GBPCAD: {
        key: "GBPCAD",
        label: "GBP-CAD",
        categorie: "Forex"
    },
    GBPCHF: {
        key: "GBPCHF",
        label: "GBP-CHF",
        categorie: "Forex"
    },
    GBPJPY: {
        key: "GBPJPY",
        label: "GBP-JPY",
        categorie: "Forex"
    },
    GBPNZD: {
        key: "GBPNZD",
        label: "GBP-NZD",
        categorie: "Forex"
    },
    GBPUSD: {
        key: "GBPUSD",
        label: "GBP-USD",
        categorie: "Forex"
    },
    GOLD: {
        key: "GOLD",
        label: "GOLD",
        categorie: "Metal"
    },
    NZDCAD: {
        key: "NZDCAD",
        label: "NZD-CAD",
        categorie: "Forex"
    },
    NZDCHF: {
        key: "NZDCHF",
        label: "NZD-CHF",
        categorie: "Forex"
    },
    NZDJPY: {
        key: "NZDJPY",
        label: "NZD-JPY",
        categorie: "Forex"
    },
    NZDUSD: {
        key: "NZDUSD",
        label: "NZD-USD",
        categorie: "Forex"
    },
    US30: {
        key: "US30",
        label: "US30",
        categorie: "Indices"
    },
    US100: {
        key: "US100",
        label: "US100",
        categorie: "Indices"
    },
    US500: {
        key: "US500",
        label: "US500",
        categorie: "Indices"
    },
    USDJPY: {
        key: "USDJPY",
        label: "USD-JPY",
        categorie: "Forex"
    },
    USDCAD: {
        key: "USDCAD",
        label: "USD-CAD",
        categorie: "Forex"
    },
    USDCHF: {
        key: "USDCHF",
        label: "USD-CHF",
        categorie: "Forex"
    }
};
}}),
"[externals]/react-tooltip [external] (react-tooltip, esm_import)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_external_import__("react-tooltip");

__turbopack_export_namespace__(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/components/views/charts/BinaryNode.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
/* eslint-disable jsx-a11y/alt-text */ /* eslint-disable @next/next/no-img-element */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_import__("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/constants.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$29$__ = __turbopack_import__("[externals]/classnames [external] (classnames, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_import__("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$tooltip__$5b$external$5d$__$28$react$2d$tooltip$2c$__esm_import$29$__ = __turbopack_import__("[externals]/react-tooltip [external] (react-tooltip, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$tooltip__$5b$external$5d$__$28$react$2d$tooltip$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$tooltip__$5b$external$5d$__$28$react$2d$tooltip$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
const NodeAvatar = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["forwardRef"])(({ id, name, email, avatar, is_active, x, y, size, onClick, high_membership, membership, membership_status, isSM, rank, i18n }, ref)=>{
    const formattedName = (name)=>{
        if (!name) return "";
        return name.length > 15 ? name?.slice(0, 15) + ".." : name;
    };
    const rankImg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RanksObject"])(i18n)[rank?.key || "none"]?.order;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$29$__["default"])(`absolute  rounded-lg py-4 px-4`, {
                    "h-[180px]": !isSM,
                    "h-[120px]": isSM,
                    "hover:cursor-pointer  shadow-md border-gray-400": Boolean(name)
                }),
                style: {
                    left: x,
                    top: y
                },
                id: id,
                ref: ref,
                onClick: onClick,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        src: `/img/ranks/${rankImg}.png`,
                        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$29$__["default"])("absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-5 w-4/5"),
                        style: {
                            display: high_membership ? "block" : "none"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative flex flex-col items-center space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$29$__["default"])("relative", name && "gradient-border", name && membership_status == "expired" && "before-border-red"),
                                children: name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$29$__["default"])("rounded-full flex items-center justify-center bg-[#f2f3f7] overflow-hidden", {
                                        "h-[150px] w-[150px]": !isSM,
                                        "h-[90px] w-[90px]": isSM
                                    }),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: `/img/ranks/${rankImg}.png`,
                                        className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$29$__["default"])("w-full rounded-full", is_active && "border-green-500 border-solid border", !is_active && "border-red-500 border-solid border"),
                                        alt: ""
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                                        lineNumber: 77,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                                    lineNumber: 68,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$classnames__$5b$external$5d$__$28$classnames$2c$__cjs$29$__["default"])("rounded-full flex items-center justify-center bg-gray-800 overflow-hidden", {
                                        "h-[150px] w-[150px]": !isSM,
                                        "h-[90px] w-[90px]": isSM
                                    }),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: "/img/nopeople.png",
                                        className: "w-[30%]",
                                        alt: ""
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                                        lineNumber: 97,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this),
                            name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "flex flex-col items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-xl font-bold whitespace-nowrap line-clamp-1 z-50",
                                        children: formattedName(name)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                                    lineNumber: 103,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                lineNumber: 37,
                columnNumber: 9
            }, this),
            name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$tooltip__$5b$external$5d$__$28$react$2d$tooltip$2c$__esm_import$29$__["Tooltip"], {
                anchorSelect: "#" + id,
                place: "left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                                lineNumber: 117,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                            lineNumber: 116,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            children: is_active ? "Active" : "Inactive"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                            lineNumber: 119,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                    lineNumber: 115,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/charts/BinaryNode.tsx",
                lineNumber: 114,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true);
});
NodeAvatar.displayName = "NodeAvatar";
const __TURBOPACK__default__export__ = NodeAvatar;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/components/views/charts/BinaryChart.tsx [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_esm__({
    "default": (()=>BinaryChart)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_import__("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_import__("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__ = __turbopack_import__("[externals]/next-auth/react [external] (next-auth/react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWindowSize$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useWindowSize.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$nuqs__$5b$external$5d$__$28$nuqs$2c$__esm_import$29$__ = __turbopack_import__("[externals]/nuqs [external] (nuqs, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$heroui$2f$react__$5b$external$5d$__$2840$heroui$2f$react$2c$__esm_import$29$__ = __turbopack_import__("[externals]/@heroui/react [external] (@heroui/react, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__ = __turbopack_import__("[externals]/arrows-svg [external] (arrows-svg, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/charts/BinaryNode.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$i18next__$5b$external$5d$__$28$react$2d$i18next$2c$__esm_import$29$__ = __turbopack_import__("[externals]/react-i18next [external] (react-i18next, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa/index.mjs [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$nuqs__$5b$external$5d$__$28$nuqs$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$heroui$2f$react__$5b$external$5d$__$2840$heroui$2f$react$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$i18next__$5b$external$5d$__$28$react$2d$i18next$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$nuqs__$5b$external$5d$__$28$nuqs$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$heroui$2f$react__$5b$external$5d$__$2840$heroui$2f$react$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$i18next__$5b$external$5d$__$28$react$2d$i18next$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
;
;
;
;
;
;
function BinaryChart() {
    const i18n = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$i18next__$5b$external$5d$__$28$react$2d$i18next$2c$__esm_import$29$__["useTranslation"])();
    const [userID] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$nuqs__$5b$external$5d$__$28$nuqs$2c$__esm_import$29$__["useQueryState"])("userID");
    const { data } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$next$2d$auth$2f$react__$5b$external$5d$__$28$next$2d$auth$2f$react$2c$__cjs$29$__["useSession"])();
    const [rootNodeId, setRootNodeId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(userID ? userID : data.user.id);
    const [arrowsSetted, setArrows] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [openModal, setOpenModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const { width } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWindowSize$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["default"])();
    const isSM = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>width && width <= 1700, [
        width
    ]);
    const { data: tree, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"])({
        url: `binary/get-tree/${rootNodeId}`,
        method: "get"
    }, [
        rootNodeId
    ]);
    const containerWidth = isSM ? 750 : 1200;
    const initPosition = isSM ? 300 : 700 - 150;
    const renderarrow = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        const head = {
            func: ()=>{
                return {
                    node: '<rect x="-10" y="-10" width="20" height="25" style="display: none" />',
                    width: 1,
                    height: 1
                };
            }
        };
        const wrapper = document.querySelector("#treeWrapper");
        const nodemain = document.querySelector("#node-main");
        const left = document.querySelector("#left");
        const right = document.querySelector("#right");
        const left_left = document.querySelector("#left-left");
        const left_right = document.querySelector("#left-right");
        const right_left = document.querySelector("#right-left");
        const right_right = document.querySelector("#right-right");
        if (wrapper && nodemain && !arrowsSetted) {
            setArrows(true);
            const arrow1 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["default"])({
                head,
                from: {
                    node: nodemain,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].LEFT
                },
                to: {
                    node: left,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].TOP
                }
            });
            wrapper.appendChild(arrow1.node);
            const arrow2 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["default"])({
                head,
                from: {
                    node: nodemain,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].RIGHT
                },
                to: {
                    node: right,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].TOP
                }
            });
            wrapper.appendChild(arrow2.node);
            const arrow3 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["default"])({
                head,
                from: {
                    node: left,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].BOTTOM
                },
                to: {
                    node: left_left,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].TOP
                }
            });
            wrapper.appendChild(arrow3.node);
            const arrow4 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["default"])({
                head,
                from: {
                    node: left,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].BOTTOM
                },
                to: {
                    node: left_right,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].TOP
                }
            });
            wrapper.appendChild(arrow4.node);
            const arrow5 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["default"])({
                head,
                from: {
                    node: right,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].BOTTOM
                },
                to: {
                    node: right_left,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].TOP
                }
            });
            wrapper.appendChild(arrow5.node);
            const arrow6 = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["default"])({
                head,
                from: {
                    node: right,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].BOTTOM
                },
                to: {
                    node: right_right,
                    direction: __TURBOPACK__imported__module__$5b$externals$5d2f$arrows$2d$svg__$5b$external$5d$__$28$arrows$2d$svg$2c$__cjs$29$__["DIRECTION"].TOP
                }
            });
            wrapper.appendChild(arrow6.node);
        }
    }, []);
    const showLeft = async ()=>{
        if (data.user.id == rootNodeId) {
            setOpenModal("left");
        }
    };
    const showRight = async ()=>{
        if (data.user.id == rootNodeId) {
            setOpenModal("right");
        }
    };
    const closeModal = ()=>{
        setOpenModal(null);
    };
    if (!tree) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        id: "treeWrapper",
        className: "w-full card h-full overflow-auto flex justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "relative",
            style: {
                width: containerWidth,
                paddingBottom: 40
            },
            children: [
                rootNodeId != data.user.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "absolute left-1 top-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$heroui$2f$react__$5b$external$5d$__$2840$heroui$2f$react$2c$__esm_import$29$__["Button"], {
                                onPress: ()=>setRootNodeId(data.user.id),
                                isLoading: loading,
                                children: i18n.t("my_team.binary.home")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                lineNumber: 208,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 207,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "absolute left-1 top-14",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$heroui$2f$react__$5b$external$5d$__$2840$heroui$2f$react$2c$__esm_import$29$__["Button"], {
                                disabled: loading,
                                onPress: ()=>setRootNodeId(tree.tree.data.parent_binary_user_id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaChevronUp"], {}, void 0, false, {
                                    fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                    lineNumber: 222,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                lineNumber: 216,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 215,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                left: initPosition - 100,
                                top: 10
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: showLeft,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                    children: [
                                        i18n.t("my_team.binary.left"),
                                        ": ",
                                        tree?.left_points,
                                        " pts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                left: initPosition + 320,
                                top: 10
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: showRight,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("b", {
                                    children: [
                                        i18n.t("my_team.binary.right"),
                                        ": ",
                                        tree?.right_points,
                                        " pts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                    lineNumber: 244,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    ...tree.tree.data,
                    isSM: isSM,
                    id: "node-main",
                    x: initPosition,
                    y: 10,
                    ref: renderarrow,
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                    lineNumber: 251,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                    children: [
                        tree.tree.left ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ...tree.tree.left.data,
                            isSM: isSM,
                            id: "left",
                            x: initPosition - (isSM ? 200 : 300),
                            y: isSM ? 130 : 220,
                            onClick: ()=>setRootNodeId(tree.tree.left.data.id),
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 263,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            id: "left",
                            x: initPosition - (isSM ? 200 : 300),
                            y: isSM ? 130 : 220,
                            isSM: isSM,
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 273,
                            columnNumber: 13
                        }, this),
                        tree.tree.right ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ...tree.tree.right.data,
                            isSM: isSM,
                            id: "right",
                            x: initPosition + (isSM ? 220 : 300),
                            y: isSM ? 130 : 220,
                            onClick: ()=>setRootNodeId(tree.tree.right.data.id),
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 282,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            id: "right",
                            x: initPosition + (isSM ? 220 : 300),
                            y: isSM ? 130 : 220,
                            isSM: isSM,
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                    children: [
                        tree.tree.left?.left ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ...tree.tree.left.left.data,
                            isSM: isSM,
                            id: "left-left",
                            x: initPosition - (isSM ? 300 : 430),
                            y: isSM ? 300 : 450,
                            size: "s",
                            onClick: ()=>setRootNodeId(tree.tree.left.left.data.id),
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 304,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            id: "left-left",
                            isSM: isSM,
                            x: initPosition - (isSM ? 300 : 430),
                            y: isSM ? 300 : 450,
                            size: "s",
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 315,
                            columnNumber: 13
                        }, this),
                        tree.tree.left?.right ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ...tree.tree.left.right.data,
                            isSM: isSM,
                            id: "left-right",
                            x: initPosition - (isSM ? 100 : 160),
                            y: isSM ? 300 : 450,
                            size: "s",
                            onClick: ()=>setRootNodeId(tree.tree.left.right.data.id),
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 325,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            id: "left-right",
                            isSM: isSM,
                            x: initPosition - (isSM ? 100 : 160),
                            y: isSM ? 300 : 450,
                            size: "s",
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 336,
                            columnNumber: 13
                        }, this),
                        tree.tree.right?.left ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ...tree.tree.right.left.data,
                            isSM: isSM,
                            id: "right-left",
                            x: initPosition + (isSM ? 110 : 170),
                            y: isSM ? 300 : 450,
                            size: "s",
                            onClick: ()=>setRootNodeId(tree.tree.right.left.data.id),
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 347,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            id: "right-left",
                            isSM: isSM,
                            x: initPosition + (isSM ? 110 : 170),
                            y: isSM ? 300 : 450,
                            size: "s",
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 358,
                            columnNumber: 13
                        }, this),
                        tree.tree.right?.right ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            ...tree.tree.right.right.data,
                            isSM: isSM,
                            id: "right-right",
                            x: initPosition + (isSM ? 330 : 450),
                            y: isSM ? 300 : 450,
                            size: "s",
                            onClick: ()=>setRootNodeId(tree.tree.right.right.data.id),
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 368,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$charts$2f$BinaryNode$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            id: "right-right",
                            isSM: isSM,
                            x: initPosition + (isSM ? 330 : 450),
                            y: isSM ? 300 : 450,
                            size: "s",
                            i18n: i18n
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 379,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                left: initPosition - (isSM ? 280 : 380),
                                top: initPosition + (isSM ? 160 : 120)
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$heroui$2f$react__$5b$external$5d$__$2840$heroui$2f$react$2c$__esm_import$29$__["Button"], {
                                onPress: ()=>setRootNodeId(tree.tree.left.data.id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaChevronDown"], {}, void 0, false, {
                                    fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                    lineNumber: 396,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "absolute",
                            style: {
                                left: initPosition + (isSM ? 355 : 500),
                                top: initPosition + (isSM ? 160 : 120)
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$heroui$2f$react__$5b$external$5d$__$2840$heroui$2f$react$2c$__esm_import$29$__["Button"], {
                                onPress: ()=>setRootNodeId(tree.tree.right.data.id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaChevronDown"], {}, void 0, false, {
                                    fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                    lineNumber: 407,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                                lineNumber: 406,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
                            lineNumber: 399,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
            lineNumber: 201,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/views/charts/BinaryChart.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/services/index.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_import__("[externals]/axios [external] (axios, esm_import)");
;
__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].defaults.baseURL = ("TURBOPACK compile-time value", "https://dota-api-1039762081728.us-central1.run.app");
const BASE_URL = ("TURBOPACK compile-time value", "https://dota-api-1039762081728.us-central1.run.app");
const axiosInstance = __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].create({
    baseURL: BASE_URL
});
const __TURBOPACK__default__export__ = axiosInstance;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/@heroui/react [external] (@heroui/react, esm_import)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_external_import__("@heroui/react");

__turbopack_export_namespace__(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/react-i18next [external] (react-i18next, esm_import)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_external_import__("react-i18next");

__turbopack_export_namespace__(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__7bf4eb._.js.map