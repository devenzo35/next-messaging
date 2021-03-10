import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRooms } from "../../firebase/firebaseConfig";
import { MessagePlaceholder } from "../atoms/MessagePlaceholder";
import { Rooms } from "../atoms/Rooms";
import { Title } from "../atoms/Title";
import "emoji-mart/css/emoji-mart.css";
import { RootState } from "../../redux/reducers/rootReducer";
import { AddRoom } from "./AddRoom";

interface RoomListProps {
  handleRoom: () => void;
  state: boolean;
}

export const RoomList: FC<RoomListProps> = ({ handleRoom, state }) => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    fetchRooms((room: Object[]) => {
      dispatch({ type: "START_LOAD_ROOMS", payload: room });
    });
  }, []);

  const setActiveRoom = (formValue: Object) => {
    dispatch({ type: "ACTIVE_ROOM", payload: formValue });
    handleRoom();
  };

  return (
    <div
      className={`block flex-col w-full text-xl text-center overflow-auto md:flex ${
        !state && "hidden"
      }`}
    >
      <Title className="text-center border-b-4 border-black text-md">
        Rooms
      </Title>
      <ul className="flex flex-row justify-evenly flex-wrap md:overflow-auto h-64 md:h-80 lg:overflow-hidden">
        {rooms ? (
          rooms.map(({ roomName, roomDescription, id }) => {
            return (
              <Rooms
                key={id}
                roomName={roomName}
                roomDescription={roomDescription}
                id={id}
                setActiveRoom={setActiveRoom}
              ></Rooms>
            );
          })
        ) : (
          <MessagePlaceholder className="justify-between items-center rounded-2xl" />
        )}
      </ul>
      <AddRoom />
    </div>
  );
};
