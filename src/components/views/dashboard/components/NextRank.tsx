/* eslint-disable @next/next/no-img-element */
import CardDota from "@/components/utils/cards/Card";
import useAxios from "@/hooks/useAxios";
import { MyRank, Rank, RanksMap } from "@/types/Rank";
import { Progress } from "@heroui/react";
import { useSession } from "next-auth/react";
import { FC, useEffect, useMemo, useState } from "react";
import { UseTranslationResponse } from "react-i18next";

type Props = {
  i18n: UseTranslationResponse<"ns1", undefined>;
};

const NextRank: FC<Props> = ({ i18n }) => {
  const { data } = useSession();
  const [nextRank, setNextRank] = useState<Rank | null>(null);
  const { data: ranks } = useAxios<RanksMap>({
    url: "ranks/list",
    method: "get",
  });

  const { data: rank } = useAxios<MyRank>(
    {
      url: "ranks/getUserRank",
      method: "post",
      postData: {
        id_user: data?.user?.id,
      },
      defaultValue: {},
    },
    [data?.user?.id]
  );

  const calculateNextRank = () => {
    if (!rank || !ranks) return null;
    const nextRank = Object.values(ranks).find(
      (r) => r.order == rank.order + 1
    );
    setNextRank(nextRank || null);
  };

  useEffect(() => {
    calculateNextRank();
  }, [rank, ranks]);

  const percent = useMemo(() => {
    if (!rank) return 0;
    if (!nextRank) return 0;
    return (rank?.points[rank?.points.smaller] / nextRank?.points) * 100;
  }, [rank, nextRank]);

  return (
    <CardDota classNames="flex flex-col gap-1 items-center">
      <div className="flex flex-col gap-4">
        <span className="text-3xl font-bold text-dota">
          {i18n.t("dashboard_view.rank_banner.next_rank")}
        </span>
        {/*<ButtonDota rounded="lg">
          <span className="font-bold">VER RANGOS</span>
        </ButtonDota>*/}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2 items-center">
          <img
            src={`/img/ranks/${rank?.order || "0"}.png`}
            className="w-[100px] rounded-full"
            alt=""
          />
          <span className="text-[12px]">
            {i18n.t("dashboard_view.rank_banner.current_rank")}
          </span>
          <span className="text-xl">{rank?.rank?.display || "Sin rango"}</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <img
            src={`/img/ranks/${nextRank?.order || "0"}.png`}
            className="w-[100px] rounded-full"
            alt=""
          />
          <span className="text-[12px]">
            {i18n.t("dashboard_view.rank_banner.next_rank")}
          </span>
          <span className="text-xl">{nextRank?.display || "Sin rango"}</span>
        </div>
      </div>
      <Progress value={percent} />
      <div className="flex justify-between w-full">
        <span>{rank?.rank?.points || 0}</span>
        <span>{i18n.t("dashboard_view.rank_banner.shorter_leg")}</span>
        <span>{nextRank?.points || 0}</span>
      </div>
    </CardDota>
  );
};

export default NextRank;
