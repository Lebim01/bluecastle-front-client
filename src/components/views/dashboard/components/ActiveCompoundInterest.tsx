/* eslint-disable @next/next/no-img-element */
import CardDota from "@/components/utils/cards/Card";
import { useRouter } from "next/router";
import i18n from "i18next";
import { UseTranslationResponse } from "react-i18next";
import { FC } from "react";
import useAxios from "@/hooks/useAxios";

type Props = {
  i18n: UseTranslationResponse<"ns1", undefined>;
};

const ActiveCompoundInterest: FC<Props> = ({ i18n }) => {
  const { data, loading } = useAxios<{
    is_active: boolean;
  }>({
    method: "get",
    url: "deposits/active-compound-interest",
    defaultValue: {
      is_active: false,
    },
  });
  const router = useRouter();

  return (
    <CardDota classNames=" !border-white !p-0 flex items-center relative h-[200px]">
      <img
        src="/img/memberships/package-3.png"
        className="w-full object-cover rounded-lg h-full object-top"
        alt=""
      />
      <div className="absolute left-10 text-white font-bold text-2xl top-10">
        <span>
          {i18n.t("dashboard_view.compound_interest_banner.compound_interest")}
        </span>
      </div>
      <div className="absolute bottom-0 p-4 flex items-center  backdrop-blur-lg w-full rounded-b-lg">
        {!data?.is_active ? (
          <div className="flex items-center justify-between w-full">
            <span className="text-white">
              {i18n.t("dashboard_view.compound_interest_banner.you_can_now")}
            </span>
            <div
              className="bg-yellow-500 text-black px-6 py-3 rounded-full cursor-pointer"
              onClick={() => router.push("investment/list")}
            >
              <span>
                {i18n.t("dashboard_view.compound_interest_banner.activate")}
              </span>
            </div>
          </div>
        ) : (
          <span className="text-black text-center">
            {i18n.t("dashboard_view.compound_interest_banner.you_already_have")}
          </span>
        )}
      </div>
    </CardDota>
  );
};

export default ActiveCompoundInterest;
