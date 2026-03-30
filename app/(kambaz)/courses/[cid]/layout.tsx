"use client";
import { ReactNode, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CourseNavigation from "./Navigation";
import CourseHeader from "./CourseHeader";
import { canAccessCourse, isStaffRole } from "@/lib/kambaz/permissions";
import { fetchMyEnrollments } from "../../enrollments/reducer";
import type { Enrollment } from "@/lib/kambaz/client-api";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams() as { cid: string };
  const [showNav, setShowNav] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { enrollments, status: enrollmentsStatus } = useAppSelector(
    (state) => state.enrollmentsReducer
  );
  const { currentUser, isLoaded } = useAppSelector((state) => state.accountReducer);

  const isEnrolled = enrollments.some(
    (enrollment: Enrollment) =>
      enrollment.user === currentUser?._id && enrollment.course === cid
  );
  const isStaffMember = isStaffRole(currentUser?.role);
  const needsEnrollmentLookup =
    !!currentUser && !isStaffMember && enrollmentsStatus === "idle";
  const userCanAccessCourse = canAccessCourse(currentUser, isEnrolled);

  useEffect(() => {
    if (needsEnrollmentLookup) {
      void dispatch(fetchMyEnrollments());
    }
  }, [dispatch, needsEnrollmentLookup]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!currentUser) {
      router.replace("/dashboard");
      return;
    }
    const finishedCheckingEnrollment =
      isStaffMember || enrollmentsStatus === "succeeded" || enrollmentsStatus === "failed";
    if (finishedCheckingEnrollment && !userCanAccessCourse) {
      router.replace("/dashboard");
    }
  }, [
    currentUser,
    enrollmentsStatus,
    isLoaded,
    isStaffMember,
    router,
    userCanAccessCourse,
  ]);

  if (!isLoaded || !currentUser) {
    return null;
  }

  if (!isStaffMember && (enrollmentsStatus === "loading" || enrollmentsStatus === "idle")) {
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
