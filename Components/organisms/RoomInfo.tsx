import React, { FC } from "react";
import { Title } from "../atoms/Title";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { P } from "../atoms/P";

interface ActiveRoom {
  roomName: string;
  roomDescription: string;
}

export const RoomInfo: FC = () => {
  const { activeRoom } = useSelector((state: RootState) => state.rooms);

  const { roomName, roomDescription }: ActiveRoom = activeRoom;

  return (
    <div className="room__info h-3/6 w-1/5 text-center shadow-md hidden md:flex flex-col justify-center items-center self-start bg-white border-2 px-1 border-indigo-700">
      <section>
        <Title className="text-xl bg-indigo-600 w-full px-2 rounded-lg m-auto text-white">
          ROOM NAME:
        </Title>
        <P className="text-3xl mt-2">{roomName}</P>
      </section>
      <section className="w-full border-2 h-max mt-6">
        <Title className="text-xl bg-indigo-600 w-5/6 rounded-lg m-auto text-white">
          {" "}
          DESCRIPTION:
        </Title>
        <P className="text-lg mt-3">{roomDescription}</P>
      </section>
    </div>
  );
};
