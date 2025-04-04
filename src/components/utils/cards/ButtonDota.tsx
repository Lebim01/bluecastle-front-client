import { Spinner } from "@heroui/react";
import { FC, ReactNode } from "react";

type Props = {
  rounded?: "sm" | "md" | "lg" | "full";
  children?: ReactNode;
  classNames?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const ButtonDota: FC<Props> = ({ ...props }) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`
            ${props?.classNames}
            border 
        border-[1px] 
        border-white 
        p-3 px-6 flex 
        items-center 
        cursor-pointer 
        justify-center 
        transition ease-in-out delay-150  hover:scale-105  duration-200 hover:border-[#DADADA] rounded-${
          props?.rounded ? props.rounded : "sm"
        }`}
    >
      {props.loading && <Spinner />}
      {props.children}
    </button>
  );
};

export default ButtonDota;
