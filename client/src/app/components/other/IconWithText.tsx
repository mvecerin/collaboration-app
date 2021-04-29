import React from "react";

interface Props {
  text: string;
  icon: string;
}

export const IconWithText = ({ text, icon }: Props) => {
  return (
    <>
      <i className={`bi-${icon} me-2`}></i>
      <span>{text}</span>
    </>
  );
};
