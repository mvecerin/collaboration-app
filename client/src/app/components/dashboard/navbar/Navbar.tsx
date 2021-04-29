import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { RouteParams } from "../../../../utils/interfaces";
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
      {group?._id && (
        <>
          <AddInviteDialog
            groupId={group._id}
            inviteToken={group.inviteToken!}
          />
          <DeleteGroupDialog groupId={group._id} groupTitle={group.title} />
          <LeaveGroupDialog groupId={group._id} groupTitle={group.title} />
          <EditTitleDialog groupId={group._id} groupTitle={group.title} />
        </>
      )}
      <header className="d-flex sticky-top flex-md-nowrap align-items-center bg-dark">
        <Link
          className="navbar-brand bg-primary col-md-3 col-xl-2 ps-3 fs-3 me-0 link-light"
          to="/"
        >
          <IconWithText text="Chat app" icon="chat-dots" />
        </Link>
        <div id="navbar-msg" className="w-100 d-flex my-1">
          {group?._id && <GroupNavBar group={group} />}
          <button
            className="navbar-toggler d-md-none collapsed bi-list btn btn-dark me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
        </div>
      </header>
    </>
  );
};
