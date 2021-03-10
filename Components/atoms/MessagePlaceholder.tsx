import React, { FC } from "react";
import { P } from "./P";

interface MessagePlaceholderProps {
  className?: string;
}

export const MessagePlaceholder: FC<MessagePlaceholderProps> = (props) => {
  return (
    <div
      className={
        props.className
          ? props.className
          : "flex flex-col justify-evenly h-full"
      }
    >
      <P className="bg-gray-300 h-12 w-full animate-pulse"></P>
      <P className="bg-gray-300 h-12 w-full animate-pulse"></P>
      <P className="bg-gray-300 h-12 w-full animate-pulse"></P>
      <P className="bg-gray-300 h-12 w-full animate-pulse"></P>
      <P className="bg-gray-300 h-12 w-full animate-pulse"></P>
      <P className="bg-gray-300 h-12 w-full animate-pulse"></P>
    </div>
  );
};
