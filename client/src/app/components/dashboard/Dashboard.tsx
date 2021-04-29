/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { Socket } from "socket.io-client";
import { getGroups } from "../../../features/groups/groupSlice";
import { clearAuthSuccess } from "../../../features/user/userSlice";
import { initSocket } from "../../../utils/socket";

import { useAppSelector, useThunkDispatch } from "../../store";
import { Group } from "./groups/Group";
import { Navbar } from "./navbar/Navbar";
import { Sidebar } from "./sidebar/Sidebar";

export const Dashboard = () => {
  const { success, user } = useAppSelector((state) => state.user);
  const dispatch = useThunkDispatch();
  let { path } = useRouteMatch();
  const { ids } = useAppSelector((state) => state.groups);
  const socket = useRef<Socket>();

  // Show success toast on sign in success and load groups
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearAuthSuccess());
    }
    dispatch(getGroups());
  }, []);

  useEffect(() => {
    // Connect if socket not initialized or disconnected
    if (!socket.current || socket.current?.disconnected) {
      if (ids.length !== 0 && user?._id) {
        socket.current = initSocket(user?._id, ids, dispatch);
      }
    }
    // Disconnect on unmount
    return () => {
      if (socket.current?.connected) socket.current.disconnect();
    };
  }, [ids]);

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-xl-10">
            <Switch>
              <Route path={`${path}/:id`}>
                <Group />
              </Route>
              <Route exact path={`${path}`}>
                <Redirect to={`${path}/${ids[0] ? ids[0] : ""}`} />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    </>
  );
};
