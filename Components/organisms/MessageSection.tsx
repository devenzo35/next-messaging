import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";

import { Title } from "../atoms/Title";
import { InputMessage } from "../molecules/InputMessage";
import { MsgContainer } from "../molecules/MsgContainer";

export const MessageSection: FC = () => {
  const { activeRoom } = useSelector((state: RootState) => state.rooms);
  return (
    <div className="h-auto w-full md:px-10 flex flex-col justify-center items-center">
      <Title className="hidden md:flex h-14 items-center justify-start px-4 w-full text-3xl bg-white shadow-lg">
        #{activeRoom.roomName}
      </Title>

      <MsgContainer />

      <InputMessage />
    </div>
  );
};
