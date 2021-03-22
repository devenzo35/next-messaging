import { useSelector } from "react-redux";
import { useTimeAgo } from "../../hooks/useTimeAgo";
import { RootState } from "../../redux/reducers/rootReducer";
import { useState } from "react";
import { P } from "../atoms/P";
import { Img } from "../atoms/Img";
import { Span } from "../atoms/Span";

interface MessageProps {
  src: string;
  username: string;
  message: string;
  createdAt: number;
  userId: string;
  image: string | null;
}

export const Message: React.FC<MessageProps> = (props) => {
  const [showImage, setShowImage] = useState<boolean>(false);
  const { user } = useSelector<RootState>((state: RootState) => state.auth);

  const { uid } = user || "";
  const { src, username, message, createdAt, userId, image } = props;

  const timeAgo = useTimeAgo(createdAt);

  const hanldeViewImage = () => {
    setShowImage(!showImage);
  };

  return (
    <div
      className={`flex flex-row  items-center ${
        uid === userId ? "justify-end" : "justify-start"
      }  mb-2`}
    >
      {uid !== userId && src && (
        <Img className="w-8 h-8 rounded-3xl" src={src} alt="message"></Img>
      )}
      <section
        className={`shadow-md ml-1 rounded-xl mt-4 p-1 w-max max-w-md ${
          uid === userId ? "bg-indigo-400" : "bg-indigo-600"
        }`}
      >
        <section className="flex flex-row justify-between items-end w-full p-0.5">
          <Span className="font-bold text-white text-xs">{username}</Span>
          <time className="ml-4 text-xs text-white font-bold">{timeAgo}</time>
        </section>
        {image && (
          <Img
            onClick={hanldeViewImage}
            src={image}
            alt="message image"
            className="h-44 w-full md:h-60 md:m-auto rounded-md mb-2 cursor-pointer"
          ></Img>
        )}

        {showImage && (
          <section
            onClick={hanldeViewImage}
            className="bg-black md:bg-opacity-80 absolute h-screen w-full top-0 bottom-0 left-0 right-0 flex justify-center items-center"
          >
            <Img
              src={image}
              alt="message image"
              className="w-full h-3/6  md:w-4/6 md:h-5/6 md:rounded-md mb-1 cursor-pointer"
            ></Img>
          </section>
        )}

        <P className="break-words shadow-inner p-0.5 px-1 rounded-md bg-white">
          {message}
        </P>
      </section>
    </div>
  );
};
