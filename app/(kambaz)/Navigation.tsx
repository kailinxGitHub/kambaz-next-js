"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

function isActive(path: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (path === "/account") return pathname.startsWith("/account");
  if (path === "/dashboard") return pathname === "/dashboard";
  if (path === "/courses")
    return pathname === "/courses" || pathname.startsWith("/courses/");
  if (path === "/labs")
    return pathname === "/labs" || pathname.startsWith("/labs/");
  return pathname === path;
}

export default function KambazNavigation() {
  const pathname = usePathname();

  const navItemClass = (path: string) => {
    const active = isActive(path, pathname);
    return `border-0 text-center ${active ? "bg-white" : "bg-black"}`;
  };

  const linkClass = (path: string) => {
    const active = isActive(path, pathname);
    return `text-decoration-none text-center ${active ? "text-danger" : "text-white"}`;
  };

  const iconClass = (path: string) => {
    const active = isActive(path, pathname);
    return `fs-1 ${active ? "text-danger" : "text-white"}`;
  };

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      <br />
      <ListGroupItem className={navItemClass("/account")}>
        <Link
          href="/account"
          id="wd-account-link"
          className={linkClass("/account")}
        >
          <FaRegCircleUser className={iconClass("/account")} />
          <br />
          Account
        </Link>
      </ListGroupItem>
      <br />
      <ListGroupItem className={navItemClass("/dashboard")}>
        <Link
          href="/dashboard"
          id="wd-dashboard-link"
          className={linkClass("/dashboard")}
        >
          <AiOutlineDashboard className={iconClass("/dashboard")} />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <br />
      <ListGroupItem className={navItemClass("/courses")}>
        <Link
          href="/courses"
          id="wd-courses-link"
          className={linkClass("/courses")}
        >
          <AiOutlineDashboard className={iconClass("/courses")} />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <br />
      <ListGroupItem className={navItemClass("/calendar")}>
        <Link
          href="/calendar"
          id="wd-calendar-link"
          className={linkClass("/calendar")}
        >
          <IoCalendarOutline className={iconClass("/calendar")} />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <br />
      <ListGroupItem className={navItemClass("/inbox")}>
        <Link href="/inbox" id="wd-inbox-link" className={linkClass("/inbox")}>
          <FaInbox className={iconClass("/inbox")} />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <br />
      <ListGroupItem className={navItemClass("/labs")}>
        <Link href="/labs" id="wd-labs-link" className={linkClass("/labs")}>
          <LiaBookSolid className={iconClass("/labs")} />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
