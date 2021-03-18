import React, { FC } from "react";
import { Img } from "./Img";

interface ProfilePictureProps {
  src: string;
}

export const ProfilePicture: FC<ProfilePictureProps> = (props) => {
  return (
    <Img
      className="rounded-full w-10 md:w-14 m-auto"
      alt="profile"
      src={props.src}
    ></Img>
  );
};
