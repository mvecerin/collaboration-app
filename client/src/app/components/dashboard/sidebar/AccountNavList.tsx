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
    <>
      <li className="pt-1">
        <div className="ps-2 pt-1 ms-1 lighter">
          <IconWithText
            icon="person-circle"
            text={`Signed in as ${user?.name}`}
          />
        </div>
      </li>
      <li className="pt-1">
        <button
          className="btn btn-primary w-100 text-start"
          onClick={onSignOut}
        >
          <IconWithText icon="box-arrow-right" text="Sign out" />
        </button>
      </li>
    </>
  );
};

export default AccountNavList;
