import { NextRequest, NextResponse } from "next/server";
import { canManageCourses, getRequestRole } from "@/lib/kambaz/permissions";
import {
  deleteCourse,
  updateCourse,
} from "@/lib/kambaz/server-data";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  const role = getRequestRole(request.headers);

  if (!canManageCourses({ role })) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { courseId } = await context.params;
  const course = await request.json();
  const updatedCourse = updateCourse(courseId, course);

  if (!updatedCourse) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(updatedCourse);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  const role = getRequestRole(request.headers);

  if (!canManageCourses({ role })) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { courseId } = await context.params;
  const wasDeleted = deleteCourse(courseId);

  if (!wasDeleted) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ courseId });
}
