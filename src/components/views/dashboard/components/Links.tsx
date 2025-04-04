import ButtonDota from "@/components/utils/cards/ButtonDota";
import CardDota from "@/components/utils/cards/Card";
import useAxios from "@/hooks/useAxios";
import { User } from "@/types/User";
import classNames from "classnames";
import { FC, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UseTranslationResponse } from "react-i18next";

type LinkProps = {
  className?: string;
  children: ReactNode;
  activePosition: string | null;
  position: "left" | "right";
  onClick: () => void;
};

const Link = (props: LinkProps) => {
  return (
    <div
      className={classNames(
        "border cursor-pointer flex items-center w-full justify-center transition ease-in-out delay-150 hover:border-r-0 duration-200 hover:border-[#DADADA] hover:scale-110 overflow-hidden hover:bg-white hover:text-black",
        props.position == props.activePosition && "bg-primary",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

type Props = {
  i18n: UseTranslationResponse<"ns1", undefined>;
};

const Links: FC<Props> = ({ i18n }) => {
  const [position, setPosition] = useState<"left" | "right" | null>(null);

  const { data: user } = useAxios<User>({ url: "users/me", method: "get" });

  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const copyToClipboard = async () => {
    if (user?.id) {
      const linkCopied = `https://${host}/signup/${user.id}/${
        position == "left" ? user.left : user.right
      }`;
      await navigator.clipboard.writeText(linkCopied);
      toast.success("Url copiado con éxito");
      return linkCopied;
    }
  };

  return (
    <div>
      <CardDota classNames="flex flex-col gap-4 items-center">
        <div className="flex flex-col items-center">
          <span className="text-lg">
            {i18n.t("dashboard_view.banner_referral.referral_link")}
          </span>
          <div className="flex">
            <Link
              activePosition={position}
              position="left"
              className="rounded-l-lg"
              onClick={() => {
                setPosition("left");
              }}
            >
              <div className="py-3 px-6">
                <span className="font-bold">
                  {" "}
                  {i18n.t("dashboard_view.banner_referral.left")}
                </span>
              </div>
            </Link>
            <Link
              activePosition={position}
              position="right"
              className="rounded-r-lg"
              onClick={() => {
                setPosition("right");
              }}
            >
              <div className="py-3 px-6">
                <span className="font-bold">
                  {" "}
                  {i18n.t("dashboard_view.banner_referral.right")}
                </span>
              </div>
            </Link>
          </div>
        </div>
        <CardDota classNames="flex items-center justify-center w-full">
          {position ? (
            <span className="text-center">
              {i18n.t("dashboard_view.banner_referral.we_will")}
              <br />
              <span className="font-bold uppercase">
                {position == "left"
                  ? i18n.t("dashboard_view.banner_referral.left")
                  : i18n.t("dashboard_view.banner_referral.right")}
              </span>{" "}
              {i18n.t("dashboard_view.banner_referral.side")}
            </span>
          ) : (
            <span>
              {i18n.t("dashboard_view.banner_referral.choose_the_placement")}
            </span>
          )}
        </CardDota>
        <div className="flex gap-4 w-full">
          <ButtonDota
            disabled={!position}
            rounded="lg"
            classNames="w-full bg-primary font-bold hover:bg-secondary"
            onClick={() => copyToClipboard()}
          >
            {i18n.t("dashboard_view.banner_referral.copy")}
          </ButtonDota>
        </div>
      </CardDota>
    </div>
  );
};

export default Links;
