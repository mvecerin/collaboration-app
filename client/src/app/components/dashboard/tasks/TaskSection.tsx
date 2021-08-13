import React from "react";
import { ITask } from "../../../../utils/interfaces";
import { IconWithText } from "../../other/IconWithText";
import { Task } from "./Task";

interface Props {
  color: string;
  tasks: ITask[];
  title: string;
}
export const TaskSection = ({ color, tasks, title }: Props) => (
  <div className="py-2">
    <h5>{title}</h5>
    {tasks.length ? (
      tasks.map((task) => <Task task={task} key={task._id} color={color} />)
    ) : (
      <IconWithText text="No tasks" icon="x" />
    )}
  </div>
);
