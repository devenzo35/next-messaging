import React, { FC } from "react";

interface MsgBtn {
  type: "button" | "submit" | "reset";
  className?: string;
  onClick(param?: any): void;
}

export const MsgBtn: FC<MsgBtn> = (props): JSX.Element => {
  return (
    <button
      {...props}
      type={props.type}
      className={`w-1/6 duration-500 border-2 hover:border-gray-200 border-white hover:shadow-md focus:outline-none focus:*`}
    >
      {props.children}
    </button>
  );
};
