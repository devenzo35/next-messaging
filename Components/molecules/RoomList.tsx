import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "emoji-mart/css/emoji-mart.css";

import { fetchRooms } from "../../firebase/firebaseConfig";
import { MsgContainerPlaceholder } from "./MsgContainerPlaceholder";
import { RootState } from "../../redux/reducers/rootReducer";
import { types } from "../../redux/types";
import { Rooms } from "../atoms/Rooms";
import { Title } from "../atoms/Title";
import { AddRoom } from "./AddRoom";
import { List } from "../atoms/List";

interface RoomListProps {
  handleRoom: () => void;
  state: boolean;
}

export const RoomList: FC<RoomListProps> = ({ handleRoom, state }) => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    fetchRooms((room: Object[]) => {
      dispatch({ type: types.START_LOAD_ROOMS, payload: room });
    });
  }, []);

  const setActiveRoom = (formValue: Object) => {
    dispatch({ type: types.ACTIVE_ROOM, payload: formValue });
    handleRoom();
  };

  console.log(rooms);

  return (
    <div
      className={`block  bg-indigo-400 rounded-xl inner-shadow flex-col w-5/6 text-xl text-center overflow-auto md:flex ${
        !state && "hidden"
      }`}
    >
      <Title className="text-center border-b-4 border-black text-md bg-indigo-700">
        Rooms
      </Title>
      <List className="flex flex-row justify-center items-center flex-wrap md:overflow-auto m-auto w-5/6 h-64 md:h-80 lg:overflow-hidden">
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
          <MsgContainerPlaceholder className="justify-between items-center rounded-2xl" />
        )}
      </List>
      <AddRoom />
    </div>
  );
};
