import React from "react";

interface Props {
  toggle: string;
  target?: string;
}

export const PlusButton = ({ target, toggle }: Props) => {
  return (
    <button
      className="bi-plus-circle btn btn-primary rounded-circle btn-sm ms-1"
      data-bs-toggle={toggle}
      data-bs-target={target && target}
    ></button>
  );
};
