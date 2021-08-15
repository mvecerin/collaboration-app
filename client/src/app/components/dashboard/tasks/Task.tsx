import React from "react";
import { deleteTask, editTask } from "../../../../features/tasks/taskSlice";
import { ITask } from "../../../../utils/interfaces";
import { useAppSelector, useThunkDispatch } from "../../../store";
import { IconWithText } from "../../other/IconWithText";

interface Props {
  task: ITask;
  color: string;
}

export const Task = ({ task, color }: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useThunkDispatch();

  const onDone = () => {
    const doneTask = { _id: task._id, done: true };
    dispatch(editTask(doneTask));
  };
  const onAssignYourself = () => {
    const assignedTask = { _id: task._id, assignedToId: user?._id };
    dispatch(editTask(assignedTask));
  };
  const onDeleteTask = () => {
    dispatch(deleteTask(task._id!));
  };
  const assignedToMe = () => task.assignedToId?._id === user?._id;
  const assignedTo = () => (assignedToMe() ? "you" : task.assignedToId?.name);
  return (
    <div className="card my-3">
      <div
        className={`card-header bg-${color} text-light d-flex align-items-baseline`}
      >
        <h5 className="mb-0 py-2">{task.title}</h5>
        {task.creatorId === user?._id && (
          <button
            className="btn btn-outline-light ms-auto btn-sm"
            onClick={onDeleteTask}
          >
            <i className="bi-trash"></i>
          </button>
        )}
      </div>
      <div className="card-body">
        <p className="card-text pb-2">{task.description}</p>
        <div className="d-flex justify-content-between">
          {task.assignedToId ? (
            <>
              <span className="lighter align-self-center">
                Assigned to {assignedTo()}
              </span>
              {assignedToMe() && !task.done && (
                <button className="btn btn-secondary" onClick={onDone}>
                  <IconWithText icon="check2" text="Mark done" />
                </button>
              )}
            </>
          ) : (
            <button
              className="btn btn-secondary ms-auto"
              onClick={onAssignYourself}
            >
              <IconWithText
                icon="person-check-fill"
                text="Assign to yourself"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
