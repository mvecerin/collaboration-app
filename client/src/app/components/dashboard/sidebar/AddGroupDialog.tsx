import React from "react";
import { createGroup } from "../../../../features/groups/groupSlice";
import { useForm } from "../../other/hooks/useForm";
import { useModal } from "../../other/hooks/useModal";
import { useDispatchWithReturn } from "../../other/hooks/useDispatchWithReturn";
import { Dialog } from "../../other/Dialog";

export const AddGroupDialog = () => {
  const [values, handleChange] = useForm({
    title: "",
  });
  const [dispatch] = useDispatchWithReturn();
  const [dialogRef, modal] = useModal();

  const onSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      const result = await dispatch(createGroup(values));
      if (result) modal?.hide();
    } catch (e) {}
  };

  return (
    <Dialog
      dialogRef={dialogRef}
      id="addGroupDialog"
      title="Add group"
      body={
        <form onSubmit={onSubmit} id="addGroupForm">
          <label htmlFor="addGroup">Title</label>
          <input
            className="form-control p-2 mb-2"
            id="addGroup"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />
        </form>
      }
      footer={
        <button
          className="btn btn-md btn-primary"
          form="addGroupForm"
          type="submit"
        >
          Add
        </button>
      }
    />
  );
};
