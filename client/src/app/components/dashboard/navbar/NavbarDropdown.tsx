import React from "react";
import { DropdownItem } from "../../other/DropdownItem";

export const NavbarDropdown = (props: {
  isAdmin: boolean;
  groupId: string;
}) => {
  return (
    <div className="dropdown me-2">
      <button
        className="btn btn-dark bi-gear"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></button>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
        {props.isAdmin ? (
          <>
            <DropdownItem
              target="#addInviteDialog"
              icon="person-plus-fill"
              text="Invite people"
            />
            <DropdownItem
              target="#editGroupTitle"
              icon="pencil-fill"
              text="Edit group"
            />
            <DropdownItem
              target="#deleteGroupDialog"
              icon="trash"
              text="Delete group"
            />
          </>
        ) : (
          <DropdownItem
            target="#leaveGroupDialog"
            icon="arrow-right-circle"
            text="Leave group"
          />
        )}
      </ul>
    </div>
  );
};
