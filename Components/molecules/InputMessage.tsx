import { FC, FormEvent, useEffect, useState } from "react";

import { firebase } from "../../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";

import { useUpload } from "../../hooks/useUpload";
import { RootState } from "../../redux/reducers/rootReducer";
import { BaseEmoji, Picker } from "emoji-mart";
import { useForm } from "../../hooks/useForm";
import { types } from "../../redux/types";
import { MsgBtn } from "../atoms/MsgBtn";
import { Input } from "../atoms/Input";
import { Form } from "../atoms/Form";
import { Img } from "../atoms/Img";

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
/* 
cloudinary.config({
  cloud_name: "sample",
  api_key: "874837483274837",
  api_secret: "a676b67565c6767a6767d6767f676fe1",
}); */

export const InputMessage: FC = () => {
  const [imageUrl, setImageUrl] = useState<any>("");
  const [progress, setProgress] = useState<string>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [task, setTask] = useState<firebase.storage.UploadTask>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { activeRoom } = useSelector((state: RootState) => state.rooms);
  const { id } = activeRoom || "";
  const dispatch = useDispatch();
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
          console.log(snapshot);
          var progressPorcentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progressPorcentage.toFixed(1) + "%");
        },
        (err: Error) => {
          console.log(err);
          setProgress("Image couldn't be uploaded");
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((url: string) => {
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
    element.click();
    setProgress(null);
    setImageUrl(null);
  };

  const handleSelect = (emoji: BaseEmoji) => {
    handleOnChange({
      target: {
        name: "message",
        value: message + emoji.native,
      },
    });
  };

  const handleFile = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files[0];

    const CLOUDINARY_UPLOAD_PRESET = "next-messaging";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    setProgress("Loading...");
    const { url, error } = await useUpload(formData);

    error ? setProgress(error) : setProgress("");
    setImageUrl(url);
  };

  const handleEmojiTable = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="input__msg shadow-lg bg-white flex flex-row w-full md:mt-1"
    >
      <MsgBtn
        type="button"
        className="grid place-items-center p-2"
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
        className="h-full grid place-items-center"
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
        <Img
          src={imageUrl}
          className="rounded-lg p-1 w-16 md:w-24"
          alt="image preview"
        />
      )}
      <MsgBtn
        type={"submit"}
        className={"font-bold w-1/6"}
        onClick={handleSubmit}
      >
        SEND
      </MsgBtn>
    </Form>
  );
};
