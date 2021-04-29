import React from "react";
import { deleteGroup } from "../../../../features/groups/groupSlice";
import { Dialog } from "../../other/Dialog";
import { useDispatchWithReturn } from "../../other/hooks/useDispatchWithReturn";
import { useModal } from "../../other/hooks/useModal";

export const DeleteGroupDialog = (props: {
  groupId: string;
  groupTitle: string;
}) => {
  const [dispatch] = useDispatchWithReturn();
  const [dialogRef, modal] = useModal();

  const onDeleteGroup = async () => {
    try {
      const result = await dispatch(deleteGroup(props.groupId));
      if (result) modal?.hide();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog
      dialogRef={dialogRef}
      id="deleteGroupDialog"
      title="Delete group"
      body={
        <>
          <p>
            Deleting group <strong>{props.groupTitle}</strong>.
          </p>
          <p>Are you sure?</p>
        </>
      }
      footer={
        <>
          <button className="btn btn-danger" onClick={onDeleteGroup}>
            Delete
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            Cancel
          </button>
        </>
      }
    />
  );
};
