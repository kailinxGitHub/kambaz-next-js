"use client";

import Link from "next/link";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteAssignmentAsync, fetchAssignments } from "./reducer";
import { canManageAssignments } from "@/lib/kambaz/permissions";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments, status: assignmentsStatus } = useSelector(
    (state: any) => state.assignmentsReducer
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const courseAssignments = assignments.filter((a: any) => a.course === cid);
  const canEditAssignments = canManageAssignments(currentUser);

  useEffect(() => {
    if (assignmentsStatus === "idle") {
      dispatch(fetchAssignments() as any);
    }
  }, [assignmentsStatus, dispatch]);

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await dispatch(
        deleteAssignmentAsync({ assignmentId, role: currentUser?.role }) as any
      ).unwrap();
    } catch (error: any) {
      alert(error.message ?? "Unable to delete assignment.");
    }
  };

  return (
    <div id="wd-assignments" className="mb-4">
      <div className="d-block mb-5">
        <div
          className="input-group float-start me-2"
          style={{ maxWidth: "400px" }}
        >
          <span className="input-group-text bg-white">
            <IoSearch className="text-secondary" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search for Assignment"
            id="wd-search-assignment"
            aria-label="Search for Assignment"
          />
        </div>
        {canEditAssignments && (
          <div className="float-end">
            <Button
              variant="secondary"
              size="lg"
              id="wd-add-assignment-group"
              className="me-1"
            >
              <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
              Group
            </Button>
            <Link
              href={`/courses/${cid}/assignments/new`}
              className="btn btn-danger btn-lg"
              id="wd-add-assignment"
            >
              <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
              Assignment
            </Link>
          </div>
        )}
      </div>

      <div className="wd-assignments-section mb-4">
        <div className="d-flex align-items-center justify-content-between p-3 ps-2 bg-secondary rounded mb-2">
          <h3 className="wd-assignments-title mb-0 fs-5 fw-bold">
            ASSIGNMENTS 40% of Total
          </h3>
          {canEditAssignments && (
            <Button variant="secondary" size="sm">
              <BsPlus className="fs-4" />
            </Button>
          )}
        </div>
        <ListGroup id="wd-assignment-list" className="rounded-0">
          {courseAssignments.map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="wd-assignment-item border-gray p-3 ps-3 align-items-center d-flex"
            >
              <div className="grow">
                {canEditAssignments ? (
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="wd-assignment-link text-decoration-none text-dark"
                  >
                    <div className="wd-assignment-title fw-bold">
                      {assignment.title}
                    </div>
                    <div className="wd-assignment-subtext text-secondary small">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <strong>Available from</strong> {assignment.availableDate} |{" "}
                      <strong>Available until</strong>{" "}
                      {assignment.availableUntil || assignment.dueDate} |{" "}
                      <strong>Due</strong> {assignment.dueDate} | {assignment.points} pts
                    </div>
                  </Link>
                ) : (
                  <>
                    <div className="wd-assignment-title fw-bold">
                      {assignment.title}
                    </div>
                    <div className="wd-assignment-subtext text-secondary small">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <strong>Available from</strong> {assignment.availableDate} |{" "}
                      <strong>Available until</strong>{" "}
                      {assignment.availableUntil || assignment.dueDate} |{" "}
                      <strong>Due</strong> {assignment.dueDate} | {assignment.points} pts
                    </div>
                  </>
                )}
              </div>
              {canEditAssignments && (
                <FaTrash
                  className="text-danger mb-1 fs-5"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm("Are you sure you want to delete this assignment?")) {
                      void handleDeleteAssignment(assignment._id);
                    }
                  }}
                />
              )}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
