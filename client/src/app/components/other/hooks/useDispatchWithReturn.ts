import { unwrapResult } from "@reduxjs/toolkit";
import { useThunkDispatch } from "../../../store";

export const useDispatchWithReturn = () => {
  const dispatch = useThunkDispatch();
  const doDispatch = async (action: any) => {
    try {
      const promise = await dispatch(action);
      return unwrapResult(promise);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return [doDispatch] as const;
};
