import React from "react";
import { IGroup } from "../../../../utils/interfaces";
import { useAppSelector } from "../../../store";
import { IconWithText } from "../../other/IconWithText";
import { NavbarDropdown } from "./NavbarDropdown";

export const GroupNavBar = (params: { group?: IGroup }) => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      <h5 className="flex-grow-1 ps-3 text-light" id="nav-group-title">
        <IconWithText icon="x-diamond" text={params.group?.title!} />
        <span className="members-text text-muted tiny ms-3">
          {params.group?.memberIds?.length} members
        </span>
      </h5>
      <NavbarDropdown
        isAdmin={params.group?.creatorId === user?._id ? true : false}
        groupId={params.group?._id!}
      />
    </>
  );
};
