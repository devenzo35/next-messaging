import { FC, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";

import { Input } from "../atoms/Input";
import { useForm } from "../../hooks/useForm";
import { Btn } from "../atoms/Btn";
import { types } from "../../redux/types";
import { Form } from "../atoms/Form";

interface RoomName {
  roomName: string;
  roomDescription: string;
}

export const AddRoom: FC = () => {
  const [putName, setPutName] = useState<boolean>(false);
  const { rooms } = useSelector((state: RootState) => state.rooms);
  const dispatch = useDispatch();
  const { formValue, handleOnChange, reset } = useForm<RoomName>({
    roomName: "",
    roomDescription: "",
  });

  const { roomName, roomDescription } = formValue;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (roomName.length < 1 || roomDescription.length < 3) return;
    dispatch({ type: types.START_ADD_ROOM, payload: formValue });
    reset();
  };

  const handleAdd = () => {
    setTimeout(() => {
      setPutName(!putName);
    }, 1);
  };

  return (
    <>
      {putName && rooms.length < 10 ? (
        <Form onSubmit={handleSubmit}>
          <Input
            name="roomName"
            onChange={handleOnChange}
            placeholder="Name"
            value={roomName}
            className="bg-indigo-100 border-0 focus:outline-none pl-1 pr-1 text-shadow text-indigo-700 font-bold w-3/6 text-md"
          ></Input>
          <Input
            name="roomDescription"
            placeholder="Description"
            onChange={handleOnChange}
            value={roomDescription}
            className="bg-indigo-100 border-0 focus:outline-none pl-1 pr-1 text-shadow text-indigo-700 font-bold w-3/6 text-md"
          ></Input>
          <Btn onClick={handleAdd} type="submit"></Btn>
        </Form>
      ) : (
        <Btn onClick={handleAdd} className="text-center bg-indigo-700">
          {rooms && rooms.length < 10
            ? "Add lobby"
            : "exceeded the numbers of rooms"}
        </Btn>
      )}
    </>
  );
};
