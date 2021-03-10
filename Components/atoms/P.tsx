import { AppProps } from "next/dist/next-server/lib/router/router";
import React, { FC } from "react";

interface PProps {
  className?: string;
}

export const P: FC<PProps> = (props) => {
  return <p className={props.className}>{props.children}</p>;
};
