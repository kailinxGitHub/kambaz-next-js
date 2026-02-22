"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path = `/${link.toLowerCase()}`;
        if (link === "Piazza") {
          return (
            <a
              key={link}
              href="https://piazza.com"
              id="wd-course-piazza-link"
              target="_blank"
              rel="noreferrer"
              className="list-group-item text-danger border-0"
            >
              {link}
            </a>
          );
        }
        
        let pathNameForPeople = path;
        if(link === "People") {
            pathNameForPeople = "/people/table";
        }
        
        const href = `/courses/${cid}${pathNameForPeople}`;
        const isActive = pathname === href || (pathNameForPeople !== "/home" && pathname?.startsWith(href + "/"));
        const className = `list-group-item border-0 ${isActive ? "active" : "text-danger"}`;

        return (
          <Link
            key={link}
            href={href}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={className}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
