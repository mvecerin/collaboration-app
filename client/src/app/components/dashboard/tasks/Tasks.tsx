import React from "react";
import {
  selectDoneTasks,
  selectTasksInProgress,
  selectUnassignedTasks,
} from "../../../../features/tasks/taskSlice";
import { useAppSelector } from "../../../store";
import { PlusButton } from "../../other/PlusButton";
import { TaskSection } from "./TaskSection";

interface Props {
  groupId: string;
}

export const Tasks = ({ groupId }: Props) => {
  const tasksInProgress = useAppSelector((state) =>
    selectTasksInProgress(state, groupId)
  );
  const tasksDone = useAppSelector((state) => selectDoneTasks(state, groupId));
  const tasksUnassigned = useAppSelector((state) =>
    selectUnassignedTasks(state, groupId)
  );

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="tasks">
      <div className="offcanvas-header bg-primary">
        <h5 className="offcanvas-title" id="offcanvasLabel">
          Tasks
          <PlusButton target="#addTaskDialog" toggle="modal" />
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <TaskSection
          color="progress"
          title="In progress"
          tasks={tasksInProgress}
        />
        <TaskSection color="dark" title="Unassigned" tasks={tasksUnassigned} />
        <TaskSection color="primary" title="Done" tasks={tasksDone} />
      </div>
    </div>
  );
};
