"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";

export default function AccountNavigation() {
  const pathname = usePathname();

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group rounded-0"
      style={{ width: "200px" }}
    >
      <div className="list-group-item border-0 text-start py-2">
        <Link
          href="/account/signin"
          className={`d-block py-1 ps-2 text-decoration-none ${pathname === "/account/signin" ? "text-black fw-semibold border-start border-secondary border-2" : "text-danger"}`}
        >
          Signin
        </Link>
        <Link
          href="/account/signup"
          className={`d-block py-1 ps-2 text-decoration-none ${pathname === "/account/signup" ? "text-black fw-semibold border-start border-secondary border-2" : "text-danger"}`}
        >
          Signup
        </Link>
        <Link
          href="/account/profile"
          className={`d-block py-1 ps-2 text-decoration-none ${pathname === "/account/profile" ? "text-black fw-semibold border-start border-secondary border-2" : "text-danger"}`}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}
