import { FC, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";

import { Input } from "../atoms/Input";
import { useForm } from "../../hooks/useForm";
import { AddBtn } from "../atoms/AddBtn";

interface RoomName {
  roomName: string;
  roomDescription: string;
}

export const AddRoom: FC = () => {
  const dispatch = useDispatch();
  const { formValue, handleOnChange, reset } = useForm<RoomName>({
    roomName: "",
    roomDescription: "",
  });
  const [putName, setPutName] = useState(false);

  const { rooms } = useSelector((state: RootState) => state.rooms);

  const { roomName, roomDescription } = formValue;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: "START_ADD_ROOM", payload: formValue });
  };

  const handleAdd = () => {
    setPutName(true);
  };

  return (
    <>
      {putName && rooms.length < 10 ? (
        <form onSubmit={handleSubmit}>
          <Input
            name="roomName"
            onChange={handleOnChange}
            placeholder="Name"
            value={roomName}
            className="bg-indigo-100 border-0 focus:outline-none rounded-l-md pl-1 pr-1 text-shadow text-indigo-700 font-bold w-32 text-md"
          ></Input>
          <Input
            name="roomDescription"
            placeholder="Description"
            onChange={handleOnChange}
            value={roomDescription}
            className="bg-indigo-100 border-0 focus:outline-none rounded-r-md pl-1 pr-1 text-shadow text-indigo-700 font-bold w-32 text-md"
          ></Input>
          <AddBtn onClick={handleAdd} type="submit"></AddBtn>
        </form>
      ) : (
        <AddBtn onClick={handleAdd} className="text-center rounded-t-xl">
          {rooms && rooms.length < 10
            ? "Add lobby"
            : "exceeded the numbers of rooms"}
        </AddBtn>
      )}
    </>
  );
};
