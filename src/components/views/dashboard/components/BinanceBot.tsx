/* eslint-disable @next/next/no-img-element */
import CardDota from "@/components/utils/cards/Card";
import { Memberships } from "@/constants";
import useAxios from "@/hooks/useAxios";
import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

// deploy

const BinanceBot = () => {
  const { data } = useSession();
  const i18n = useTranslation();
  const { data: membership } = useAxios<{ membership: Memberships | null }>({
    url: "users/current-membership",
    method: "get",
    defaultValue: {
      membership: null,
    },
  });

  if (!membership?.membership) return null;
  if (["p-100", "p-300"].includes(membership?.membership)) return null;

  const openWhatsapp = () => {
    const phone = `573163058064`;
    const message = encodeURI(
      `Soy ${data?.user.email}, quiero conectar mi bot de binance`
    );
    window.open(
      ` https://api.whatsapp.com/send?phone=${phone}&text=${message}`
    );
  };

  return (
    <CardDota classNames="col-span-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Binance_logo.svg/1280px-Binance_logo.svg.png"
            className="h-[50px]"
            alt="binance"
          />
          <span className="text-xl font-bold">
            {i18n.t("dashboard_view.binance_bot.get_bot")}
          </span>
        </div>
        <Button onPress={openWhatsapp}>
          <span className="text-[14px] font-bold uppercase">
            {i18n.t("dashboard_view.binance_bot.get_button")}
          </span>
        </Button>
      </div>
    </CardDota>
  );
};

export default BinanceBot;
