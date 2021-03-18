import React, { FC } from "react";

interface RoomsProps {
  roomName: string;
  roomDescription: string;
  id: string;
  setActiveRoom(T: Object): void;
}

export const Rooms: FC<RoomsProps> = ({
  roomName,
  roomDescription,
  id,
  setActiveRoom,
}) => {
  return (
    <li
      onClick={() => setActiveRoom({ id, roomName, roomDescription })}
      className="flex flex-1 bg-blue-200 w-28 ml-2 justify-center h-14 items-center cursor-pointer hover:bg-white hover:text-indigo-700 duration-500 px-2 ml-2 mt-2 text-lg bg-indigo-900 opacity-1 p-1 rounded-lg md:w-full lg:w-28"
    >
      {roomName}
    </li>
  );
};
