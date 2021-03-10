import React, { FC, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../../firebase/firebaseConfig";

import { types } from "../../redux/types";
import { Message } from "../atoms/Message";
import { RootState } from "../../redux/reducers/rootReducer";
import { MessagePlaceholder } from "../atoms/MessagePlaceholder";

export const MsgContainer: FC = () => {
  const { messages } = useSelector<RootState, Object[]>(
    (state: RootState) => state.msgs
  );
  const { activeRoom } = useSelector<RootState, Object[]>(
    (state: RootState) => state.rooms
  );
  const dispatch = useDispatch();
  const msgContainer = useRef(null);

  interface RoomId {
    id: string;
  }

  const { id: roomId }: RoomId = activeRoom;

  useEffect(() => {
    msgContainer.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchMessages(roomId, (msgs: Object) => {
      dispatch({ type: types.LOAD_MSG, payload: msgs });
    });
  }, [roomId]);

  return (
    <div className="msg__container bg-white h-92 w-full p-4 md:mt-1 text-left shadow-md overflow-auto">
      {messages ? (
        messages.map(
          ({ avatar, username, message, uid, id, createdAt, image }) => {
            return (
              <Message
                key={id ? id : createdAt}
                userId={uid}
                src={avatar}
                message={message}
                username={username}
                createdAt={createdAt}
                image={image}
              />
            );
          }
        )
      ) : (
        <MessagePlaceholder />
      )}
      {messages && messages.length === 0 && (
        <p className="text-xl font-bold w-full h-full grid place-items-center">
          Chat is empty, write a message!
        </p>
      )}
      <div style={{ float: "left", clear: "both" }} ref={msgContainer}></div>
    </div>
  );
};
