import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../../../features/user/userSlice";
import { useAppSelector } from "../../../store";
import { IconWithText } from "../../other/IconWithText";

const AccountNavList = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(signOut());
  };
  return (
    <nav className="py-4">
      <h5>Account</h5>
      <ul className="ps-0">
        <li className="pb-1">
          <div className="small ps-2 ms-1">
            <IconWithText
              icon="person-circle"
              text={`Signed in as ${user?.name}`}
            />
          </div>
        </li>
        <li className="pb-1">
          <button className="btn btn-primary" onClick={onSignOut}>
            <IconWithText icon="box-arrow-right" text="Sign out" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AccountNavList;
