import React from "react";
import { DropdownItem } from "../../other/DropdownItem";

export const AddDropdown = () => {
  return (
    <div className="dropdown d-inline-block">
      <button
        className="bi-plus-circle btn btn-primary rounded-circle btn-sm ms-1"
        title="Add/join new group"
        id="addDropdown"
        data-bs-toggle="dropdown"
      ></button>
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
