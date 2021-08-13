import { EntityId } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import {
  deleteGroup,
  editGroupTitle,
  membersEdit,
} from "../features/groups/groupSlice";
import { addMessage } from "../features/messages/messageSlice";
import { addTask, deleteTask, editTask } from "../features/tasks/taskSlice";

let socket: Socket;

export const initSocket = (
  userId: string,
  groupIds: EntityId[],
  dispatch: any
): Socket => {
  socket = io({
    auth: {
      userId: userId,
    },
  });
  groupIds.forEach((id) => socket.emit("connectRoom", { groupId: id }));
  socket.on("connect", () => {
    console.log(`socket connected: ${socket.id}`);
  });
  socket.on("groupDeleted", ({ groupId }) => {
    dispatch({ type: deleteGroup.fulfilled.type, payload: groupId });
  });
  socket.on("editGroupTitle", ({ _id, title }) => {
    dispatch({
      type: editGroupTitle.fulfilled.type,
      payload: { _id, title },
    });
  });
  socket.on("membersEdit", ({ groupId, memberIds }) => {
    dispatch({
      type: membersEdit.type,
      payload: { groupId, memberIds },
    });
  });
  // MESSAGES
  socket.on("message", ({ message }) => {
    dispatch({ type: addMessage.fulfilled.type, payload: message });
  });
  // TASKS
  socket.on("task", ({ task }) => {
    dispatch({ type: addTask.fulfilled.type, payload: task });
  });
  socket.on("taskEdit", ({ task }) => {
    dispatch({ type: editTask.fulfilled.type, payload: task });
  });
  socket.on("taskDelete", ({ taskId }) => {
    dispatch({ type: deleteTask.fulfilled.type, payload: taskId });
  });

  socket.on("disconnect", (reason) => {
    console.log(`socket disconnected: ${reason}`);
  });
  return socket;
};
