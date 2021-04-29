import React, { useState } from "react";
import { addMessage } from "../../../../features/messages/messageSlice";
import { useDispatchWithReturn } from "../../other/hooks/useDispatchWithReturn";

interface Props {
  groupId: string;
}

export const MessageInput = ({ groupId }: Props) => {
  const [message, setMessage] = useState("");

  const [dispatch] = useDispatchWithReturn();

  const onSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      const result = await dispatch(addMessage({ groupId, content: message }));
      if (result) {
        setMessage("");
      }
    } catch (e) {}
  };
  return (
    <form className="msg-input d-flex" onSubmit={onSubmit}>
      <input
        className="p-2 flex-grow-1"
        placeholder="Send a message"
        autoComplete="off"
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        autoFocus
      />
      <button
        disabled={message.length === 0}
        className="btn btn-primary ms-1 bi-caret-right-fill rounded-circle
        "
        type="submit"
      ></button>
    </form>
  );
};
