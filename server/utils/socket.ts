import { Socket } from "socket.io";
import { IMessage } from "../interfaces";

let sockets: any = {};

export const onConnection = (socket: Socket) => {
  const userId = socket.handshake.auth.userId;
  console.log(`socket connected: ${socket.id} ${userId}`);
  sockets[userId] = socket;
  socket.on("connectRoom", ({ groupId }) => connectRoom(socket, groupId));
  socket.on("disconnect", (reason) => {
    console.log(`${socket.id} disconnected: ${reason}`);
    delete sockets[userId];
  });
};

const connectRoom = (socket: Socket, groupId: string) => {
  socket.join(groupId);
  console.log(`${socket.id} joined a room: ${groupId}`);
};
const leaveRoom = (socket: Socket, groupId: string) => {
  socket.leave(groupId);
  console.log(`${socket.id} left a room: ${groupId}`);
};

export const emitJoinMember = (
  userId: string,
  memberIds: any[],
  groupId: string
) => {
  //connectRoom(sockets[userId], groupId);
  sockets[userId].to(groupId).emit("membersEdit", { memberIds, groupId });
};
export const emitLeaveMember = (
  userId: string,
  memberIds: any[],
  groupId: string
) => {
  //leaveRoom(sockets[userId], groupId);
  sockets[userId].to(groupId).emit("membersEdit", { memberIds, groupId });
};
export const emitEditTitle = (
  userId: string,
  title: string,
  groupId: string
) => {
  sockets[userId].to(groupId).emit("editGroupTitle", { title, _id: groupId });
};

export const emitDeleteGroup = (userId: string, groupId: string) => {
  leaveRoom(sockets[userId], groupId);
  sockets[userId].to(groupId).emit("groupDeleted", { groupId });
};

export const emitMessage = (
  userId: string,
  groupId: string,
  message: IMessage
) => {
  sockets[userId].to(groupId).emit("message", { message });
};
