/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import GenerateQR from "./GenerateQR";
import { DISPLAY, Memberships } from "@/constants";
import toast from "react-hot-toast";
import { createPaymentLink } from "@/services/method";
import axios from "axios";
import axiosInstance from "@/services";
import useAxios from "@/hooks/useAxios";
import { User } from "@/types/User";
import ShowQR from "./ShowQR";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

type Props = {
  image: string;
  title: string;
  period: string;
  pricing: number;
  type: Memberships;
  active: Memberships | null
  beneficios: string[]
};



const Package: FC<Props> = ({ ...props }) => {
  const [loading, setLoading] = useState(false);

  const _createPaymentLink = async (type: Memberships) => {
    setLoading(true)
    try {
       await axiosInstance.post("users/create-qr-membership", {
        membership_type: type,
      });
      setLoading(false)
    } catch (error) {
      toast.error("No se pudo generar el código qr");
      console.error("Fallo al crear el pago", error);
    }
  };

  return (
    <div className={`border relative rounded-lg ${props.active == props.type ? 'border-green-500' : 'border-[#3f3f3f]'} flex flex-col justify`}>
      <img
        src={props?.image || "/img/but-membership.png"}
        alt={props?.title}
        className="rounded-t-lg image-gradient"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
    
      <div className="px-4 flex flex-col gap-8 -mt-14 z-[19] pb-8">
        <div className="flex flex-col gap-4">
          <span className="text-[38px] font-bold">{props?.title}</span>
        </div>
        <div className="flex flex-col gap-4">
          {props.beneficios.map((beneficio: string, index: number) => (
            <div key={index} className="flex gap-2 items-center text-lg 3xl:text-xl">
              <span className="text-green-400">
                <FaCheckCircle />
              </span>
              <span>{beneficio}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <span className="text-[48px] font-bold">$ {DISPLAY[props.type]}</span>
        </div>
        <ShowQR
          createPaymentLink={_createPaymentLink}
          loading={loading}
          type={props.type}
          active={props.active}
        />
      </div>
    </div>
  );
};

export default Package;
