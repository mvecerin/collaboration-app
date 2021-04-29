import React, { useEffect, useState } from "react";
import { createInvite } from "../../../../features/groups/groupSlice";
import { Dialog } from "../../other/Dialog";
import { useDispatchWithReturn } from "../../other/hooks/useDispatchWithReturn";

export const AddInviteDialog = (props: {
  groupId: string;
  inviteToken: string;
}) => {
  const [dispatch] = useDispatchWithReturn();
  const [inviteToken, setToken] = useState<string | null>(
    props.inviteToken || null
  );

  const generateToken = async () => {
    try {
      const result = await dispatch(createInvite(props.groupId));
      if (result) setToken(result.updated.inviteToken);
    } catch (e) {}
  };

  useEffect(() => {
    setToken(props.inviteToken);
  }, [props.inviteToken]);

  return (
    <Dialog
      id="addInviteDialog"
      title="Get invite token"
      body={
        inviteToken ? (
          <div className="input-group mb-3">
            <input className="form-control" value={inviteToken} readOnly />
            <button
              className="bi-clipboard btn-primary btn"
              title="Copy token"
              onClick={(e) => {
                navigator.clipboard.writeText(inviteToken);
                e.currentTarget.classList.replace(
                  "bi-clipboard",
                  "bi-clipboard-check"
                );
              }}
            ></button>
          </div>
        ) : (
          <p>No token</p>
        )
      }
      footer={
        <>
          <button className="btn btn-primary" onClick={generateToken}>
            Generate new token
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </>
      }
    />
  );
};
