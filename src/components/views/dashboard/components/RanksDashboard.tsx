/* eslint-disable @next/next/no-img-element */
import CardDota from "@/components/utils/cards/Card";
import useAxios from "@/hooks/useAxios";
import { MyRank } from "@/types/Rank";
import { useSession } from "next-auth/react";
import { UseTranslationResponse } from "react-i18next";
import { FC } from "react";

type Props = {
  i18n: UseTranslationResponse<"ns1", undefined>;
};

const RankDashboard: FC<Props> = ({ i18n }) => {
  const { data } = useSession();
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

  return (
    <CardDota classNames="flex flex-col gap-8">
      <div className="flex justify-center">
        <span className="text-3xl font-bold text-dota">
          {i18n.t("dashboard_view.rank_banner.current_rank")}
        </span>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col items-center">
          <h3 className="mb-2 font-bold">{rank?.rank?.display}</h3>
          <img
            src={`/img/ranks/${rank?.order || "0"}.png`}
            className="w-[100px] rounded-lg"
            alt=""
          />
          <span className="bg-primary text-white font-bold px-2 py-1 rounded-lg text-center shadow-md shadow-gray-500">
            {i18n.t("dashboard_view.rank_banner.rank")} <br />
            {i18n.t("dashboard_view.rank_banner.classified")}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-end">
            <span className="text-lg">
              {i18n.t("dashboard_view.rank_banner.left_points")}
            </span>
            <span className="text-primary">{rank?.points?.left}</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-lg">
              {i18n.t("dashboard_view.rank_banner.right_points")}
            </span>
            <span className="text-primary">{rank?.points?.right}</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-lg">
              {i18n.t("dashboard_view.rank_banner.shorter_leg")}
            </span>
            <span className="text-primary lowercase ">
              {rank?.points?.smaller == "left"
                ? i18n.t("dashboard_view.banner_referral.left")
                : i18n.t("dashboard_view.banner_referral.right")}
            </span>
          </div>
        </div>
      </div>
    </CardDota>
  );
};

export default RankDashboard;
