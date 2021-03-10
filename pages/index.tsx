import { MessageSection } from "../Components/organisms/MessageSection";
import { Sidebar } from "../Components/organisms/Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { RoomInfo } from "../Components/organisms/RoomInfo";

function Home(props) {
  const { user } = useSelector((state) => state.auth);
  const Router = useRouter();
  useEffect(() => {
    user === null && Router.replace("/auth/login");
  }, [user]);
  if (!user) return <h1>loading</h1>;
  return (
    <div className="bg-gray-100 flex h-screen flex-col md:items-center md:flex-row">
      <Sidebar />
      <MessageSection />
      <RoomInfo />
    </div>
  );
}

export default Home;
