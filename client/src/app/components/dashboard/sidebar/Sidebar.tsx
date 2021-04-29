import React from "react";
import { AddGroupDialog } from "./AddGroupDialog";
import AccountNavList from "./AccountNavList";
import { GroupsNavList } from "./GroupsNavList";
import { JoinGroupDialog } from "./JoinGroupDialog";

export const Sidebar = () => {
  return (
    <>
      <AddGroupDialog />
      <JoinGroupDialog />
      <aside
        id="sidebarMenu"
        className="col-md-3 col-xl-2 d-md-block bg-primary sidebar collapse"
      >
        <GroupsNavList />
        <AccountNavList />
      </aside>
    </>
  );
};
