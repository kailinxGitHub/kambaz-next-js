import { NextRequest, NextResponse } from "next/server";
import { canManageCourses, getRequestRole } from "@/lib/kambaz/permissions";
import {
  createCourse,
  getCourses,
} from "@/lib/kambaz/server-data";

export async function GET() {
  return NextResponse.json(getCourses());
}

export async function POST(request: NextRequest) {
  const role = getRequestRole(request.headers);

  if (!canManageCourses({ role })) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const course = await request.json();
  return NextResponse.json(createCourse(course), { status: 201 });
}
