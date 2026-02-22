"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import * as db from "../../database";

export default function CourseHeader({ cid }: { cid: string }) {
  const pathname = usePathname();
  const course = db.courses.find((course: any) => course._id === cid);
  const courseLabel = course ? course.name : "Course Not Found";

  const segments: { label: string; href: string }[] = [
    { label: courseLabel, href: `/courses/${cid}/home` },
  ];

  if (pathname?.includes("/assignments")) {
    segments.push({
      label: "Assignments",
      href: `/courses/${cid}/assignments`,
    });
    const aidMatch = pathname?.match(/\/assignments\/([^/]+)/);
    if (aidMatch && aidMatch[1] !== "page") {
      segments.push({ label: aidMatch[1], href: pathname });
    }
  } else if (pathname?.includes("/modules")) {
    segments.push({ label: "Modules", href: `/courses/${cid}/modules` });
  } else if (pathname?.includes("/grades")) {
    segments.push({ label: "Grades", href: `/courses/${cid}/grades` });
  } else if (pathname?.includes("/people")) {
    segments.push({ label: "People", href: `/courses/${cid}/people/table` });
  } else if (pathname?.includes("/quizzes")) {
    segments.push({ label: "Quizzes", href: `/courses/${cid}/quizzes` });
  } else if (pathname?.includes("/zoom")) {
    segments.push({ label: "Zoom", href: `/courses/${cid}/zoom` });
  } else if (pathname?.includes("/piazza")) {
    segments.push({ label: "Piazza", href: `/courses/${cid}/piazza` });
  } else if (pathname?.endsWith("/home") || pathname === `/courses/${cid}`) {
    segments.push({ label: "Home", href: `/courses/${cid}/home` });
  }

  return (
    <div className="d-flex align-items-center mb-2">
      <FaBars
        className="me-3 fs-4 text-secondary"
        role="button"
        aria-label="Menu"
      />
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-0 flex-wrap">
          {segments.map((seg, i) => (
            <li key={i} className="breadcrumb-item">
              {i < segments.length - 1 ? (
                <Link
                  href={seg.href}
                  className="text-danger text-decoration-none"
                >
                  {seg.label}
                </Link>
              ) : (
                <span className="text-dark">{seg.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
