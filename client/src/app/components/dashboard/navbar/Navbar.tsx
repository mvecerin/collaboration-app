import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { IGroup, RouteParams } from "../../../../utils/interfaces";
import { AddInviteDialog } from "./AddInviteDialog";
import { IconWithText } from "../../other/IconWithText";
import { GroupNavBar } from "./GroupNavBar";
import { DeleteGroupDialog } from "./DeleteGroupDialog";
import { useAppSelector } from "../../../store";
import { selectGroupById } from "../../../../features/groups/groupSlice";
import { LeaveGroupDialog } from "./LeaveGroupDialog";
import { EditTitleDialog } from "./EditTitleDialog";

export const Navbar = () => {
  const match = useRouteMatch<RouteParams>("/groups/:id");
  const group = useAppSelector((state) =>
    selectGroupById(state, match?.params.id!)
  );
  return (
    <>
      {group?._id && <Dialogs group={group} />}
      <header className="d-flex sticky-top flex-md-nowrap align-items-center bg-dark">
        <Link
          className="navbar-brand bg-primary col-md-3 col-xl-2 ps-3 fs-3 me-0 link-light"
          to="/groups"
        >
          <IconWithText text="Chat app" icon="chat-dots" />
        </Link>
        <div className="w-100 d-flex align-items-center my-1">
          {group?._id && <GroupNavBar group={group} />}
          <button
            className="navbar-toggler d-md-none collapsed bi-list btn btn-dark me-2 ms-auto"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-label="Toggle navigation"
          ></button>
        </div>
      </header>
    </>
  );
};

interface Props {
  group: IGroup;
}
const Dialogs = ({ group }: Props) => (
  <>
    <AddInviteDialog groupId={group._id!} inviteToken={group.inviteToken!} />
    <DeleteGroupDialog groupId={group._id!} groupTitle={group.title} />
    <LeaveGroupDialog groupId={group._id!} groupTitle={group.title} />
    <EditTitleDialog groupId={group._id!} groupTitle={group.title} />
  </>
);
