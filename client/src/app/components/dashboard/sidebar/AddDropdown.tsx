import React from "react";
import { DropdownItem } from "../../other/DropdownItem";
import { PlusButton } from "../../other/PlusButton";

export const AddDropdown = () => {
  return (
    <div className="dropdown d-inline-block">
      <PlusButton toggle="dropdown" />
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
        <DropdownItem
          target="#addGroupDialog"
          icon="plus-circle-fill"
          text="Add group"
        />
        <DropdownItem
          target="#joinGroupDialog"
          icon="people-fill"
          text="Join group"
        />
      </ul>
    </div>
  );
};
