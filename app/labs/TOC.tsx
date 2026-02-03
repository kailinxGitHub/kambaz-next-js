"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();

  return (
    <Nav variant="pills" activeKey={pathname ?? undefined}>
      <NavItem>
        <NavLink href="/labs" as={Link} eventKey="/labs">
          Labs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab1" as={Link} eventKey="/labs/lab1">
          Lab 1
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab2" as={Link} eventKey="/labs/lab2">
          Lab 2
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/labs/lab3" as={Link} eventKey="/labs/lab3">
          Lab 3
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link} eventKey="/">
          Kambaz
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/kailinxGitHub">My GitHub</NavLink>
      </NavItem>
    </Nav>
  );
}
