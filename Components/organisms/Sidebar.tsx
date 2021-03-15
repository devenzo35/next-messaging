import { RoomList } from "../molecules/RoomList";
import { Title } from "../atoms/Title";
import { Avatar } from "../molecules/Avatar";
import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { AddBtn } from "../atoms/AddBtn";
import { firebase } from "../../firebase/firebaseConfig";
import { types } from "../../redux/types";

export const Sidebar: FC = () => {
  const [state, setstate] = useState(false);
  const { activeRoom } = useSelector((state: RootState) => state.rooms);
  const dispatch = useDispatch();

  const { roomName } = activeRoom;

  const handleRoom = () => setstate(!state);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: types.START_LOGOUT });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <aside
      className={`sidebar w-full h-20 md:w-2/5 md:h-screen bg-indigo-600 text-white text-xs md:text-lg py-6 px-3 flex md:flex-col justify-between items-center duration-1000 ${
        state && "h-full absolute flex-col jusitfy-evenly md:static"
      }`}
    >
      <Title className="text-xl md:text-3xl font-bold">Next Chat</Title>
      <section className="md:hidden flex flex-col">
        <span className="text-2xl">{roomName}</span>
        <button onClick={handleRoom}>Change Room</button>
      </section>
      <Avatar />
      <RoomList handleRoom={handleRoom} state={state} />
      <AddBtn
        onClick={handleLogout}
        className={`bg-red-400 rounded-lg h-10 w-1/6 md:h-10 md:w-3/6 md:block ${
          !state && "hidden"
        }`}
      >
        Log out
      </AddBtn>
    </aside>
  );
};
