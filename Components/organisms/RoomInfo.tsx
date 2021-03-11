import React, { FC } from "react";
import { Title } from "../atoms/Title";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { P } from "../atoms/P";

export const RoomInfo: FC = () => {
  const { activeRoom } = useSelector((state: RootState) => state.rooms);

  const { roomName, roomDescription } = activeRoom;

  return (
    <div className="room__info bg-indigo-500 h-3/6 w-1/6 py-10 rounded-l-lg text-center p-2 shadow-md hidden md:flex flex-col justify-between border-2 border-indigo-700">
      <Title className="text-xl font-bold shadow-md rounded-l-lg bg-white">
        {" "}
        Room name: {roomName}
      </Title>
      <section className="shadow-md bg-white rounded-l-lg">
        <Title className="text-xl font-bold"> Description:</Title>
        <P className="text-lg">{roomDescription}</P>
      </section>
    </div>
  );
};
