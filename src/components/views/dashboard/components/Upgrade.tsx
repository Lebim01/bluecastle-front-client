/* eslint-disable @next/next/no-img-element */
import CardDota from "@/components/utils/cards/Card";
import { membershipRecord, Memberships } from "@/constants";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/router";
import { UseTranslationResponse } from "react-i18next";
import { FC } from "react";
import classNames from "classnames";

type Props = {
  i18n: UseTranslationResponse<"ns1", undefined>;
};

const Upgrade: FC<Props> = ({ i18n }) => {
  const { data: membership } = useAxios<{ membership: Memberships | null }>({
    url: "users/current-membership",
    method: "get",
    defaultValue: {
      membership: null,
    },
  });

  const membership_object = membershipRecord(i18n);
  const sortedMemberships = Object.keys(membership_object) as Memberships[];

  const router = useRouter();
  const nextMembership: Memberships =
    membership?.membership == null
      ? membership_object["p-100"].key
      : membership.membership &&
        sortedMemberships.find((m) => {
          return (
            membership_object[m]?.order >
            membership_object[membership.membership as Memberships]?.order
          );
        })!;

  const have_membership = Boolean(membership?.membership);

  return (
    <CardDota classNames="!border-white !p-0 flex items-center relative h-[250px]">
      <img
        src="/img/memberships/package-1.png"
        className={classNames(
          "w-full object-cover rounded-lg h-full",
          !have_membership && "opacity-40"
        )}
        alt=""
      />
      <div className="absolute left-10 text-white font-outline font-bold text-2xl top-10">
        <span>
          {membership?.membership
            ? `${i18n.t("dashboard_view.banner_upgrade.membership")} ${
                membership_object[membership.membership]?.display
              }`
            : "You have not a membership"}
        </span>
      </div>
      <div className="absolute bottom-0 p-4 flex items-center  backdrop-blur-lg w-full rounded-b-lg">
        {nextMembership && membership_object[nextMembership] ? (
          <div className="flex items-center justify-between w-full">
            <span
              className={classNames(
                "text-black w-80",
                !have_membership && "text-white"
              )}
            >
              {i18n.t("dashboard_view.banner_upgrade.upgrade_your_membership")}{" "}
              {nextMembership && membership_object[nextMembership]?.display}
            </span>
            <div
              className="bg-blue-600 px-6 py-3 rounded-full cursor-pointer"
              onClick={() => router.push("purchases/membership")}
            >
              <span>{i18n.t("dashboard_view.banner_upgrade.upgrade")}</span>
            </div>
          </div>
        ) : (
          <span className="text-black text-center">
            Ya cuentas con la membresia mas alta
          </span>
        )}
      </div>
    </CardDota>
  );
};

export default Upgrade;
