import React from "react";
import { addTask } from "../../../../features/tasks/taskSlice";
import { Dialog } from "../../other/Dialog";
import { useDispatchWithReturn } from "../../other/hooks/useDispatchWithReturn";
import { useForm } from "../../other/hooks/useForm";
import { useModal } from "../../other/hooks/useModal";

interface Props {
  groupId: string;
}

export const AddTaskDialog = ({ groupId }: Props) => {
  const [values, handleChange] = useForm({
    title: "",
    description: "",
    groupId,
  });
  const [dispatch] = useDispatchWithReturn();
  const [dialogRef, modal] = useModal();

  const onSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      const result = await dispatch(addTask(values));
      if (result) modal?.hide();
    } catch (e) {}
  };

  return (
    <Dialog
      dialogRef={dialogRef}
      id="addTaskDialog"
      title="Add task"
      body={
        <form onSubmit={onSubmit} id="addTaskForm">
          <label htmlFor="title">Title</label>
          <input
            className="form-control p-2 mb-2"
            id="title"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control p-2 mb-2"
            id="description"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
          />
        </form>
      }
      footer={
        <button
          className="btn btn-md btn-primary"
          form="addTaskForm"
          type="submit"
        >
          Add
        </button>
      }
    />
  );
};
