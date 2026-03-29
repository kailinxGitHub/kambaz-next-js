import { NextRequest, NextResponse } from "next/server";
import {
  canManageAssignments,
  getRequestRole,
} from "@/lib/kambaz/permissions";
import {
  deleteAssignment,
  updateAssignment,
} from "@/lib/kambaz/server-data";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ assignmentId: string }> }
) {
  const role = getRequestRole(request.headers);

  if (!canManageAssignments({ role })) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { assignmentId } = await context.params;
  const assignment = await request.json();
  const updatedAssignment = updateAssignment(assignmentId, assignment);

  if (!updatedAssignment) {
    return NextResponse.json(
      { error: "Assignment not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedAssignment);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ assignmentId: string }> }
) {
  const role = getRequestRole(request.headers);

  if (!canManageAssignments({ role })) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { assignmentId } = await context.params;
  const wasDeleted = deleteAssignment(assignmentId);

  if (!wasDeleted) {
    return NextResponse.json(
      { error: "Assignment not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ assignmentId });
}
