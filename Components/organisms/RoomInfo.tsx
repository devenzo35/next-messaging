import React, { FC } from "react";
import { Title } from "../atoms/Title";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { P } from "../atoms/P";

export const RoomInfo: FC = () => {
  const { activeRoom } = useSelector((state: RootState) => state.rooms);

  const { roomName, roomDescription } = activeRoom;

  return (
    <div className="bg-white h-3/6 w-1/6 py-14 rounded-l-xl text-center p-2 shadow-md hidden md:flex flex-col justify-between">
      <Title className="text-xl font-bold"> Room name: {roomName}</Title>
      <section>
        <Title className="text-xl font-bold"> Description:</Title>
        <P>{roomDescription}</P>
      </section>
    </div>
  );
};
