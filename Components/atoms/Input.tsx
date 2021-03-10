import React, { ChangeEvent, FC } from "react";

interface InputProps {
  [propName: string]: any;
}

export const Input: FC<InputProps> = (props) => {
  return (
    <input className="focus:outline-none" {...props}>
      {props.children}
    </input>
  );
};
