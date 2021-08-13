/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import {
  getMessages,
  selectMessagesByGroup,
} from "../../../../features/messages/messageSlice";
import { getTasks } from "../../../../features/tasks/taskSlice";
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
  const { ids, loaded, entities } = useAppSelector((state) => state.groups);

  // Load initial messages and tasks
  useEffect(() => {
    if (!entities[id]?.messagesLoaded) dispatch(getMessages(id));
    if (!entities[id]?.tasksLoaded) dispatch(getTasks(id));
  }, [id]);

  // Reload on delete/leave group
  useEffect(() => {
    if (loaded && !ids.includes(id)) history.push("/groups");
  }, [ids]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scroll();
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages px-1" ref={scrollRef}>
        {messages.map((message) => (
          <Message message={{ ...message }} key={message._id} />
        ))}
      </div>
      <MessageInput groupId={id} />
    </div>
  );
};
