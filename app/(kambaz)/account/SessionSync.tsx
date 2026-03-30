"use client";

import { useEffect } from "react";
import { clearEnrollments, fetchMyEnrollments } from "../enrollments/reducer";
import { profile } from "./client";
import { setAuthLoaded, setCurrentUser } from "./reducer";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function SessionSync() {
  const dispatch = useAppDispatch();
  const { currentUser, isLoaded } = useAppSelector((state) => state.accountReducer);

  useEffect(() => {
    const syncSession = async () => {
      try {
        const user = await profile();
        dispatch(setCurrentUser(user));
        await dispatch(fetchMyEnrollments());
      } catch {
        dispatch(setCurrentUser(null));
        dispatch(clearEnrollments());
      } finally {
        dispatch(setAuthLoaded(true));
      }
    };

    if (!isLoaded) {
      void syncSession();
    }
  }, [dispatch, isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (currentUser) {
      void dispatch(fetchMyEnrollments());
      return;
    }
    dispatch(clearEnrollments());
  }, [currentUser, dispatch, isLoaded]);

  return null;
}
