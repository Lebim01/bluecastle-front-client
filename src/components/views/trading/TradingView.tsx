/* eslint-disable no-var */
import dynamic from "next/dynamic";

const SingleTicker = dynamic(
  () => import("react-ts-tradingview-widgets").then((w) => w.SingleTicker),
  {
    ssr: false,
  }
);

const TradingViewWidget = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 w-full gap-4">
      <div>
        <SingleTicker
          colorTheme="dark"
          width="100%"
          symbol="FOREXCOM:NSXUSD"
        ></SingleTicker>
      </div>
      <div>
        <SingleTicker
          colorTheme="dark"
          width="100%"
          symbol="FX_IDC:EURUSD"
        ></SingleTicker>
      </div>
      <div>
        <SingleTicker
          colorTheme="dark"
          width="100%"
          symbol="BITSTAMP:BTCUSD"
        ></SingleTicker>
      </div>
      <div>
        <SingleTicker
          colorTheme="dark"
          width="100%"
          symbol="BITSTAMP:ETHUSD"
        ></SingleTicker>
      </div>
    </div>
  );
};

export default TradingViewWidget;
