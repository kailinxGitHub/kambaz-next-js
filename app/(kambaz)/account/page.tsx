"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountPage() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser) {
    redirect("/account/profile");
  } else {
    redirect("/account/signin");
  }
}
