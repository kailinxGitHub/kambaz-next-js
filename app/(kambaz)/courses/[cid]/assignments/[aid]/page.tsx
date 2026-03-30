"use client";

import Link from "next/link";
import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Button,
} from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  createAssignmentAsync,
  fetchAssignments,
  updateAssignmentAsync,
} from "../reducer";
import { canManageAssignments } from "@/lib/kambaz/permissions";
import type { Assignment, AssignmentDraft } from "@/lib/kambaz/client-api";
import { useAppDispatch, useAppSelector } from "../../../../hooks";

export default function AssignmentEditor() {
  const { cid, aid } = useParams() as { cid: string; aid: string };
  const { assignments, status: assignmentsStatus } = useAppSelector(
    (state) => state.assignmentsReducer
  );
  const { currentUser } = useAppSelector((state) => state.accountReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canEditAssignments = canManageAssignments(currentUser);

  const existingAssignment = assignments.find(
    (currentAssignment: Assignment) => currentAssignment._id === aid
  );
  const emptyAssignment: AssignmentDraft = useMemo(() => ({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
    availableUntil: "",
    course: cid,
  }), [cid]);
  const [draftAssignment, setDraftAssignment] = useState<Assignment | AssignmentDraft | null>(
    null
  );
  const assignment =
    draftAssignment &&
    (aid === "new" ? !("_id" in draftAssignment) : draftAssignment._id === aid)
      ? draftAssignment
      : existingAssignment ?? emptyAssignment;

  useEffect(() => {
    if (assignmentsStatus === "idle") {
      void dispatch(fetchAssignments());
    }
  }, [assignmentsStatus, dispatch]);

  useEffect(() => {
    if (!canEditAssignments) {
      router.replace(`/courses/${cid}/assignments`);
    }
  }, [canEditAssignments, router, cid]);

  useEffect(() => {
    if (
      aid !== "new" &&
      assignmentsStatus === "succeeded" &&
      !existingAssignment
    ) {
      router.replace(`/courses/${cid}/assignments`);
    }
  }, [aid, cid, existingAssignment, router, assignmentsStatus]);

  const handleSave = async () => {
    try {
      if (aid === "new") {
        await dispatch(createAssignmentAsync(assignment as AssignmentDraft)).unwrap();
      } else {
        await dispatch(updateAssignmentAsync(assignment as Assignment)).unwrap();
      }
      setDraftAssignment(null);
      router.push(`/courses/${cid}/assignments`);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to save assignment.");
    }
  };

  if (!canEditAssignments) {
    return null;
  }

  return (
    <div id="wd-assignments-editor" className="mb-4">
      <nav className="mb-3" aria-label="breadcrumb">
        <ol className="breadcrumb mb-1">
          <li className="breadcrumb-item">
            <Link
              href={`/courses/${cid}/assignments`}
              className="text-danger text-decoration-none"
            >
              Assignments
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {assignment?.title || "New Assignment"}
          </li>
        </ol>
      </nav>

      <Form>
        <div className="mb-3">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl
            id="wd-name"
            type="text"
            value={assignment.title}
            onChange={(e) => setDraftAssignment({ ...assignment, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <FormLabel>Description</FormLabel>
          <FormControl
            id="wd-description"
            as="textarea"
            rows={5}
            className="border"
            value={assignment.description}
            onChange={(e) =>
              setDraftAssignment({ ...assignment, description: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
          <FormControl
            id="wd-points"
            type="number"
            value={assignment.points}
            onChange={(e) =>
              setDraftAssignment({
                ...assignment,
                points: parseInt(e.target.value, 10) || 0,
              })
            }
            style={{ maxWidth: "120px" }}
          />
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-assignment-group">Assignment Group</FormLabel>
          <FormSelect id="wd-assignment-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
          <FormSelect id="wd-display-grade-as" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Points">Points</option>
            <option value="Letter">Letter</option>
          </FormSelect>
        </div>

        <div className="mb-3">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
          <FormSelect id="wd-submission-type" defaultValue="Online">
            <option value="Online">Online</option>
            <option value="On Paper">On Paper</option>
            <option value="External Tool">External Tool</option>
            <option value="No Submission">No Submission</option>
          </FormSelect>
        </div>

        <div className="mb-3">
          <FormLabel className="d-block mb-2">Online Entry Options</FormLabel>
          <FormCheck
            type="checkbox"
            id="wd-submission-text-entry"
            label="Text Entry"
            className="mb-1"
          />
          <FormCheck
            type="checkbox"
            id="wd-submission-website-url"
            label="Website URL"
            defaultChecked
            className="mb-1"
          />
          <FormCheck
            type="checkbox"
            id="wd-submission-media-recordings"
            label="Media Recordings"
            className="mb-1"
          />
          <FormCheck
            type="checkbox"
            id="wd-submission-student-annotation"
            label="Student Annotation"
            className="mb-1"
          />
          <FormCheck
            type="checkbox"
            id="wd-submission-file-uploads"
            label="File Uploads"
            className="mb-1"
          />
        </div>

        <FormLabel className="d-block mb-2">Assign</FormLabel>
        <div className="mb-3">
          <FormLabel
            htmlFor="wd-assign-to"
            className="text-secondary fw-normal small"
          >
            Assign to
          </FormLabel>
          <FormControl id="wd-assign-to" type="text" defaultValue="Everyone" />
        </div>

        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <FormLabel
              htmlFor="wd-due-date"
              className="text-secondary fw-normal small"
            >
              Due
            </FormLabel>
            <div className="input-group">
              <FormControl
                id="wd-due-date"
                type="datetime-local"
                value={assignment.dueDate}
                onChange={(e) =>
                  setDraftAssignment({ ...assignment, dueDate: e.target.value })
                }
              />
              <span className="input-group-text">
                <FaCalendarAlt className="text-secondary" />
              </span>
            </div>
          </div>
          <div className="col-md-4">
            <FormLabel
              htmlFor="wd-available-from"
              className="text-secondary fw-normal small"
            >
              Available from
            </FormLabel>
            <div className="input-group">
              <FormControl
                id="wd-available-from"
                type="datetime-local"
                value={assignment.availableDate}
                onChange={(e) =>
                  setDraftAssignment({ ...assignment, availableDate: e.target.value })
                }
              />
              <span className="input-group-text">
                <FaCalendarAlt className="text-secondary" />
              </span>
            </div>
          </div>
          <div className="col-md-4">
            <FormLabel
              htmlFor="wd-until"
              className="text-secondary fw-normal small"
            >
              Until
            </FormLabel>
            <div className="input-group">
              <FormControl
                id="wd-until"
                type="datetime-local"
                value={assignment.availableUntil || ""}
                onChange={(e) =>
                  setDraftAssignment({ ...assignment, availableUntil: e.target.value })
                }
              />
              <span className="input-group-text">
                <FaCalendarAlt className="text-secondary" />
              </span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
          <Link
            href={`/courses/${cid}/assignments`}
            className="btn border text-secondary btn-light"
          >
            Cancel
          </Link>
          <Button
            variant="danger"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
