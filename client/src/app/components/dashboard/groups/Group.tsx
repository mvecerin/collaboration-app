/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import {
  getMessages,
  selectMessagesByGroup,
} from "../../../../features/messages/messageSlice";
import { RouteParams } from "../../../../utils/interfaces";
import { useAppSelector, useThunkDispatch } from "../../../store";
import { useScroll } from "../../other/hooks/useScroll";
import { Message } from "./Message";
import { MessageInput } from "./MessageInput";

export const Group = () => {
  const { id } = useParams<RouteParams>();
  const [scrollRef, scroll] = useScroll();
  const dispatch = useThunkDispatch();
  const messages = useAppSelector((state) => selectMessagesByGroup(state, id));
  let history = useHistory();
  const { ids } = useAppSelector((state) => state.groups);

  // Load messages
  useEffect(() => {
    if (messages.length === 0) dispatch(getMessages(id));
  }, [id]);

  // Reload on delete/leave group
  useEffect(() => {
    if (ids.length !== 0 && !ids.includes(id)) history.push("/groups");
  }, [ids]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scroll();
  }, [messages]);

  return (
    <div className="chat-container d-flex flex-column">
      <div
        className="chat-messages mb-2 px-1 d-flex flex-column align-items-start flex-grow-1"
        ref={scrollRef}
      >
        {messages.map((message) => (
          <Message message={{ ...message }} key={message._id} />
        ))}
      </div>
      <MessageInput groupId={id} />
    </div>
  );
};
