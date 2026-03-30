"use client";
import { redirect } from "next/navigation";
import { useAppSelector } from "../hooks";

export default function AccountPage() {
  const { currentUser, isLoaded } = useAppSelector((state) => state.accountReducer);
  if (!isLoaded) {
    return null;
  }
  if (currentUser) {
    redirect("/account/profile");
  } else {
    redirect("/account/signin");
  }
}
