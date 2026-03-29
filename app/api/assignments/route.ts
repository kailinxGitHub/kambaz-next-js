import { NextRequest, NextResponse } from "next/server";
import {
  canManageAssignments,
  getRequestRole,
} from "@/lib/kambaz/permissions";
import {
  createAssignment,
  getAssignments,
} from "@/lib/kambaz/server-data";

export async function GET() {
  return NextResponse.json(getAssignments());
}

export async function POST(request: NextRequest) {
  const role = getRequestRole(request.headers);

  if (!canManageAssignments({ role })) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const assignment = await request.json();
  return NextResponse.json(createAssignment(assignment), { status: 201 });
}
