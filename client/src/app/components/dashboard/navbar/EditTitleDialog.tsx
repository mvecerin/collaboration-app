import React, { useEffect, useState } from "react";
import { editGroupTitle } from "../../../../features/groups/groupSlice";
import { Dialog } from "../../other/Dialog";
import { useDispatchWithReturn } from "../../other/hooks/useDispatchWithReturn";
import { useModal } from "../../other/hooks/useModal";

export const EditTitleDialog = (props: {
  groupId: string;
  groupTitle: string;
}) => {
  const [title, setTitle] = useState<string | null>(props.groupTitle || null);
  const [dispatch] = useDispatchWithReturn();
  const [dialogRef, modal] = useModal();

  const onSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        editGroupTitle({
          _id: props.groupId,
          title: title!,
        })
      );
      if (result) modal?.hide();
    } catch (e) {}
  };

  useEffect(() => {
    setTitle(props.groupTitle);
  }, [props.groupTitle]);

  return (
    <Dialog
      dialogRef={dialogRef}
      id="editGroupTitle"
      title="Change title"
      body={
        <form onSubmit={onSubmit} id="editGroupForm">
          <label htmlFor="editTitle">Title</label>
          <input
            className="form-control p-2 mb-2"
            id="editTitle"
            name="title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title!}
            required
          />
        </form>
      }
      footer={
        <button
          className="btn btn-md btn-primary"
          form="editGroupForm"
          type="submit"
        >
          OK
        </button>
      }
    />
  );
};
