/* eslint-disable @next/next/no-img-element */
import { formatNumberWithCommas } from "@/components/utils/formats/formatNumbers";
import { RanksObject } from "@/constants";
import useAxios from "@/hooks/useAxios";
import { MyRank, Rank } from "@/types/Rank";
import { Card, Spinner, Tooltip } from "@heroui/react";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const Ranks = () => {
  const { data } = useSession();
  const i18n = useTranslation()
  const ranks_translated = RanksObject(i18n)
  const ranks_constant = Object.values(ranks_translated).filter(
    (rank) => rank.key != "none"
  );
  const {
    data: actual_rank,
    refetch,
    loading,
  } = useAxios<MyRank>({
    url: "ranks/getUserRank",
    method: "post",
    postData: {
      id_user: data?.user.id,
    },
    defaultValue: {
      points: {},
      rank: {},
    },
  });

  useEffect(() => {
    refetch();
  }, [data?.user.id]);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="card">
          <div className="flex flex-col">
            <div>
              <span>{i18n.t('rank_view.your_actual_score')}: </span>
              <span className="text-primary">{actual_rank?.rank && ranks_translated[actual_rank?.rank.key]?.display}</span>
            </div>
            <div className="hidden">
              <span>Puntos izq:</span>{" "}
              <span className="text-primary">{actual_rank?.points.left}</span>
            </div>
            <div className="hidden">
              <span>Puntos der:</span>{" "}
              <span className="text-primary">{actual_rank?.points.right}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ranks_constant.map((rank, index) => (
          <RankCard key={index} rank={rank} actual={actual_rank!} />
        ))}
      </div>
    </div>
  );
};

export default Ranks;

type Props = {
  rank: Rank;
  actual: MyRank;
};

const RankCard: FC<Props> = ({ rank, actual }) => {
  const points_left =
    actual.points.left > rank.points
      ? rank.points
      : actual.points.left - rank.start_points;
  const points_right =
    actual.points.right > rank.points
      ? rank.points
      : actual.points.right - rank.start_points;

  const percent_left = (points_left / rank.points) * 100;
  const percent_right = (points_right / rank.points) * 100;

  return (
    <Card
      className={classNames(
        "flex items-center flex-col gap-4 card",
        rank.order <= actual.order + 1 &&
          "border border-green-300/50 shadow-gray-400/40 shadow-md"
      )}
    >
      <div className="flex justify-center">
        <img
          src={`/img/ranks/${rank.order}.png`}
          className={`w-full max-w-[250px] aspect-square`}
          alt=""
        />
      </div>
      <span className="text-3xl text-dota">{rank.display}</span>

      <div className="grid grid-cols-2 w-full place-items-center">
        <div className="text-lg font-bold">IZQ</div>
        <div className="text-lg font-bold">DER</div>

        <div className="text-dota font-bold">
          {formatNumberWithCommas(rank.points)}
        </div>
        <div className="text-dota font-bold">
          {formatNumberWithCommas(rank.points)}
        </div>

        {rank.order <= actual.order + 1 && (
          <>
            <div className="border-t border-solid">
              {formatNumberWithCommas(points_left)}
            </div>
            <div className="border-t border-solid">
              {formatNumberWithCommas(points_right)}
            </div>

            <div className="text-gray-300/40">
              {formatNumberWithCommas(
                percent_left > 100 ? 100 : percent_left,
                2
              )}{" "}
              %
            </div>
            <div className="text-gray-300/40">
              {formatNumberWithCommas(
                percent_right > 100 ? 100 : percent_right,
                2
              )}
              %
            </div>

            <div>
              {points_left >= rank.points ? (
                <FaCheck className="text-success" />
              ) : (
                <Tooltip
                  content={`Faltan ${formatNumberWithCommas(
                    rank.points - points_left
                  )} puntos`}
                >
                  <FaTimes className="text-danger" />
                </Tooltip>
              )}
            </div>
            <div>
              {points_right >= rank.points ? (
                <FaCheck className="text-success" />
              ) : (
                <Tooltip
                  content={`Faltan ${formatNumberWithCommas(
                    rank.points - points_right
                  )} puntos`}
                >
                  <FaTimes className="text-danger" />
                </Tooltip>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
