import { GoArrowSwitch } from "react-icons/go";
import { FaBitcoin } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";

export const currencyIcon = {
  BTC: <FaBitcoin />,
  LTC: (
    <img
      src="/img/ltc-logo.svg"
      height={12}
      width={12}
      className="h-[12px] w-[12px]"
    />
  ),
  MXN: <SiCashapp />,
  USDT: (
    <img
      src="/img/tether.png"
      height={12}
      width={12}
      className="h-[12px] w-[12px]"
    />
  ),
};

const ButtonSwapCurrency = ({
  createPaymentLink,
  type,
}: {
  createPaymentLink: any;
  type: string;
}) => {
  return (
    <button
      className="border border-gray-200 rounded-lg p-2 flex items-center space-x-2 hover:bg-gray-200"
      title="Cambiar de moneda"
      onClick={() => createPaymentLink(type)}
    >
      <span>
        <GoArrowSwitch />
      </span>
      <span>USDT</span>
    </button>
  );
};

export default ButtonSwapCurrency;
