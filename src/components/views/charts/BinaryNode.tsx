/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { DISPLAY, Memberships, RanksObject } from "@/constants";
import classNames from "classnames";
import { forwardRef } from "react";
import { Tooltip } from "react-tooltip";
import { RankKey } from "../../../types/Rank";

const NodeAvatar = forwardRef(
  (
    {
      id,
      name,
      email,
      avatar,
      is_active,
      x,
      y,
      size,
      onClick,
      high_membership,
      membership,
      membership_status,
      isSM,
      rank,
      i18n,
    }: any,
    ref: any
  ) => {
    const formattedName = (name: string) => {
      if (!name) return "";
      return name.length > 15 ? name?.slice(0, 15) + ".." : name;
    };
    const rankImg = RanksObject(i18n)[(rank?.key as RankKey) || "none"]?.order;
    return (
      <>
        <div
          className={classNames(`absolute  rounded-lg py-4 px-4`, {
            "h-[180px]": !isSM,
            "h-[120px]": isSM,
            "hover:cursor-pointer  shadow-md border-gray-400": Boolean(name),
          })}
          style={{
            left: x,
            top: y,
          }}
          id={id}
          ref={ref}
          onClick={onClick}
        >
          <img
            src={`/img/ranks/${rankImg}.png`}
            className={classNames(
              "absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-5 w-4/5"
            )}
            style={{ display: high_membership ? "block" : "none" }}
          />

          <div className="relative flex flex-col items-center space-y-4">
            <div
              className={classNames(
                "relative",
                name && "gradient-border",
                name && membership_status == "expired" && "before-border-red"
              )}
            >
              {name ? (
                <div
                  className={classNames(
                    "rounded-full flex items-center justify-center bg-[#f2f3f7] overflow-hidden",
                    {
                      "h-[150px] w-[150px]": !isSM,
                      "h-[90px] w-[90px]": isSM,
                    }
                  )}
                >
                  <img
                    src={`/img/ranks/${rankImg}.png`}
                    className={classNames(
                      "w-full rounded-full",
                      is_active && "border-green-500 border-solid border",
                      !is_active && "border-red-500 border-solid border"
                    )}
                    alt=""
                  />
                </div>
              ) : (
                <div
                  className={classNames(
                    "rounded-full flex items-center justify-center bg-gray-800 overflow-hidden",
                    {
                      "h-[150px] w-[150px]": !isSM,
                      "h-[90px] w-[90px]": isSM,
                    }
                  )}
                >
                  <img src="/img/nopeople.png" className="w-[30%]" alt="" />
                </div>
              )}
            </div>
            {name && (
              <div>
                <span className="flex flex-col items-center">
                  <span className="text-xl font-bold whitespace-nowrap line-clamp-1 z-50">
                    {formattedName(name)}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        {name && (
          <Tooltip anchorSelect={"#" + id} place="left">
            <div className="flex flex-col">
              <span>
                <b>Status</b>
              </span>
              <span>{is_active ? "Active" : "Inactive"}</span>
            </div>
            {/*<div className="flex flex-col">
              <span>
                <b>{i18n.t("my_team.binary.pack")}</b>
              </span>
              <span>{DISPLAY[membership as Memberships]}</span>
            </div>*/}
          </Tooltip>
        )}
      </>
    );
  }
);
NodeAvatar.displayName = "NodeAvatar";

export default NodeAvatar;
