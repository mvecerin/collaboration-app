import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { api } from "../../utils/api";
import { IMessage, IResponse } from "../../utils/interfaces";

export const messagesAdapter = createEntityAdapter<IMessage>({
  selectId: (message) => message._id!,
});
const initialState = messagesAdapter.getInitialState({
  isLoading: false,
});

export const getMessages = createAsyncThunk(
  "message/getMessages",
  async (id: string) => {
    const data = await api.get<IResponse>(`/api/messages/${id}`);
    return { messages: data.data };
  }
);
export const addMessage = createAsyncThunk(
  "message/addMessage",
  async (message: IMessage) => {
    const data = await api.post<IResponse>("/api/messages", message);
    return data.data;
  }
);
export const editSeenMessages = createAsyncThunk(
  "message/editSeenMessages",
  async (groupId: string) => {
    const data = await api.put<IResponse>("/api/messages/seen", { groupId });
    return { messages: data.data };
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    // emittedMessage(state, { payload }) {
    //   messagesAdapter.addOne(state, payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      // Load messages of a group
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload.messages);
      })
      // Add message
      .addCase(addMessage.fulfilled, (state, { payload }) => {
        messagesAdapter.addOne(state, payload);
      })
      // Edit seen message
      .addCase(editSeenMessages.fulfilled, (state, { payload }) => {
        messagesAdapter.updateMany(state, payload.messages);
      });
  },
});

// export const { emittedMessage } = messageSlice.actions;
export default messageSlice.reducer;

// SELECTORS
export const {
  selectAll: selectMessages,
  selectById: selectMessageById,
} = messagesAdapter.getSelectors<RootState>((state) => state.messages);

export const selectMessagesByGroup = createSelector(
  [selectMessages, (state: RootState, groupId: string) => groupId],
  (messages, groupId) =>
    messages.filter((message) => message.groupId === groupId)
);
