import React, { FC } from "react";
import { MessagePlaceholder } from "../atoms/MessagePlaceholder";
import { P } from "../atoms/P";

interface MessagePlaceholderProps {
  className?: string;
}

export const MsgContainerPlaceholder: FC<MessagePlaceholderProps> = (props) => {
  return (
    <div
      className={
        props.className
          ? props.className
          : "flex flex-col justify-evenly h-full"
      }
    >
      <MessagePlaceholder />
      <MessagePlaceholder />
      <MessagePlaceholder />
      <MessagePlaceholder />
      <MessagePlaceholder />
      <MessagePlaceholder />
      <MessagePlaceholder />
    </div>
  );
};
