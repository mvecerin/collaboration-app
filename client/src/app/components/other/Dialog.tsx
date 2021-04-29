import React from "react";

interface Props {
  dialogRef?: React.LegacyRef<HTMLDivElement>;
  id: string;
  title: string;
  body: JSX.Element;
  footer?: JSX.Element;
}

export const Dialog = (props: Props) => {
  return (
    <div
      ref={props.dialogRef}
      className="modal fade"
      id={props.id}
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{props.body}</div>
          <div className="modal-footer">{props.footer}</div>
        </div>
      </div>
    </div>
  );
};
