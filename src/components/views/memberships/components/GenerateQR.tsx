/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import { User } from "@/types/User";
import ButtonDota from "@/components/utils/cards/ButtonDota";
import { membershipRecord, Memberships } from "@/constants";
import { useTranslation } from "react-i18next";

const GenerateQR = ({
  type,
  loading,
  createPaymentLink,
  refetch,
  active,
}: {
  type: Memberships;
  loading: boolean;
  createPaymentLink: (type: Memberships) => void;
  refetch: () => void;
  active: Memberships | null;
}) => {
  const [showCoin, setShowCoin] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { data: user } = useAxios<User>({ url: "users/me", method: "get" });
  const i18n = useTranslation()
  const _create = () => {
    try {
      setDisabled(true);
      setShowCoin(false);
      createPaymentLink(type);
    } catch (err) {
      console.error(err);
    } finally {
      setDisabled(false);
    }
  };

  const selectCoin = () => {
    setShowCoin(true);
  };

  useEffect(() => {
    const setMembership = async () => {
      if (!user) return;
      const isActiveMembership = user.membership === type;

      if (isActiveMembership) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    };

    setMembership();
  }, [user?.membership]);
  const membershipObject = membershipRecord()
  if (showCoin) {
    return (
      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-x-4">
          <ButtonDota
            classNames="h-max bg-gradient-to-r !px-1 from-gray-200 to-yellow-300"
            disabled={false}
            onClick={_create}
            rounded="lg"
          >
            <div className="flex flex-row justify-center truncate items-center gap-4">
              <img
                src="/img/tetherbep20.png"
                height={50}
                width={50}
                className="h-[50px] w-[50px]"
              />
              <span className="text-black text-2xl">Tether (USDT)</span>
            </div>
          </ButtonDota>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <ButtonDota
        classNames="w-full text-sm xl:text-xl 3xl:text-2xl h-[76px] truncate hover:text-white duration-300"
        rounded="lg"
        disabled={disabled}
        loading={loading}
        onClick={selectCoin}
      >
        {active && membershipObject[type].order > membershipObject[type].order
          ? "Upgrade"
          : i18n.t('menu.buy_membership')}
      </ButtonDota>
    </div>
  );
};

export default GenerateQR;
