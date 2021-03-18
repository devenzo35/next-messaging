import { RoomList } from "../molecules/RoomList";
import { Title } from "../atoms/Title";
import { Avatar } from "../molecules/Avatar";
import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";
import { Btn } from "../atoms/Btn";
import { firebase } from "../../firebase/firebaseConfig";
import { types } from "../../redux/types";
import { Span } from "../atoms/Span";

export const Sidebar: FC = () => {
  const [state, setstate] = useState<boolean>(false);
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
        <Span className="text-2xl">{roomName}</Span>
        <Btn onClick={handleRoom}>Change Room</Btn>
      </section>
      <Avatar />
      <RoomList handleRoom={handleRoom} state={state} />
      <Btn
        onClick={handleLogout}
        className={`bg-red-400 rounded-lg h-10 w-1/6 md:h-10 md:w-3/6 md:block ${
          !state && "hidden"
        }`}
      >
        Log out
      </Btn>
    </aside>
  );
};
