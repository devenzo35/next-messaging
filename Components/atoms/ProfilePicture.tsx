import React, { FC } from "react";

interface ProfilePictureProps {
  src: string;
}

export const ProfilePicture: FC<ProfilePictureProps> = (props) => {
  return (
    <img
      className="rounded-full w-10 md:w-14 m-auto"
      alt="profile"
      src={props.src}
    ></img>
  );
};
