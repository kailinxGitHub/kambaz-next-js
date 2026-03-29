"use client";
import { ReactNode, useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import CourseNavigation from "./Navigation";
import CourseHeader from "./CourseHeader";
import { canAccessCourse } from "@/lib/kambaz/permissions";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams() as { cid: string };
  const [showNav, setShowNav] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser?._id && enrollment.course === cid
  );
  const userCanAccessCourse = canAccessCourse(currentUser, isEnrolled);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !userCanAccessCourse) {
      router.push("/dashboard");
    }
  }, [mounted, userCanAccessCourse, cid, router, pathname]);

  if (!mounted) {
    return null;
  }

  if (!userCanAccessCourse) {
    return null;
  }

  return (
    <div id="wd-courses">
      <CourseHeader cid={cid} toggleNav={() => setShowNav(!showNav)} />
      <hr />
      <div className="d-flex">
        {showNav && (
          <div className="d-none d-md-block">
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
