import React from "react";
import { IMessage } from "../../../../utils/interfaces";

interface Props {
  message: IMessage;
}
export const Message = ({ message }: Props) => {
  let time = new Date(message.timestamp!).toLocaleTimeString();
  return (
    <div className="my-2 d-flex">
      <i className="bi-person-fill avatar bg-primary"></i>
      <div>
        <strong>
          {message.userId.name}
          <span className="text-muted tiny ms-2">{time}</span>
        </strong>
        <p>{message.content}</p>
      </div>
    </div>
  );
};
