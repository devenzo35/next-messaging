import React, { FC } from "react";

interface AddBtnProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Btn: FC<AddBtnProps> = (props) => {
  const { onClick, type, className, children } = props;
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        !className
          ? "text-center bg-indigo-300 rounded-r-md w-full font-bold text-indigo-700"
          : className
      }
      {...props}
    >
      {!children ? <i className="fas fa-plus"></i> : children}
    </button>
  );
};
