import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { selectGroups } from "../../../../features/groups/groupSlice";
import { useAppSelector } from "../../../store";
import { AddDropdown } from "./AddDropdown";
import { IconWithText } from "../../other/IconWithText";
import { IGroup } from "../../../../utils/interfaces";

export const GroupsNavList = () => {
  const groups = useAppSelector(selectGroups);
  return (
    <nav className="py-4">
      <h5>
        <span>Groups</span>
        <AddDropdown />
      </h5>
      <ul className="ps-0">
        {groups.map((group) => (
          <Link group={group} key={group._id} />
        ))}
      </ul>
    </nav>
  );
};

interface Props {
  group: IGroup;
}
const Link = ({ group }: Props) => {
  let { url } = useRouteMatch();

  return (
    <li className="pb-1">
      <NavLink
        to={`${url}/${group._id}`}
        className="btn btn-primary text-start w-100"
        // Fix toggle
        onClick={() => {
          document.getElementById("sidebarMenu")?.classList.remove("show");
        }}
      >
        <IconWithText text={group.title} icon="x-diamond" />
        {/* <span className="badge rounded-pill ms-2 bg-dark">14</span> */}
      </NavLink>
    </li>
  );
};
