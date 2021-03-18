import React, { FC, FormEvent } from "react";

interface FormProps {
  className: string;
  onSubmit(e: FormEvent): void;
}

export const Form: FC<FormProps> = (props) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className={props.className}
      {...props}
    ></form>
  );
};
