import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import groupReducer from "../features/groups/groupSlice";
import messageReducer from "../features/messages/messageSlice";
import tasksReducer from "../features/tasks/taskSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const combinedReducer = combineReducers({
  user: userReducer,
  groups: groupReducer,
  messages: messageReducer,
  tasks: tasksReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "user/authFailed") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
