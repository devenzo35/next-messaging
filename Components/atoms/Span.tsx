import React, { FC } from "react";

interface SpanProps {
  className: string;
}

export const Span: FC<SpanProps> = (props) => {
  return <span className={props.className} {...props}></span>;
};
