"use client";

import Link from "next/link";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { useParams } from "next/navigation";
import * as db from "../../../database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter((a: any) => a.course === cid);

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
        <Button
          variant="danger"
          size="lg"
          id="wd-add-assignment"
          className="float-end"
        >
          <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
          Assignment
        </Button>
        <Button
          variant="secondary"
          size="lg"
          id="wd-add-assignment-group"
          className="float-end me-1"
        >
          <FaPlus className="me-2 position-relative" style={{ bottom: "1px" }} />
          Group
        </Button>
      </div>

      <div className="wd-assignments-section mb-4">
        <div className="d-flex align-items-center justify-content-between p-3 ps-2 bg-secondary rounded mb-2">
          <h3 className="wd-assignments-title mb-0 fs-5 fw-bold">
            ASSIGNMENTS 40% of Total
          </h3>
          <Button variant="secondary" size="sm">
            <BsPlus className="fs-4" />
          </Button>
        </div>
        <ListGroup id="wd-assignment-list" className="rounded-0">
          {assignments.map((assignment) => (
            <ListGroupItem
              key={assignment._id}
              className="wd-assignment-item border-gray p-3 ps-3"
            >
              <Link
                href={`/courses/${cid}/assignments/${assignment._id}`}
                className="wd-assignment-link text-decoration-none text-dark"
              >
                <div className="wd-assignment-title fw-bold">
                  {assignment.title}
                </div>
                <div className="wd-assignment-subtext text-secondary small">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong>{" "}
                  {assignment.availableDate} | <strong>Due</strong>{" "}
                  {assignment.dueDate} | {assignment.points} pts
                </div>
              </Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
