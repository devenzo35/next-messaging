import React, { FC } from "react";
import { ProfilePicture } from "../atoms/ProfilePicture";
import { useSelector } from "react-redux";
import { P } from "../atoms/P";

export const Avatar: FC = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col order-4 md:order-none">
      <ProfilePicture src={user.avatar} />
      <P className="hidden md:block text-center">{user.username}</P>
    </div>
  );
};
