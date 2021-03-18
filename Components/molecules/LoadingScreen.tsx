import React from "react";
import { Img } from "../atoms/Img";

export const Loading = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <Img className="w-1/6" src="/Infinity-1s-200px.svg" alt="loader"></Img>
    </div>
  );
};
