import React from "react";
import { joinGroup } from "../../../../features/groups/groupSlice";
import { useForm } from "../../other/hooks/useForm";
import { Dialog } from "../../other/Dialog";
import { useDispatchWithReturn } from "../../other/hooks/useDispatchWithReturn";
import { useModal } from "../../other/hooks/useModal";

export const JoinGroupDialog = () => {
  const [values, handleChange] = useForm({
    inviteToken: "",
  });
  const [dispatch] = useDispatchWithReturn();
  const [dialogRef, modal] = useModal();

  const onSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      const result = await dispatch(joinGroup(values));
      if (result) modal?.hide();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog
      dialogRef={dialogRef}
      id="joinGroupDialog"
      title="Join group"
      body={
        <form onSubmit={onSubmit} id="joinGroupForm">
          <label htmlFor="joinGroup">Invite token</label>
          <input
            className="form-control p-2 mb-2"
            id="joinGroup"
            name="inviteToken"
            placeholder="Invite token"
            onChange={handleChange}
            value={values.inviteToken}
            required
          />
        </form>
      }
      footer={
        <button
          className="btn btn-md btn-primary"
          form="joinGroupForm"
          type="submit"
        >
          Join
        </button>
      }
    />
  );
};
