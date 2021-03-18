import React, { FC } from "react";

interface ImgProps {
  src: string;
  alt: string;
  className?: string;
  onClick?(): void;
}

export const Img: FC<ImgProps> = (props) => {
  return (
    <img src={props.src} alt={props.alt} className="w-full h-auto" {...props} />
  );
};
