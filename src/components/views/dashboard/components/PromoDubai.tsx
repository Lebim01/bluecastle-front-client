import useAxios from "@/hooks/useAxios";
import { MyRank } from "@/types/Rank";
import { Card, CardFooter, CardHeader, Image, Progress } from "@heroui/react";
import { useSession } from "next-auth/react";
import i18n from "i18next";
import { UseTranslationResponse } from "react-i18next";
import { FC } from "react";
import { RanksObject } from "@/constants";

type Props = {
  i18n: UseTranslationResponse<"ns1", undefined>;
};

const PromoDubai: FC<Props> = ({ i18n }) => {
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
    <Card isFooterBlurred className="w-full h-[300px]">
      <CardHeader className="absolute z-10 top-1 justify-between">
        <div className="flex flex-col items-start">
          <p className="text-tiny text-gray-900 uppercase font-bold">
            {i18n.t("dashboard_view.banner_promotional.promotional_bonus")}
          </p>
          <h4 className="text-gray-900 font-medium text-xl">
            {i18n.t("dashboard_view.banner_promotional.dubai_travel")}
          </h4>
        </div>
        <Image
          src="/img/logo-dark.svg"
          height={30}
          width={100}
          alt="logo"
          className="rounded-none"
        />
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover object-center"
        src="/img/dubai.webp"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-10 bg-black"
            src="/img/ranks/2.png"
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">
              {i18n.t("dashboard_view.banner_promotional.requirement_rank")}:
            </p>
            <p className="text-tiny text-white/60 uppercase">{i18n.t('rank_view.ranks.director_premier')} (30K)</p>
          </div>
        </div>
        {rank && rank.points && (
          <Progress
            showValueLabel
            label={i18n.t("dashboard_view.banner_promotional.progress")}
            className="w-[200px]"
            classNames={{
              indicator: "bg-gradient-to-r from-primary to-secondary",
              label: "tracking-wider font-medium text-default-600 text-[12px]",
              value: "text-foreground/60 text-[12px]",
            }}
            value={
              ((rank?.points[rank?.points?.smaller] || 1) /
                (RanksObject().director_premier.start_points +
                  RanksObject().director_premier.points)) *
              100
            }
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default PromoDubai;
