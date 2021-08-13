import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { api } from "../../utils/api";
import { ITask, IResponse } from "../../utils/interfaces";

export const tasksAdapter = createEntityAdapter<ITask>({
  selectId: (task) => task._id!,
});
const initialState = tasksAdapter.getInitialState();

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (id: string) => {
    const result = await api.get<IResponse>(`/api/tasks/${id}`);
    return { tasks: result.data, groupId: id };
  }
);
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: ITask) => {
    const result = await api.post<IResponse>("/api/tasks", task);
    return result.data;
  }
);
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async (task: object) => {
    const result = await api.put<IResponse>("/api/tasks", task);
    return result.data;
  }
);
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    const result = await api.delete<IResponse>(`/api/tasks/${taskId}`);
    return result.data;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Load tasks of a group
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        tasksAdapter.addMany(state, payload.tasks);
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        tasksAdapter.addOne(state, payload);
      })
      .addCase(editTask.fulfilled, (state, { payload }) => {
        tasksAdapter.updateOne(state, { id: payload._id, changes: payload });
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        tasksAdapter.removeOne(state, payload);
      });
  },
});

export default taskSlice.reducer;

// SELECTORS
export const { selectAll: selectTasks, selectById: selectTaskById } =
  tasksAdapter.getSelectors<RootState>((state) => state.tasks);

export const selectTasksByGroup = createSelector(
  [selectTasks, (state: RootState, groupId: string) => groupId],
  (tasks, groupId) => tasks.filter((task) => task.groupId === groupId)
  // .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1))
);

export const selectTasksInProgress = createSelector(
  [selectTasks, (state: RootState, groupId: string) => groupId],
  (tasks, groupId) =>
    tasks.filter(
      (task) => task.groupId === groupId && task.assignedToId && !task.done
    )
);

export const selectDoneTasks = createSelector(
  [selectTasks, (state: RootState, groupId: string) => groupId],
  (tasks, groupId) =>
    tasks.filter((task) => task.groupId === groupId && task.done)
);

export const selectUnassignedTasks = createSelector(
  [selectTasks, (state: RootState, groupId: string) => groupId],
  (tasks, groupId) =>
    tasks.filter((task) => task.groupId === groupId && !task.assignedToId)
);
