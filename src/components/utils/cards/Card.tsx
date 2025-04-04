import { FC, JSXElementConstructor, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  classNames?: string;
};

const CardDota: FC<Props> = ({ ...props }) => {
  return (
    <div
      className={`border border-1 p-4 relative rounded-lg border-[#3f3f3f] ${props.classNames}`}
    >
      {props.children}
    </div>
  );
};

export default CardDota;
