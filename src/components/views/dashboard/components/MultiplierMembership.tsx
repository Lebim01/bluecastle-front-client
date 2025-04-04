import CardDota from "@/components/utils/cards/Card";
import { formatNumberWithCommas } from "@/components/utils/formats/formatNumbers";
import useAxios from "@/hooks/useAxios";
import { Progress } from "@heroui/react";
import i18n from 'i18next';
import { FC } from "react";
import { UseTranslationResponse } from "react-i18next";

type Points  = { limit: number; current: number }

type Props = {
  i18n: UseTranslationResponse<"ns1", undefined>
}

const MultiplierMembership:FC<Props> = ({i18n}) => {
  const { data } = useAxios<{ membership: Points, deposit: Points }>({
    url: "users/current-multiplier",
    method: "get",
    defaultValue: {}
  })
  const percent = data?.membership?.current ? (data.membership.current / data.membership.limit) * 100 : 0;
  return (
    <CardDota classNames="flex flex-col gap-2 items-center">
      <span className="text-3xl font-bold text-dota">{i18n.t('dashboard_view.multiplier_banner.multiplier')} (M)</span>
      <span className="text-[12px] ">{i18n.t('dashboard_view.multiplier_banner.up_to')} 3x ({i18n.t('dashboard_view.multiplier_banner.membership')})</span>
      <div className="flex items-center gap-1">
        <span className="text-[12px]">$</span>{" "}
        <span className="text-[28px] font-bold">
          {formatNumberWithCommas(data?.membership?.limit, 0)}
        </span>
        <span className="text-[12px]">USD</span>
      </div>
      <Progress value={percent} />
      <span className="text-lg">
        $ {formatNumberWithCommas(data?.membership?.current, 0)} USD / ${" "}
        {formatNumberWithCommas(data?.membership?.limit, 0)} USD
      </span>
    </CardDota>
  );
};

export default MultiplierMembership;
