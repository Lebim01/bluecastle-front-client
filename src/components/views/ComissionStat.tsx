import { ReactNode } from "react";

type Props = {
  label: string;
  subtitle?: string;
  value: number;
  icon: ReactNode;
};

const ComissionCard = (props: Props) => {
  return (
    <div className="card flex items-center gap-4">
      <div className="p-2 rounded-lg bg-primary-50 text-black h-full aspect-square flex items-center justify-center">
        {props.icon}
      </div>
      <div className="flex flex-col">
        <span className="text-3xl text-white font-bold">
          $ {props.value} USD
        </span>
        <label className="text-gray-100">{props.label}</label>
        {props.subtitle && (
          <small className="text-second">{props.subtitle}</small>
        )}
      </div>
    </div>
  );
};

export default ComissionCard;
