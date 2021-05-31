import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { api } from "../../utils/api";
import { IGroup, IGroupState, IResponse } from "../../utils/interfaces";
import { getMessages } from "../messages/messageSlice";

export const groupsAdapter = createEntityAdapter<IGroupState>({
  selectId: (group) => group._id!,
});
const initialState = groupsAdapter.getInitialState({
  loaded: false,
});

export const getGroups = createAsyncThunk("group/getGroups", async () => {
  const data = await api.get<IResponse>("/api/groups");
  return { groups: data.data };
});
export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (group: IGroup) => {
    const data = await api.post<IResponse>("/api/groups", group);
    return { group: data.data };
  }
);
export const createInvite = createAsyncThunk(
  "group/createInvite",
  async (_id: string) => {
    const data = await api.put<IResponse>("/api/groups/invite", { _id });
    return { updated: data.data };
  }
);
export const joinGroup = createAsyncThunk(
  "group/joinGroup",
  async (inviteToken: object) => {
    const data = await api.put<IResponse>("/api/groups/join", inviteToken);
    return { updated: data.data };
  }
);
export const editGroupTitle = createAsyncThunk(
  "group/editGroupTitle",
  async (group: IGroup) => {
    const data = await api.put<IResponse>("/api/groups/title", group);
    return { title: data.data.title, _id: data.data._id };
  }
);
export const leaveGroup = createAsyncThunk(
  "group/leaveGroup",
  async (_id: string) => {
    const data = await api.put<IResponse>("/api/groups/leave", { _id });
    return { updated: data.data };
  }
);
export const deleteGroup = createAsyncThunk(
  "group/deleteGroup",
  async (_id: string) => {
    const data = await api.delete<IResponse>(`/api/groups/${_id}`);
    return data.data;
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    membersEdit(state, { payload }) {
      groupsAdapter.updateOne(state, {
        changes: { memberIds: payload.memberIds },
        id: payload.groupId,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Load groups
      .addCase(getGroups.fulfilled, (state, { payload }) => {
        state.loaded = true;
        groupsAdapter.setAll(state, payload.groups);
      })
      // Add group
      .addCase(createGroup.fulfilled, (state, { payload }) => {
        groupsAdapter.addOne(state, { ...payload.group, messagesLoaded: true });
      })
      // Add invite
      .addCase(createInvite.fulfilled, (state, { payload }) => {
        groupsAdapter.updateOne(state, {
          changes: { inviteToken: payload.updated.inviteToken },
          id: payload.updated._id,
        });
      })
      // Edit title
      .addCase(editGroupTitle.fulfilled, (state, { payload }) => {
        groupsAdapter.updateOne(state, {
          changes: { title: payload.title },
          id: payload._id,
        });
      })
      // Join group
      .addCase(joinGroup.fulfilled, (state, { payload }) => {
        groupsAdapter.addOne(state, payload.updated);
      })
      // Leave group
      .addCase(leaveGroup.fulfilled, (state, { payload }) => {
        groupsAdapter.removeOne(state, payload.updated._id);
      })
      // Delete group
      .addCase(deleteGroup.fulfilled, (state, { payload }) => {
        groupsAdapter.removeOne(state, payload);
      })
      // Track if messages loaded for group
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        groupsAdapter.updateOne(state, {
          changes: { messagesLoaded: true },
          id: payload.groupId,
        });
      });
  },
});

export const { membersEdit } = groupSlice.actions;
export default groupSlice.reducer;

export const { selectAll: selectGroups, selectById: selectGroupById } =
  groupsAdapter.getSelectors<RootState>((state) => state.groups);
