import React from "react";
import { AddGroupDialog } from "./AddGroupDialog";
import AccountNavList from "./AccountNavList";
import { GroupsNavList } from "./GroupsNavList";
import { JoinGroupDialog } from "./JoinGroupDialog";
import { AddDropdown } from "./AddDropdown";
import { LinkGroup } from "./LinkGroup";

export const Sidebar = () => {
  return (
    <>
      <AddGroupDialog />
      <JoinGroupDialog />
      <aside
        className="col-md-3 col-xl-2 d-md-block bg-primary sidebar collapse"
        id="sidebarMenu"
      >
        <LinkGroup
          name="Groups"
          children={<GroupsNavList />}
          button={<AddDropdown />}
        />
        <LinkGroup name="Account" children={<AccountNavList />} />
      </aside>
    </>
  );
};
