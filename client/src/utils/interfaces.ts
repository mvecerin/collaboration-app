export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password: string;
}
export interface IGroup {
  _id?: string;
  title: string;
  inviteToken?: string;
  creatorId?: string;
  memberIds?: any[]; // populate()
}
export interface IMessage {
  _id?: string;
  content: string;
  timestamp?: Date;
  userId?: any;
  groupId: string;
  seenByIds?: string[];
}
export interface ITask {
  _id?: string;
  title: string;
  description: string;
  groupId: string;
  creatorId?: string;
  assignedToId?: any; //populate()
  done?: boolean;
}
export interface IGroupState extends IGroup {
  messagesLoaded?: boolean;
  tasksLoaded?: boolean;
}
export interface IUserState {
  user: IUser | null;
  isAuth: boolean | null;
  success: string | null;
  isLoading: boolean;
}

export interface IResponse {
  success: boolean;
  msg?: string;
  data?: any;
}
export interface ITokenResponse extends IResponse {
  token?: string;
}

export interface RouteParams {
  id: string;
}
