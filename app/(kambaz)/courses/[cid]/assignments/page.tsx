import Link from "next/link";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;

  return (
    <div id="wd-assignments" className="mb-4">
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        <div
          className="input-group flex-grow-1 me-2"
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
        <div className="d-flex ms-auto gap-1">
          <Button
            variant="secondary"
            size="lg"
            id="wd-add-assignment-group"
            className="text-nowrap"
          >
            <FaPlus className="me-2" style={{ verticalAlign: "middle" }} />
            Group
          </Button>
          <Button
            variant="danger"
            size="lg"
            id="wd-add-assignment"
            className="text-nowrap"
          >
            <FaPlus className="me-2" style={{ verticalAlign: "middle" }} />
            Assignment
          </Button>
        </div>
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
          <ListGroupItem className="wd-assignment-item border-gray p-3 ps-3">
            <Link
              href={`/courses/${cid}/assignments/123`}
              className="wd-assignment-link text-decoration-none text-dark"
            >
              <div className="wd-assignment-title fw-bold">A1 - ENV + HTML</div>
              <div className="wd-assignment-subtext text-secondary small">
                Multiple Assignments | Due Jan 15, 2025 at 11:59pm | 100 pts
              </div>
            </Link>
          </ListGroupItem>
          <ListGroupItem className="wd-assignment-item border-gray p-3 ps-3">
            <Link
              href={`/courses/${cid}/assignments/124`}
              className="wd-assignment-link text-decoration-none text-dark"
            >
              <div className="wd-assignment-title fw-bold">
                A2 - CSS + BOOTSTRAP
              </div>
              <div className="wd-assignment-subtext text-secondary small">
                Multiple Assignments | Due Jan 22, 2025 at 11:59pm | 100 pts
              </div>
            </Link>
          </ListGroupItem>
          <ListGroupItem className="wd-assignment-item border-gray p-3 ps-3">
            <Link
              href={`/courses/${cid}/assignments/125`}
              className="wd-assignment-link text-decoration-none text-dark"
            >
              <div className="wd-assignment-title fw-bold">
                A3 - JAVASCRIPT + REACT
              </div>
              <div className="wd-assignment-subtext text-secondary small">
                Multiple Assignments | Due Jan 29, 2025 at 11:59pm | 100 pts
              </div>
            </Link>
          </ListGroupItem>
        </ListGroup>
      </div>

      <div className="wd-quizzes-section mb-4">
        <div className="d-flex align-items-center justify-content-between p-3 ps-2 bg-secondary rounded mb-2">
          <h3 className="wd-quizzes-title mb-0 fs-5 fw-bold">
            QUIZZES 10% of Total
          </h3>
          <Button variant="secondary" size="sm">
            <BsPlus className="fs-4" />
          </Button>
        </div>
        <ListGroup id="wd-quiz-list" className="rounded-0">
          <ListGroupItem className="wd-assignment-item border-gray p-3 ps-3">
            <Link
              href={`/courses/${cid}/assignments/201`}
              className="wd-assignment-link text-decoration-none text-dark"
            >
              <div className="wd-assignment-title fw-bold">
                Q1 - HTML Basics
              </div>
              <div className="wd-assignment-subtext text-secondary small">
                Quiz | Due Feb 1, 2025 at 11:59pm | 25 pts
              </div>
            </Link>
          </ListGroupItem>
        </ListGroup>
      </div>

      <div className="wd-exams-section mb-4">
        <div className="d-flex align-items-center justify-content-between p-3 ps-2 bg-secondary rounded mb-2">
          <h3 className="wd-exams-title mb-0 fs-5 fw-bold">
            EXAMS 20% of Total
          </h3>
          <Button variant="secondary" size="sm">
            <BsPlus className="fs-4" />
          </Button>
        </div>
        <ListGroup id="wd-exam-list" className="rounded-0">
          <ListGroupItem className="wd-assignment-item border-gray p-3 ps-3">
            <Link
              href={`/courses/${cid}/assignments/301`}
              className="wd-assignment-link text-decoration-none text-dark"
            >
              <div className="wd-assignment-title fw-bold">Midterm</div>
              <div className="wd-assignment-subtext text-secondary small">
                Exam | Due Feb 15, 2025 at 2:00pm | 100 pts
              </div>
            </Link>
          </ListGroupItem>
        </ListGroup>
      </div>

      <div className="wd-project-section mb-4">
        <div className="d-flex align-items-center justify-content-between p-3 ps-2 bg-secondary rounded mb-2">
          <h3 className="wd-project-title mb-0 fs-5 fw-bold">
            PROJECT 30% of Total
          </h3>
          <Button variant="secondary" size="sm">
            <BsPlus className="fs-4" />
          </Button>
        </div>
        <ListGroup id="wd-project-list" className="rounded-0">
          <ListGroupItem className="wd-assignment-item border-gray p-3 ps-3">
            <Link
              href={`/courses/${cid}/assignments/401`}
              className="wd-assignment-link text-decoration-none text-dark"
            >
              <div className="wd-assignment-title fw-bold">Final Project</div>
              <div className="wd-assignment-subtext text-secondary small">
                Project | Due May 1, 2025 at 11:59pm | 200 pts
              </div>
            </Link>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
}
