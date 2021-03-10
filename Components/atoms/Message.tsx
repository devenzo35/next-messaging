import { ProfilePicture } from "./ProfilePicture";
import { useSelector } from "react-redux";
import { useTimeAgo } from "../../hooks/useTimeAgo";
import { RootState } from "../../redux/reducers/rootReducer";
import { Root } from "postcss";

interface MessageProps {
  src: string;
  username: string;
  message: string;
  createdAt: number;
  userId: string;
  image: string | null;
}

export const Message: React.FC<MessageProps> = (props) => {
  const {
    user: { uid },
  } = useSelector<RootState>((state: RootState) => state.auth);

  const { src, username, message, createdAt, userId, image } = props;

  const timeAgo = useTimeAgo(createdAt);

  return (
    <div
      className={`flex flex-row  items-center ${
        uid === userId ? "justify-end" : "justify-start"
      }  mb-2`}
    >
      {uid !== userId && (
        <img className="w-8 h-8 rounded-3xl" src={src} alt="message"></img>
      )}
      <div
        className={`shadow-md ml-1 rounded-xl mt-4 p-1 w-max max-w-2xl ${
          uid === userId ? "bg-indigo-400" : "bg-indigo-600"
        }`}
      >
        <div className="flex flex-row justify-between items-end w-full p-0.5">
          <span className="font-bold text-white text-xs">{username}</span>
          <time className="ml-4 text-xs text-white font-bold">{timeAgo}</time>
        </div>
        {image && (
          <img
            src={image}
            alt="message image"
            className="h-44 w-64 md:h-60 md:w-80 rounded-md mb-1"
          ></img>
        )}
        <p className="break-words shadow-inner p-0.5 px-1 rounded-md bg-white">
          {message}
        </p>
      </div>
    </div>
  );
};