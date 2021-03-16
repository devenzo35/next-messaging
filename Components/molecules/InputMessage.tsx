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
import { v4 as uuidv4 } from "uuid";

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
  const [task, setTask] = useState(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { id } = activeRoom || "";
  const [progress, setProgress] = useState<string>(null);
  const { formValue, handleOnChange, reset } = useForm<Message>({
    message: "",
  });

  const { username, avatar, uid }: User = user;
  const { message } = formValue;

  useEffect(() => {
    if (task) {
      task.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress + "%");
        },
        (err) => {
          setProgress("Image couldn't be uploaded");
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((url: string) => {
            setProgress("Image uploaded");
            setImageUrl(url);
          });
        }
      );
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
    setProgress(null);
    setImageUrl(null);
    reset();
  };

  const StartUploadFile = () => {
    const element: HTMLElement | null = document.querySelector(".file");
    element!.click();
    setProgress(null);
    setImageUrl(null);
  };

  const handleSelect = (emoji) => {
    handleOnChange({
      target: {
        name: "message",
        value: message + emoji.native,
      },
    });
  };

  const handleFile = async (e: Event) => {
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
      <MsgBtn
        type="button"
        className="flex flex-col p-2 items-center justify-center"
        onClick={StartUploadFile}
      >
        <i className="fas fa-paperclip"></i>
        {progress && <span className="text-xs">{progress}</span>}
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
      {imageUrl && (
        <img src={imageUrl} className="rounded-lg p-1" alt="image preview" />
      )}
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
