import React from "react";
import { leaveGroup } from "../../../../features/groups/groupSlice";
import { Dialog } from "../../other/Dialog";
import { useDispatchWithReturn } from "../../other/hooks/useDispatchWithReturn";
import { useModal } from "../../other/hooks/useModal";
export const LeaveGroupDialog = (props: {
  groupId: string;
  groupTitle: string;
}) => {
  const [dispatch] = useDispatchWithReturn();
  const [dialogRef, modal] = useModal();
  const onLeaveGroup = async () => {
    try {
      const result = await dispatch(leaveGroup(props.groupId));
      if (result) modal?.hide();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog
      dialogRef={dialogRef}
      id="leaveGroupDialog"
      title="Leave group"
      body={
        <>
          <p>
            Leaving group <strong>{props.groupTitle}</strong>.
          </p>
          <p>Are you sure?</p>
        </>
      }
      footer={
        <>
          <button className="btn btn-danger" onClick={onLeaveGroup}>
            Leave
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
