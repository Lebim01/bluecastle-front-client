import { FC, JSXElementConstructor, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  img?: string;
  position: "top" | "bottom";
};

const CardBanner: FC<Props> = ({ ...props }) => {
  return (
    <div
      className={`border border-1 relative rounded-lg border-[#3f3f3f] flex flex-col justify-${
        props?.position == "top" ? "start" : "end"
      }`}
    >
      <div className="">
        <img
          className="rounded-lg"
          src={props.img || ""}
          alt={props?.img ? props.img : "Sin imagen"}
        />
      </div>
      <div className="absolute p-4 px-14 gap-4 flex flex-col text-center items-center w-full">
        {props.children}
      </div>
    </div>
  );
};

export default CardBanner;
