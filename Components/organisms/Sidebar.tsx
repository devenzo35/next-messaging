import { RoomList } from "../molecules/RoomList";
import { Title } from "../atoms/Title";
import { Avatar } from "../molecules/Avatar";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/rootReducer";

export const Sidebar: FC = () => {
  const [state, setstate] = useState(false);
  const { activeRoom } = useSelector((state: RootState) => state.rooms);

  const { roomName } = activeRoom;

  const handleRoom = () => setstate(!state);
  return (
    <aside
      className={`sidebar w-full h-20 md:w-2/5 md:h-screen bg-indigo-800 text-white text-xs md:text-lg py-6 px-3 flex md:flex-col justify-between items-center duration-1000 ${
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
    </aside>
  );
};
