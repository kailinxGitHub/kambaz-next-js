"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./reducer";

const STORAGE_KEY = "kambaz-current-user";

export default function SessionSync() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(STORAGE_KEY);

    if (storedUser) {
      try {
        dispatch(setCurrentUser(JSON.parse(storedUser)));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (currentUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [currentUser, hydrated]);

  return null;
}
