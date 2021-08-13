import React from "react";
import { IconWithText } from "./IconWithText";

interface Props {
  target: string;
  text: string;
  icon: string;
  toggle?: string;
}
export const DropdownItem = ({ target, text, icon, toggle }: Props) => (
  <li>
    <button
      className="dropdown-item"
      data-bs-toggle={toggle ? toggle : "modal"}
      data-bs-target={target}
    >
      <IconWithText icon={icon} text={text} />
    </button>
  </li>
);
