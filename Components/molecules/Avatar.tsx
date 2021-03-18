import React, { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/reducers/rootReducer";
import { ProfilePicture } from "../atoms/ProfilePicture";
import { Span } from "../atoms/Span";

export const Avatar: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex flex-col order-4 md:order-none">
      {user.avatar && <ProfilePicture src={user.avatar} />}
      <Span className="hidden md:block text-center">{user.username}</Span>
    </div>
  );
};
