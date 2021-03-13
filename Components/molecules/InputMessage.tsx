import { FC, FormEvent, useEffect, useState } from "react";
import { firebase, db, storage } from "../../firebase/firebaseConfig";
import { Input } from "../atoms/Input";
import { MsgBtn } from "../atoms/MsgBtn";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../../redux/types";
import { useForm } from "../../hooks/useForm";
import { Picker } from "emoji-mart";
import { RootState } from "../../redux/reducers/rootReducer";
import { useUploadFile } from "../../hooks/useUploadFile";
import { FileHandle } from "fs/promises";

interface User {
  username: string;
  avatar: string;
  uid: string;
}
interface Message {
  message: string;
}

interface Payload {
  roomId: string;
  uid: string;
  username: string;
  avatar: string;
  message: string;
  createdAt: firebase.firestore.Timestamp;
  image?: string;
}

export const InputMessage: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { activeRoom } = useSelector((state: RootState) => state.rooms);
  const { formValue, handleOnChange, reset } = useForm<Message>({
    message: "",
  });
  const [task, setTask] = useState(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { id } = activeRoom || "";
  const { username, avatar, uid }: User = user;
  const { message } = formValue;

  useEffect(() => {
    if (task) {
      task.on("state_changed", (snapshot) => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          setImageUrl(url);
        });
      });
    }
  }, [task]);

  const payload: Payload = {
    roomId: id,
    uid,
    username,
    avatar,
    message,
    image: imageUrl,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim().length < 1) return;
    dispatch<Payload>({
      type: types.START_ADD_MSG,
      payload,
    });
    reset();
  };

  const StartUploadFile = () => {
    const element: HTMLElement | null = document.querySelector(".file");
    element!.click();
  };

  const handleSelect = (emoji) => {
    handleOnChange({
      target: {
        name: "message",
        value: message + emoji.native,
      },
    });
  };

  const handleFile = (e: Event) => {
    const file = (e.target as HTMLInputElement).files[0];
    const task = useUploadFile(file);
    setTask(task);
  };

  const handleEmojiTable = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="input__msg shadow-lg bg-white flex flex-row w-full md:mt-1"
    >
      <MsgBtn type="button" onClick={StartUploadFile}>
        <i className="fas fa-paperclip"></i>
      </MsgBtn>

      <Input className="hidden file" onChange={handleFile} type="file"></Input>

      <section className="emoji__container absolute w-full md:w-2/6">
        {showEmojiPicker && (
          <Picker style={{ width: "100%" }} onSelect={handleSelect} />
        )}
      </section>
      <MsgBtn
        type="button"
        className="w-10 h-full grid place-items-center"
        onClick={handleEmojiTable}
      >
        <i className="far fa-smile"></i>
      </MsgBtn>
      <Input
        onChange={handleOnChange}
        value={message}
        className="w-4/6 p-1 outline-none text-xl border hover:border-gray-200 rounded-xl border-white duration-500"
        name="message"
        type="text"
        autoComplete="off"
        onClick={() => setShowEmojiPicker(false)}
      />
      <MsgBtn
        type={"submit"}
        className={"font-bold w-1/6"}
        onClick={handleSubmit}
      >
        SEND
      </MsgBtn>
    </form>
  );
};
