import React, { FC } from "react";

interface TitleProps {
  className?: string;
  onClick?: () => void;
}

export const Title: FC<TitleProps> = (props) => {
  return (
    <h2
      className={`w-2/6 h-18 text-center grid place-items-center text-2xl font-bold`}
      {...props}
    >
      {props.children}
    </h2>
  );
};
