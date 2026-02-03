"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();

  const linkClass = (path: string) => {
    if (path.startsWith("http")) return "list-group-item text-danger border-0";
    const href = `/courses/${cid}${path}`;
    const isActive =
      pathname === href ||
      (path !== "/home" && pathname?.startsWith(href + "/"));
    return `list-group-item border-0 ${isActive ? "active" : "text-danger"}`;
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href={`/courses/${cid}/home`}
        id="wd-course-home-link"
        className={linkClass("/home")}
      >
        Home
      </Link>
      <Link
        href={`/courses/${cid}/modules`}
        id="wd-course-modules-link"
        className={linkClass("/modules")}
      >
        Modules
      </Link>
      <a
        href="https://piazza.com"
        id="wd-course-piazza-link"
        target="_blank"
        rel="noreferrer"
        className="list-group-item text-danger border-0"
      >
        Piazza
      </a>
      <Link
        href={`/courses/${cid}/zoom`}
        id="wd-course-zoom-link"
        className={linkClass("/zoom")}
      >
        Zoom
      </Link>
      <Link
        href={`/courses/${cid}/assignments`}
        id="wd-course-assignments-link"
        className={linkClass("/assignments")}
      >
        Assignments
      </Link>
      <Link
        href={`/courses/${cid}/quizzes`}
        id="wd-course-quizzes-link"
        className={linkClass("/quizzes")}
      >
        Quizzes
      </Link>
      <Link
        href={`/courses/${cid}/grades`}
        id="wd-course-grades-link"
        className={linkClass("/grades")}
      >
        Grades
      </Link>
      <Link
        href={`/courses/${cid}/people/table`}
        id="wd-course-people-link"
        className={linkClass("/people/table")}
      >
        People
      </Link>
    </div>
  );
}
