import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { selectGroups } from "../../../../features/groups/groupSlice";
import { useAppSelector } from "../../../store";
import { IconWithText } from "../../other/IconWithText";
import { IGroup } from "../../../../utils/interfaces";

export const GroupsNavList = () => {
  const groups = useAppSelector(selectGroups);
  return (
    <>
      {groups.map((group) => (
        <Link group={group} key={group._id} />
      ))}
    </>
  );
};

interface Props {
  group: IGroup;
}
const Link = ({ group }: Props) => {
  let { url } = useRouteMatch();

  return (
    <li className="pt-1">
      <NavLink
        to={`${url}/${group._id}`}
        className="btn btn-primary text-start w-100"
        onClick={() => {
          document.getElementById("sidebarMenu")?.classList.remove("show");
        }}
      >
        <IconWithText text={group.title} icon="x-diamond" />
      </NavLink>
    </li>
  );
};
