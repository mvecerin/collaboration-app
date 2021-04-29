import React from "react";
import { IconWithText } from "./IconWithText";

interface Props {
  target: string;
  text: string;
  icon: string;
}
export const DropdownItem = ({ target, text, icon }: Props) => (
  <li>
    <button
      className="dropdown-item"
      data-bs-toggle="modal"
      data-bs-target={target}
    >
      <IconWithText icon={icon} text={text} />
    </button>
  </li>
);
