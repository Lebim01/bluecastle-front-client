import CardDota from "@/components/utils/cards/Card";
import { formatNumberWithCommas } from "@/components/utils/formats/formatNumbers";
import useAxios from "@/hooks/useAxios";
import { Progress } from "@heroui/react";
import i18n from "i18next";
import { FC } from "react";
import { UseTranslationResponse } from "react-i18next";

type Props = {
  i18n: UseTranslationResponse<"ns1", undefined>;
};

const InvestmentCard: FC<Props> = ({ i18n }) => {
  const { data } = useAxios<{ limit: number; deposits: number }>({
    url: "users/current-deposit",
    method: "get",
    defaultValue: "0",
  });

  const percent = data?.deposits ? (data.deposits / data?.limit) * 100 : 0;

  return (
    <CardDota classNames="flex flex-col gap-2 items-center">
      <span className="text-3xl font-bold text-dota">
        {i18n.t("dashboard_view.portfolio_banner.portfolio")}
      </span>
      <span className="text-[12px] ">
        {i18n.t("dashboard_view.portfolio_banner.add_value_up_to")} 10x
      </span>
      <div className="flex items-center gap-1">
        <span>Current</span>
        <span className="text-[12px]">$</span>
        <span className="text-[24px] font-bold">
          {formatNumberWithCommas(data?.deposits, 0)}
        </span>
        <span className="text-[12px]">USD</span>
      </div>
      <div className="flex items-center gap-1">
        <span>Limit</span>
        <span className="text-[12px]">$</span>
        <span className="text-[24px] font-bold">
          {formatNumberWithCommas(data?.limit, 0)}
        </span>
        <span className="text-[12px]">USD</span>
      </div>
    </CardDota>
  );
};

export default InvestmentCard;
