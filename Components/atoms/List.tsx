import React, { FC } from "react";

interface ListProps {
  className: string;
}

export const List: FC<ListProps> = (props) => {
  return <ul className={props.className} {...props}></ul>;
};
