"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser
    ? [{ href: "/account/profile", label: "Profile" }]
    : [
        { href: "/account/signin", label: "Signin" },
        { href: "/account/signup", label: "Signup" },
      ];

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group rounded-0"
      style={{ width: "200px" }}
    >
      <div className="list-group-item border-0 text-start py-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`d-block py-1 ps-2 text-decoration-none ${pathname === link.href ? "text-black fw-semibold border-start border-secondary border-2" : "text-danger"}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
